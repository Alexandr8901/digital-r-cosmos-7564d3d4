import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, Users, ReceiptText, TrendingUp, Plus, Sparkles, ArrowUpRight, FileText, QrCode } from "lucide-react";
import { StatCard, PageHeader, SectionCard, IntegrationStatus, Sparkline, KpiBadge, Money } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { generateInvoices, generateClients, monthlySeries, fmtDate } from "@/lib/mock/business";
import { useMemo } from "react";

export const Route = createFileRoute("/_authenticated/self-employed/")({
  head: () => ({ meta: [{ title: "Главная — Самозанятый · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  const invoices = useMemo(() => generateInvoices(40), []);
  const clients = useMemo(() => generateClients(18), []);
  const months = useMemo(() => monthlySeries(7, 80000), []);

  const paid = invoices.filter((i) => i.status === "paid");
  const totalIncome = paid.reduce((s, i) => s + i.amount, 0);
  const now = new Date();
  const monthIncome = paid.filter((i) => new Date(i.issuedAt).getMonth() === now.getMonth()).reduce((s, i) => s + i.amount, 0);
  const yearIncome = paid.filter((i) => new Date(i.issuedAt).getFullYear() === now.getFullYear()).reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Главная"
        description="Обзор доходов, клиентов и активных счетов."
        action={
          <>
            <Button asChild variant="outline">
              <Link to="/self-employed/clients">Клиенты</Link>
            </Button>
            <Button asChild>
              <Link to="/self-employed/invoices/new"><Plus className="mr-1 h-4 w-4" />Новый счёт</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Общий доход"
          value={<Money value={totalIncome} />}
          hint={<span>за всё время</span>}
          trend={{ value: "+12.4%", positive: true }}
          icon={<Wallet className="h-4 w-4" />}
        />
        <StatCard
          label="Доход за месяц"
          value={<Money value={monthIncome} />}
          hint={<span>план: <Money value={300000} /></span>}
          trend={{ value: "+18%", positive: true }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          label="Доход за год"
          value={<Money value={yearIncome} />}
          hint={<span>лимит самозанятого: 2.4 млн ₽</span>}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          label="Клиенты"
          value={clients.length}
          hint={<span>{invoices.length} счетов</span>}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard
          title="Поступления за 12 месяцев"
          className="lg:col-span-2"
          action={<KpiBadge value="+18.4%" positive />}
        >
          <div className="space-y-3">
            <Sparkline data={months.map((m) => m.income)} className="h-20" />
            <div className="grid grid-cols-6 gap-2 text-[10px] text-muted-foreground sm:grid-cols-12">
              {months.map((m) => <div key={m.month} className="text-center">{m.month}</div>)}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="AI-рекомендации">
          <div className="space-y-3">
            <Recommendation
              icon={<Sparkles className="h-4 w-4" />}
              title="Сформировать чек ФНС"
              text="3 поступления за неделю без чека. Я подготовлю по шаблону."
            />
            <Recommendation
              icon={<ReceiptText className="h-4 w-4" />}
              title="Напомнить о просрочке"
              text="2 счёта просрочены. Отправить вежливое напоминание клиенту?"
            />
            <Recommendation
              icon={<TrendingUp className="h-4 w-4" />}
              title="Удержать клиента"
              text="Клиент №ИП Воронов давно не заказывал — предложить услугу."
            />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard
          title="Последние оплаты"
          action={<Button asChild variant="ghost" size="sm"><Link to="/self-employed/income">Все<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>}
        >
          <ul className="divide-y divide-border">
            {paid.slice(0, 6).map((i) => (
              <li key={i.id} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{i.clientName}</div>
                  <div className="text-xs text-muted-foreground">{i.number} · {fmtDate(i.issuedAt)}</div>
                </div>
                <Money value={i.amount} className="font-medium" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Последние документы"
          action={<Button asChild variant="ghost" size="sm"><Link to="/self-employed/documents">Все<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>}
        >
          <ul className="divide-y divide-border">
            {invoices.slice(0, 6).map((i) => (
              <li key={i.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">Счёт {i.number}</div>
                    <div className="text-xs text-muted-foreground">{i.clientName}</div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{fmtDate(i.issuedAt)}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Быстрые действия">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction to="/self-employed/invoices/new" icon={<ReceiptText className="h-4 w-4" />} label="Выставить счёт" />
          <QuickAction to="/self-employed/clients" icon={<Users className="h-4 w-4" />} label="Добавить клиента" />
          <QuickAction to="/self-employed/qr" icon={<QrCode className="h-4 w-4" />} label="Получить по QR" />
          <QuickAction to="/self-employed/ai" icon={<Sparkles className="h-4 w-4" />} label="Спросить AI" />
        </div>
      </SectionCard>

      <IntegrationStatus label="Чеки ФНС, ЦБ и СБП подключаются через официальное API после соглашения" />
    </div>
  );
}

function QuickAction({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-elegant"
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
        {icon}
      </div>
      <div className="text-sm font-medium">{label}</div>
    </Link>
  );
}

function Recommendation({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
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
