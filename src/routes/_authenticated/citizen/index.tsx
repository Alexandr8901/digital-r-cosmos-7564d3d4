import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wallet, TrendingUp, TrendingDown, ArrowLeftRight, QrCode, CreditCard,
  Plus, Send, Receipt, Wifi, Home as HomeIcon, ArrowUpRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatCard, PageHeader, SectionCard } from "@/components/citizen/kit";
import {
  generateTransactions, summary, formatRub, subscriptions, notifications, favorites, accounts,
} from "@/lib/mock/citizen";

export const Route = createFileRoute("/_authenticated/citizen/")({
  head: () => ({ meta: [{ title: "Главная · Кабинет гражданина" }] }),
  component: Dashboard,
});

const QUICK = [
  { to: "/citizen/payments", icon: Receipt, label: "Оплатить" },
  { to: "/citizen/transfers", icon: Send, label: "Перевести" },
  { to: "/citizen/qr", icon: QrCode, label: "Мой QR" },
  { to: "/citizen/qr", icon: QrCode, label: "Сканировать" },
  { to: "/citizen/history", icon: ArrowLeftRight, label: "История" },
  { to: "/citizen/payments", icon: HomeIcon, label: "ЖКХ" },
  { to: "/citizen/payments", icon: Wifi, label: "Интернет" },
  { to: "/citizen/wallet", icon: Plus, label: "Пополнить" },
  { to: "/citizen/documents", icon: Receipt, label: "Выписка" },
  { to: "/citizen/ai", icon: Sparkles, label: "AI помощник" },
];

function Dashboard() {
  const txs = generateTransactions(40);
  const s = summary(txs);
  const totalBalance = accounts.reduce((a, b) => a + b.balance, 0);
  const recent = txs.slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Главная"
        description="Сводка по вашим финансам и операциям"
        action={
          <>
            <Button variant="outline" asChild><Link to="/citizen/history">История</Link></Button>
            <Button asChild><Link to="/citizen/transfers">Перевести</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Общий баланс" value={formatRub(totalBalance)} icon={<Wallet className="h-4 w-4" />} hint="по 3 счетам" />
        <StatCard label="Доходы (30 дней)" value={formatRub(s.income)} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Расходы (30 дней)" value={formatRub(s.expense)} icon={<TrendingDown className="h-4 w-4" />} trend={{ value: "−3%", positive: true }} />
        <StatCard label="Активных подписок" value={subscriptions.length} icon={<CreditCard className="h-4 w-4" />} hint={`${formatRub(subscriptions.reduce((a, b) => a + b.amount, 0))} / мес`} />
      </div>

      <SectionCard title="Быстрые действия">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {QUICK.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-card"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent-foreground transition-transform group-hover:scale-105">
                <q.icon className="h-4 w-4" />
              </div>
              <div className="text-center text-[11px] font-medium leading-tight">{q.label}</div>
            </Link>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Последние операции"
          className="lg:col-span-2"
          action={<Button asChild variant="ghost" size="sm"><Link to="/citizen/history">Все <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link></Button>}
        >
          <div className="-mx-2">
            {recent.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-muted/50"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-muted text-xs font-medium">
                    {t.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.category} · {new Date(t.date).toLocaleDateString("ru-RU")}</div>
                </div>
                <div className={`text-sm font-semibold ${t.amount > 0 ? "text-success" : ""}`}>
                  {formatRub(t.amount, { sign: true })}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Избранные получатели" action={<Button asChild variant="ghost" size="sm"><Link to="/citizen/transfers">Перевести</Link></Button>}>
          <div className="space-y-2">
            {favorites.map((f) => (
              <Link key={f.id} to="/citizen/transfers" className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50">
                <Avatar className="h-9 w-9"><AvatarFallback className="bg-accent text-accent-foreground text-xs">{f.initials}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.phone}</div>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Подписки" action={<Button asChild variant="ghost" size="sm"><Link to="/citizen/subscriptions">Все</Link></Button>}>
          <div className="space-y-3">
            {subscriptions.slice(0, 4).map((sub) => (
              <div key={sub.id} className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-xs font-bold">{sub.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{sub.name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(sub.nextChargeAt).toLocaleDateString("ru-RU")}</div>
                </div>
                <div className="text-sm font-semibold">{formatRub(sub.amount)}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Последние уведомления" action={<Button asChild variant="ghost" size="sm"><Link to="/citizen/notifications">Все</Link></Button>}>
          <div className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-muted-foreground/40" : "bg-accent"}`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.description}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-4 text-xs text-muted-foreground">
        <Badge variant="outline" className="mr-2">Демо-данные</Badge>
        Отображаются демонстрационные данные. Реальные транзакции появятся после подключения официальных банковских API.
      </div>
      <Separator className="opacity-0" />
    </div>
  );
}
