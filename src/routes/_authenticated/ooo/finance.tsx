import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money, KpiBadge } from "@/components/workspace/kit";
import { monthlySeries } from "@/lib/mock/business";
import { useMemo } from "react";
import { ResponsiveContainer, ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Wallet, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ooo/finance")({
  head: () => ({ meta: [{ title: "Финансы — ООО" }] }),
  component: Page,
});

function Page() {
  const months = useMemo(() => monthlySeries(25, 1850000), []);
  const income = months.reduce((s, m) => s + m.income, 0);
  const expense = months.reduce((s, m) => s + m.expense, 0);
  return (
    <ModulePage title="Финансы холдинга" description="Консолидированная отчётность и денежные потоки.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Поступления" value={<Money value={income} />} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+14%", positive: true }} />
        <StatCard label="Выплаты" value={<Money value={expense} />} icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="EBITDA" value={<Money value={Math.round((income - expense) * 0.85)} />} hint="оценка" />
      </div>
      <SectionCard title="ДДС холдинга" action={<KpiBadge value="+12% YoY" positive />}>
        <div className="h-72">
          <ResponsiveContainer>
            <ComposedChart data={months}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Поступления" fill="hsl(220 70% 50%)" radius={[4, 4, 0, 0]} />
              <Area dataKey="expense" name="Выплаты" stroke="hsl(0 70% 50%)" fill="hsl(0 70% 50% / 0.2)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </ModulePage>
  );
}
