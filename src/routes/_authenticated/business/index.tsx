import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, StatCard, SectionCard, ListRow, Money, StatusBadge, MiniBar, Sparkline, Tag, QuickAction, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowUpRight, Sparkles, Plug, ShieldCheck, Download, TrendingUp, Wallet, CreditCard, FileText, Users, Send, QrCode, Receipt, Bell, Calendar, Inbox } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/business/")({
  head: () => ({ meta: [{ title: "Бизнес · ЦифроРубль" }] }),
  component: Dashboard,
});

function Dashboard() {
  const txs = mock.generateTxs(10);
  return (
    <PlatformPage
      title="Бизнес"
      description="Управление бизнесом: CRM, склад, проекты, аналитика"
      integration={<IntegrationStatus />}
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать</Button>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Общий баланс" value={mock.fmtRub(524_730)} icon={<Wallet className="h-4 w-4" />} trend={{ value: "+8,1%", positive: true }} hint="за месяц" />
        <StatCard label="Доходы" value={mock.fmtRub(218_400)} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+12,4%", positive: true }} />
        <StatCard label="Расходы" value={mock.fmtRub(184_220)} icon={<CreditCard className="h-4 w-4" />} trend={{ value: "−3,5%", positive: true }} />
        <StatCard label="Операций" value="138" icon={<Receipt className="h-4 w-4" />} hint="за 30 дней" />
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-display text-base font-semibold">Быстрые действия</div>
            <div className="text-xs text-muted-foreground">Самые частые операции</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          <QuickAction icon={Receipt} label="Оплатить" />
          <QuickAction icon={Send} label="Перевести" />
          <QuickAction icon={QrCode} label="QR" />
          <QuickAction icon={FileText} label="Создать счёт" />
          <QuickAction icon={Users} label="Контрагент" />
          <QuickAction icon={Sparkles} label="AI" />
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Последние операции" className="lg:col-span-2">
          <div className="divide-y divide-border">
            {txs.slice(0, 6).map(t => (
              <ListRow
                key={t.id}
                title={t.counterparty}
                subtitle={`${mock.fmtDateTime(t.date)} · ${t.category}`}
                right={<div className="flex items-center gap-2"><Pill>{t.channel}</Pill><Money value={t.amount} sign /></div>}
                icon={<Receipt className="h-4 w-4" />}
              />
            ))}
          </div>
        </SectionCard>
        <SectionCard title="AI рекомендации">
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-primary"><Sparkles className="h-3 w-3" />Совет</div>
              Снизьте расходы на подписки до 4 000 ₽/мес — сэкономите 18 000 ₽ в год.
            </div>
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-warning"><Bell className="h-3 w-3" />Напоминание</div>
              Завтра автоплатёж за интернет: 690 ₽.
            </div>
            <div className="rounded-lg border border-success/20 bg-success/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-success"><ShieldCheck className="h-3 w-3" />Безопасность</div>
              Все устройства подтверждены, подозрительной активности нет.
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Партнёрская инфраструктура">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {mock.partners.map(p => (
            <div key={p.name} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.role}</div>
              </div>
              <IntegrationStatus />
            </div>
          ))}
        </div>
      </SectionCard>
    </PlatformPage>
  );
}
