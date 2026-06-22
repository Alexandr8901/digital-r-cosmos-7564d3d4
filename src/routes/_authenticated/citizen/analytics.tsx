import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { PageHeader, StatCard, SectionCard } from "@/components/citizen/kit";
import { generateTransactions, summary, formatRub } from "@/lib/mock/citizen";

export const Route = createFileRoute("/_authenticated/citizen/analytics")({
  head: () => ({ meta: [{ title: "Аналитика · ЦифроРубль" }] }),
  component: AnalyticsPage,
});

const COLORS = ["#1c3d8c", "#2bb2b4", "#7c6df2", "#f59f00", "#e54848", "#39b772", "#7e5bef", "#0ea5e9"];

function AnalyticsPage() {
  const txs = useMemo(() => generateTransactions(150, 31), []);
  const s = summary(txs);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of txs) if (t.amount < 0) map.set(t.category, (map.get(t.category) ?? 0) + Math.abs(t.amount));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [txs]);

  const byMonth = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>();
    for (const t of txs) {
      const key = new Date(t.date).toLocaleString("ru-RU", { month: "short", year: "2-digit" });
      const cur = map.get(key) ?? { income: 0, expense: 0 };
      if (t.amount > 0) cur.income += t.amount; else cur.expense += Math.abs(t.amount);
      map.set(key, cur);
    }
    return Array.from(map.entries()).reverse().map(([month, v]) => ({ month, ...v }));
  }, [txs]);

  const topMerchants = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of txs) if (t.amount < 0) map.set(t.title, (map.get(t.title) ?? 0) + Math.abs(t.amount));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 7);
  }, [txs]);

  const avgCheck = useMemo(() => {
    const exp = txs.filter((t) => t.amount < 0);
    return exp.length ? Math.round(exp.reduce((a, b) => a + Math.abs(b.amount), 0) / exp.length) : 0;
  }, [txs]);

  return (
    <div className="space-y-6">
      <PageHeader title="Аналитика" description="Полная картина ваших финансов" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Доходы" value={formatRub(s.income)} trend={{ value: "+8%", positive: true }} />
        <StatCard label="Расходы" value={formatRub(s.expense)} trend={{ value: "−4%", positive: true }} />
        <StatCard label="Средний чек" value={formatRub(avgCheck)} />
        <StatCard label="Прогноз на месяц" value={formatRub(Math.round(s.expense * 1.08))} hint="на основе текущего темпа" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Категории расходов">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => formatRub(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
            {byCategory.slice(0, 8).map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="flex-1 truncate text-muted-foreground">{c.name}</span>
                <span className="font-medium">{formatRub(c.value)}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Доходы и расходы по месяцам">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={byMonth}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip formatter={(v: number) => formatRub(v)} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#39b772" strokeWidth={2} name="Доходы" dot={false} />
                <Line type="monotone" dataKey="expense" stroke="#e54848" strokeWidth={2} name="Расходы" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Топ платежей">
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={topMerchants} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis type="number" stroke="currentColor" className="text-xs" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <YAxis dataKey="name" type="category" stroke="currentColor" className="text-xs" width={140} />
              <Tooltip formatter={(v: number) => formatRub(v)} />
              <Bar dataKey="value" fill="#2bb2b4" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
