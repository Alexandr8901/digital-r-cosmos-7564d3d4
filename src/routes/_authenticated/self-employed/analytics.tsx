import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money, KpiBadge } from "@/components/workspace/kit";
import { monthlySeries, generateClients, generateServices } from "@/lib/mock/business";
import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Users, Package, Receipt } from "lucide-react";

export const Route = createFileRoute("/_authenticated/self-employed/analytics")({
  head: () => ({ meta: [{ title: "Аналитика — Самозанятый" }] }),
  component: Page,
});

const COLORS = ["hsl(var(--chart-1, 220 70% 50%))", "hsl(var(--chart-2, 180 60% 45%))", "hsl(var(--chart-3, 280 60% 55%))", "hsl(var(--chart-4, 30 80% 55%))", "hsl(var(--chart-5, 340 70% 55%))"];

function Page() {
  const months = useMemo(() => monthlySeries(11, 80000), []);
  const clients = useMemo(() => generateClients(18).sort((a, b) => b.totalSpent - a.totalSpent), []);
  const services = useMemo(() => generateServices(), []);
  const totalIncome = months.reduce((s, m) => s + m.income, 0);
  const totalExpense = months.reduce((s, m) => s + m.expense, 0);
  const popular = services.map((s, i) => ({ name: s.name, value: 10 + ((i * 7) % 50) }));

  return (
    <ModulePage title="Аналитика" description="Доходы, расходы, клиенты, услуги и прогноз.">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Доход за год" value={<Money value={totalIncome} />} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+24%", positive: true }} />
        <StatCard label="Расходы" value={<Money value={totalExpense} />} icon={<Receipt className="h-4 w-4" />} hint="налоги и комиссии" />
        <StatCard label="Клиентов" value={clients.length} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Средний чек" value={<Money value={Math.round(totalIncome / 240)} />} icon={<Package className="h-4 w-4" />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Доходы и расходы" className="lg:col-span-2" action={<KpiBadge value="+18% MoM" positive />}>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line dataKey="income" stroke={COLORS[0]} strokeWidth={2} name="Доход" />
                <Line dataKey="expense" stroke={COLORS[3]} strokeWidth={2} name="Расход" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Популярные услуги">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={popular.slice(0, 5)} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                  {popular.slice(0, 5).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Лучшие клиенты">
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={clients.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" fontSize={11} />
              <YAxis dataKey="name" type="category" width={160} fontSize={11} />
              <Tooltip />
              <Bar dataKey="totalSpent" fill={COLORS[1]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </ModulePage>
  );
}
