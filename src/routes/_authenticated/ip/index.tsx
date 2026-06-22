import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard, Money, IntegrationStatus, Sparkline, KpiBadge } from "@/components/workspace/kit";
import { Wallet, TrendingUp, ShoppingCart, Users, Package, Truck, Sparkles, ArrowUpRight, Plus, Receipt, AlertCircle } from "lucide-react";
import { generateOrders, generateClients, generateProducts, generateInvoices, monthlySeries, fmtDate } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_authenticated/ip/")({
  head: () => ({ meta: [{ title: "Главная — ИП · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  const orders = useMemo(() => generateOrders(30), []);
  const clients = useMemo(() => generateClients(24), []);
  const products = useMemo(() => generateProducts(), []);
  const invoices = useMemo(() => generateInvoices(40), []);
  const months = useMemo(() => monthlySeries(13, 320000), []);

  const revenue = months.reduce((s, m) => s + m.income, 0);
  const expense = months.reduce((s, m) => s + m.expense, 0);
  const profit = revenue - expense;
  const receivables = invoices.filter((i) => i.status === "pending").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const avgCheck = Math.round(orders.reduce((s, o) => s + o.total, 0) / Math.max(orders.length, 1));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Главная"
        description="Сводка бизнеса в реальном времени."
        action={
          <>
            <Button asChild variant="outline"><Link to="/ip/orders">Заказы</Link></Button>
            <Button asChild><Link to="/ip/payments"><Plus className="mr-1 h-4 w-4" />Платёж</Link></Button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Баланс" value={<Money value={1842300} />} icon={<Wallet className="h-4 w-4" />} hint="по всем счетам" />
        <StatCard label="Выручка" value={<Money value={revenue} />} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+18%", positive: true }} />
        <StatCard label="Прибыль" value={<Money value={profit} />} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+9%", positive: true }} />
        <StatCard label="Расходы" value={<Money value={expense} />} icon={<Receipt className="h-4 w-4" />} hint="за период" />
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Дебиторка" value={<Money value={receivables} />} icon={<AlertCircle className="h-4 w-4" />} hint={`${invoices.filter((i) => i.status === "pending").length} счетов`} />
        <StatCard label="Просрочка" value={<Money value={overdue} />} icon={<AlertCircle className="h-4 w-4" />} trend={{ value: "-5%", positive: true }} />
        <StatCard label="Заказы" value={orders.length} icon={<ShoppingCart className="h-4 w-4" />} hint={`средний чек ${avgCheck.toLocaleString("ru-RU")} ₽`} />
        <StatCard label="Покупатели" value={clients.length} icon={<Users className="h-4 w-4" />} hint="за период" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Динамика выручки" className="lg:col-span-2" action={<KpiBadge value="+12.4% MoM" positive />}>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={months}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary, 220 70% 50%))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary, 220 70% 50%))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={11} />
                <Tooltip />
                <Area dataKey="income" stroke="hsl(var(--primary, 220 70% 50%))" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="AI-рекомендации">
          <div className="space-y-3">
            <Rec icon={<Sparkles className="h-4 w-4" />} title="Закупить кофе зерновой" text="Остаток ниже резерва. Поставщик «Орбита» — 3 дня доставки." />
            <Rec icon={<TrendingUp className="h-4 w-4" />} title="Поднять цену на топ-3" text="Маржа упала на 4%. Рекомендуем +6% на лидеров." />
            <Rec icon={<Users className="h-4 w-4" />} title="Удержать клиента" text="ИП Воронов давно не заказывал — отправить персональное предложение." />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard
          title="Топ покупателей"
          action={<Button asChild variant="ghost" size="sm"><Link to="/ip/customers">Все<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>}
        >
          <ul className="divide-y divide-border">
            {clients.slice().sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5).map((c) => (
              <li key={c.id} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-medium">{c.name[0]}</div>
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.ordersCount} заказов</div>
                  </div>
                </div>
                <Money value={c.totalSpent} className="font-medium" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Топ товаров" action={<Button asChild variant="ghost" size="sm"><Link to="/ip/catalog">Все<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>}>
          <ul className="divide-y divide-border">
            {products.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-muted-foreground"><Package className="h-3.5 w-3.5" /></div>
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.sku} · остаток {p.stock}</div>
                  </div>
                </div>
                <Money value={p.price} className="font-medium" />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Последние платежи" action={<Button asChild variant="ghost" size="sm"><Link to="/ip/payments">Все<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>}>
          <ul className="divide-y divide-border">
            {invoices.slice(0, 5).map((i) => (
              <li key={i.id} className="flex items-center justify-between py-2.5">
                <div>
                  <div className="text-sm font-medium">{i.number}</div>
                  <div className="text-xs text-muted-foreground">{i.clientName} · {fmtDate(i.issuedAt)}</div>
                </div>
                <Money value={i.amount} className="font-medium" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Поступления">
          <Sparkline data={months.map((m) => m.income)} className="h-20" />
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
            <div><div className="text-muted-foreground">Сегодня</div><div className="mt-1 font-medium"><Money value={92400} /></div></div>
            <div><div className="text-muted-foreground">Неделя</div><div className="mt-1 font-medium"><Money value={486200} /></div></div>
            <div><div className="text-muted-foreground">Месяц</div><div className="mt-1 font-medium"><Money value={months[months.length - 1].income} /></div></div>
          </div>
        </SectionCard>
      </div>

      <IntegrationStatus label="ЦБ РФ (цифровой рубль), СБП и ФНС подключаются через официальное API после соглашения" />
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
