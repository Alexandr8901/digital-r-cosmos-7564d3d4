import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money, KpiBadge } from "@/components/workspace/kit";
import { monthlySeries } from "@/lib/mock/business";
import { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Wallet, TrendingUp, TrendingDown, Calendar } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/finance")({
  head: () => ({ meta: [{ title: "Финансы — ИП" }] }),
  component: Page,
});

function Page() {
  const months = useMemo(() => monthlySeries(17, 280000), []);
  const income = months.reduce((s, m) => s + m.income, 0);
  const expense = months.reduce((s, m) => s + m.expense, 0);

  return (
    <ModulePage title="Финансы" description="Денежный поток, бюджет, прибыль и платёжный календарь.">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Денежный поток" value={<Money value={income - expense} />} icon={<Wallet className="h-4 w-4" />} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Доходы" value={<Money value={income} />} icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Расходы" value={<Money value={expense} />} icon={<TrendingDown className="h-4 w-4" />} />
        <StatCard label="Прогноз" value={<Money value={Math.round((income - expense) * 1.08)} />} icon={<Calendar className="h-4 w-4" />} hint="на месяц вперёд" />
      </div>

      <SectionCard title="Движение денежных средств (ДДС)" action={<KpiBadge value="+8.4% MoM" positive />}>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={months}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Legend />
              <Area dataKey="income" stackId="a" stroke="hsl(var(--primary, 220 70% 50%))" fill="hsl(var(--primary, 220 70% 50%))" fillOpacity={0.25} name="Доходы" />
              <Area dataKey="expense" stackId="b" stroke="hsl(var(--destructive, 0 70% 50%))" fill="hsl(var(--destructive, 0 70% 50%))" fillOpacity={0.2} name="Расходы" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Платёжный календарь">
        <ul className="divide-y divide-border">
          {[
            { date: "25 июня", title: "НДФЛ 13%", amount: 12500 },
            { date: "28 июня", title: "Страховые взносы", amount: 14200 },
            { date: "30 июня", title: "УСН авансовый", amount: 38600 },
            { date: "05 июля", title: "Аренда офиса", amount: 65000 },
            { date: "10 июля", title: "Зарплата команды", amount: 480000 },
          ].map((p, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.date}</div>
              </div>
              <Money value={-p.amount} sign className="font-medium" />
            </li>
          ))}
        </ul>
      </SectionCard>
    </ModulePage>
  );
}
