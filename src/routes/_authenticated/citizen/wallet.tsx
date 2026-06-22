import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CreditCard, ShieldCheck, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader, SectionCard, StatCard } from "@/components/citizen/kit";
import { StatusBadge } from "@/components/marketing/page-shell";
import { accounts, formatRub, generateTransactions, summary } from "@/lib/mock/citizen";

export const Route = createFileRoute("/_authenticated/citizen/wallet")({
  head: () => ({ meta: [{ title: "Кошелёк · ЦифроРубль" }] }),
  component: WalletPage,
});

function WalletPage() {
  const [hidden, setHidden] = useState(false);
  const total = accounts.reduce((a, b) => a + b.balance, 0);
  const txs = generateTransactions(20, 7);
  const s = summary(txs);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Кошелёк"
        description="Все ваши счета в одном месте"
        action={
          <Button variant="outline" onClick={() => setHidden((v) => !v)}>
            {hidden ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
            {hidden ? "Показать" : "Скрыть"}
          </Button>
        }
      />

      <Card className="overflow-hidden border-0 brand-deep text-on-brand">
        <div className="relative p-8">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <div className="text-xs uppercase tracking-wider text-white/70">Общий баланс</div>
            <div className="mt-2 font-display text-4xl font-semibold md:text-5xl">
              {hidden ? "••••••" : formatRub(total)}
            </div>
            <div className="mt-2 text-sm text-white/80">по {accounts.length} счетам</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Доходы (30 дней)" value={hidden ? "••••" : formatRub(s.income)} />
        <StatCard label="Расходы (30 дней)" value={hidden ? "••••" : formatRub(s.expense)} />
        <StatCard label="Свободный остаток" value={hidden ? "••••" : formatRub(total - 50000)} hint="после планируемых платежей" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {accounts.map((acc) => (
          <Card key={acc.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-foreground">
                {acc.type === "main" ? <Wallet className="h-5 w-5" /> : acc.type === "savings" ? <Lock className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
              </div>
              {acc.status === "pending_api" ? (
                <StatusBadge status="pending-api" />
              ) : (
                <Badge variant="outline">•• {acc.last4}</Badge>
              )}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">{acc.name}</div>
            <div className="mt-1 font-display text-2xl font-semibold">
              {hidden ? "••••••" : formatRub(acc.balance)}
            </div>
            {acc.status === "pending_api" && (
              <p className="mt-2 text-xs text-muted-foreground">
                Подключение к официальному API Цифрового рубля Банка России.
              </p>
            )}
          </Card>
        ))}
      </div>

      <SectionCard title="Лимиты на сегодня">
        <div className="space-y-4">
          {[
            { label: "Переводы", used: 24500, limit: 100000 },
            { label: "Платежи QR", used: 5400, limit: 50000 },
            { label: "Снятие наличных", used: 0, limit: 75000 },
          ].map((l) => (
            <div key={l.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span>{l.label}</span>
                <span className="text-muted-foreground">{formatRub(l.used)} / {formatRub(l.limit)}</span>
              </div>
              <Progress value={(l.used / l.limit) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Безопасность">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, label: "Двухфакторная аутентификация", status: "Активна" },
            { icon: Lock, label: "Биометрия", status: "Не настроена" },
            { icon: ShieldCheck, label: "Журнал входов", status: "12 событий" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border p-4">
              <s.icon className="h-5 w-5 text-accent-foreground" />
              <div className="mt-3 text-sm font-medium">{s.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.status}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
