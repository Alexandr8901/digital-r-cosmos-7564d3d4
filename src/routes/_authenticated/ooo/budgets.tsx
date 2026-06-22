import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, Money } from "@/components/workspace/kit";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";
import { monthlySeries } from "@/lib/mock/business";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const BUDGETS = [
  { id: "1", name: "Операционный", plan: 145000000, fact: 132400000 },
  { id: "2", name: "Капитальный (CAPEX)", plan: 68000000, fact: 41200000 },
  { id: "3", name: "Маркетинг", plan: 32000000, fact: 29400000 },
  { id: "4", name: "ФОТ", plan: 184000000, fact: 178900000 },
  { id: "5", name: "Налоги", plan: 92000000, fact: 88600000 },
];

export const Route = createFileRoute("/_authenticated/ooo/budgets")({
  head: () => ({ meta: [{ title: "Бюджеты — ООО" }] }),
  component: Page,
});

function Page() {
  const months = useMemo(() => monthlySeries(27, 1850000), []);
  const forecast = months.map((m) => ({ ...m, plan: Math.round(m.income * 0.95), fact: m.income }));
  return (
    <ModulePage title="Бюджеты" description="План, факт, прогноз и показатели по статьям.">
      <div className="space-y-3">
        {BUDGETS.map((b) => {
          const pct = Math.round((b.fact / b.plan) * 100);
          return (
            <SectionCard key={b.id} title={b.name}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">Факт</span>
                <span className="font-medium"><Money value={b.fact} /> <span className="text-muted-foreground">/ <Money value={b.plan} /></span></span>
              </div>
              <Progress value={pct} className="mt-2 h-2" />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{pct}% от плана</span>
                <span>Остаток: <Money value={b.plan - b.fact} /></span>
              </div>
            </SectionCard>
          );
        })}
      </div>

      <SectionCard title="План / Факт / Прогноз">
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Legend />
              <Line dataKey="plan" name="План" stroke="hsl(220 30% 60%)" strokeDasharray="4 4" />
              <Line dataKey="fact" name="Факт" stroke="hsl(220 70% 50%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </ModulePage>
  );
}
