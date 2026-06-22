import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard, Money, IntegrationStatus, KpiBadge } from "@/components/workspace/kit";
import { Wallet, TrendingUp, Building2, Users, AlertCircle, ArrowUpRight, Sparkles, Landmark, FileText } from "lucide-react";
import { useMemo } from "react";
import { generateOrganizations, generatePaymentApprovals, monthlySeries, fmtDate } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/_authenticated/ooo/")({
  head: () => ({ meta: [{ title: "Главная — ООО · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  const orgs = useMemo(() => generateOrganizations(), []);
  const approvals = useMemo(() => generatePaymentApprovals(), []);
  const months = useMemo(() => monthlySeries(23, 1850000), []);

  const consolidated = months.reduce((s, m) => s + m.income, 0);
  const expense = months.reduce((s, m) => s + m.expense, 0);
  const pending = approvals.filter((a) => a.status === "awaiting");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Холдинг"
        description="Консолидированная сводка по всем юридическим лицам."
        action={
          <>
            <Button asChild variant="outline"><Link to="/ooo/organizations">Все организации</Link></Button>
            <Button asChild><Link to="/ooo/treasury">Казначейство</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Консолидированная выручка" value={<Money value={consolidated} />} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+14%", positive: true }} hint="YTD" />
        <StatCard label="Чистая прибыль" value={<Money value={consolidated - expense} />} icon={<Wallet className="h-4 w-4" />} trend={{ value: "+8%", positive: true }} />
        <StatCard label="Организаций" value={orgs.filter((o) => o.status === "active").length} icon={<Building2 className="h-4 w-4" />} hint={`из ${orgs.length}`} />
        <StatCard label="На согласовании" value={pending.length} icon={<AlertCircle className="h-4 w-4" />} hint={<Money value={pending.reduce((s, p) => s + p.amount, 0)} />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Консолидированный ДДС" className="lg:col-span-2" action={<KpiBadge value="+12% YoY" positive />}>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={months}>
                <defs>
                  <linearGradient id="oi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(220 70% 50%)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(220 70% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="oe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0 70% 50%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(0 70% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Area dataKey="income" name="Поступления" stroke="hsl(220 70% 50%)" fill="url(#oi)" />
                <Area dataKey="expense" name="Выплаты" stroke="hsl(0 70% 50%)" fill="url(#oe)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="AI-аналитика">
          <div className="space-y-3">
            <Rec icon={<Sparkles className="h-4 w-4" />} title="Перераспределить лимит" text="ООО «Логистика» — 92% бюджета на технику. Снизить до 75%." />
            <Rec icon={<TrendingUp className="h-4 w-4" />} title="Курс рубля" text="Окно для конвертации валюты 25–28 июня по прогнозу." />
            <Rec icon={<AlertCircle className="h-4 w-4" />} title="Просрочка" text="Контрагент «Орбита»: 14 дней просрочки. Передать в юридический." />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Очередь согласования" action={<Button asChild variant="ghost" size="sm"><Link to="/ooo/treasury">Все<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>}>
          <ul className="divide-y divide-border">
            {pending.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{p.counterparty}</div>
                  <div className="text-xs text-muted-foreground">{p.purpose} · {fmtDate(p.requestedAt)}</div>
                </div>
                <Money value={p.amount} className="font-medium" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Организации" action={<Button asChild variant="ghost" size="sm"><Link to="/ooo/organizations">Все<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>}>
          <ul className="divide-y divide-border">
            {orgs.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><Building2 className="h-4 w-4" /></div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{o.name}</div>
                    <div className="text-xs text-muted-foreground">ИНН {o.inn} · {o.accountsCount} счёта</div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{o.responsible}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Платёжный календарь">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between rounded-lg border border-border p-2.5"><span>НДС за май</span><Money value={-2840000} sign /></li>
            <li className="flex justify-between rounded-lg border border-border p-2.5"><span>ФОТ</span><Money value={-12400000} sign /></li>
            <li className="flex justify-between rounded-lg border border-border p-2.5"><span>Аренда</span><Money value={-1850000} sign /></li>
          </ul>
        </SectionCard>
        <SectionCard title="Документы дня">
          <ul className="space-y-2 text-sm">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Договор поставки №2026-{100 + i}
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Команда">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-border p-2.5"><span>Сотрудников</span><span className="font-medium">312</span></div>
            <div className="flex items-center justify-between rounded-lg border border-border p-2.5"><span>Активных сессий</span><span className="font-medium">48</span></div>
            <div className="flex items-center justify-between rounded-lg border border-border p-2.5"><span>На согласовании</span><span className="font-medium">{pending.length}</span></div>
          </div>
        </SectionCard>
      </div>

      <IntegrationStatus label="Банковские интеграции, ЦБ РФ и ФНС подключаются через официальные API после соглашения" />
    </div>
  );
}

function Rec({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-muted/30 p-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">{icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
