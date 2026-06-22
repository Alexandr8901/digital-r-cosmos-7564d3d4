import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money, KpiBadge } from "@/components/workspace/kit";
import { monthlySeries } from "@/lib/mock/business";
import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/sales")({
  head: () => ({ meta: [{ title: "Продажи — ИП" }] }),
  component: Page,
});

function Page() {
  const months = useMemo(() => monthlySeries(15, 280000), []);
  const total = months.reduce((s, m) => s + m.income, 0);
  return (
    <ModulePage title="Продажи" description="Динамика, каналы и прогноз продаж.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Выручка" value={<Money value={total} />} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Чеков" value="1 482" />
        <StatCard label="Средний чек" value={<Money value={Math.round(total / 1482)} />} />
      </div>
      <SectionCard title="Продажи по месяцам" action={<KpiBadge value="+12% YoY" positive />}>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={months}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Выручка" fill="hsl(var(--primary, 220 70% 50%))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Себестоимость" fill="hsl(var(--accent, 200 60% 50%))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </ModulePage>
  );
}
