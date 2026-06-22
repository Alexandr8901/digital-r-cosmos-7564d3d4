import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money } from "@/components/workspace/kit";
import { monthlySeries, generateProducts, generateClients } from "@/lib/mock/business";
import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Package, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/analytics")({
  head: () => ({ meta: [{ title: "Аналитика — ИП" }] }),
  component: Page,
});

const COL = ["hsl(220 70% 50%)", "hsl(180 60% 45%)", "hsl(280 60% 55%)", "hsl(30 80% 55%)", "hsl(340 70% 55%)"];

function Page() {
  const months = useMemo(() => monthlySeries(19, 320000), []);
  const products = useMemo(() => generateProducts().slice(0, 5), []);
  const clients = useMemo(() => generateClients(8).sort((a, b) => b.totalSpent - a.totalSpent), []);
  const dist = products.map((p, i) => ({ name: p.name, value: 10 + ((i * 17) % 60) }));

  return (
    <ModulePage title="Аналитика" description="Продажи, маржа, клиенты, прогноз и BI.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Выручка" value={<Money value={months.reduce((s, m) => s + m.income, 0)} />} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+18%", positive: true }} />
        <StatCard label="Топ-товаров" value={products.length} icon={<Package className="h-4 w-4" />} />
        <StatCard label="Клиентов" value={clients.length} icon={<Users className="h-4 w-4" />} />
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Динамика" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={months}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line dataKey="income" stroke={COL[0]} strokeWidth={2} name="Выручка" />
                <Line dataKey="expense" stroke={COL[3]} strokeWidth={2} name="Расход" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Доля категорий">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dist} dataKey="value" nameKey="name" outerRadius={80}>
                  {dist.map((_, i) => <Cell key={i} fill={COL[i % COL.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Топ клиентов">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={clients} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" fontSize={11} />
              <YAxis dataKey="name" type="category" width={160} fontSize={11} />
              <Tooltip />
              <Bar dataKey="totalSpent" fill={COL[1]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </ModulePage>
  );
}
