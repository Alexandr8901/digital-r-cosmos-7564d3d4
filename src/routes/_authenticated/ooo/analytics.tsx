import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money } from "@/components/workspace/kit";
import { monthlySeries } from "@/lib/mock/business";
import { useMemo } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ooo/analytics")({
  head: () => ({ meta: [{ title: "BI-Аналитика — ООО" }] }),
  component: Page,
});

const RADAR = [
  { subject: "Выручка", A: 86, B: 75 },
  { subject: "Маржа", A: 72, B: 68 },
  { subject: "Удержание", A: 91, B: 82 },
  { subject: "NPS", A: 65, B: 70 },
  { subject: "Скорость", A: 78, B: 84 },
  { subject: "Качество", A: 88, B: 80 },
];

function Page() {
  const months = useMemo(() => monthlySeries(29, 1850000), []);
  return (
    <ModulePage title="BI-Аналитика" description="Настраиваемые дашборды, конструктор отчётов и виджеты." action={<Button><Plus className="mr-1 h-4 w-4" />Виджет</Button>}>
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Активных дашбордов" value={12} />
        <StatCard label="Виджетов" value={48} />
        <StatCard label="Источников данных" value={9} />
        <StatCard label="Сохранённых отчётов" value={24} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="KPI квартала vs прошлый год">
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={RADAR}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="2026" dataKey="A" stroke="hsl(220 70% 50%)" fill="hsl(220 70% 50%)" fillOpacity={0.4} />
                <Radar name="2025" dataKey="B" stroke="hsl(180 60% 45%)" fill="hsl(180 60% 45%)" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Тренд выручки">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line dataKey="income" stroke="hsl(220 70% 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </ModulePage>
  );
}
