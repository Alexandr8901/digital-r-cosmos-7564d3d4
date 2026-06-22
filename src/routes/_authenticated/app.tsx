import { useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wallet,
  QrCode,
  Send,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/use-auth";
import { ROLE_LABEL, type AppRole } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [{ title: "Кабинет · ЦифроРубль" }],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const profileQ = useQuery({
    queryKey: ["profile-me"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, active_role, onboarded_at")
        .single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (profileQ.data && !profileQ.data.onboarded_at) {
      navigate({ to: "/onboarding" });
    }
  }, [profileQ.data, navigate]);

  const role = (profileQ.data?.active_role ?? "citizen") as AppRole;
  const name = profileQ.data?.first_name ?? "";

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/app">
            <Logo />
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-muted-foreground">Активная роль:</span>
            <span className="font-medium">{ROLE_LABEL[role]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Настройки">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Выйти" onClick={() => signOut()}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Добро пожаловать{name ? `, ${name}` : ""}
              </h1>
              <p className="mt-1.5 text-muted-foreground">
                Ваш кабинet «{ROLE_LABEL[role]}» готов. Модули экосистемы подключаются здесь.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft/50 px-3 py-1.5 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              AI-помощник активен
            </div>
          </div>
        </motion.div>

        {/* Balance hero card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="relative mt-8 overflow-hidden rounded-3xl border border-border brand-deep p-8 text-on-brand shadow-elegant sm:p-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 60% at 90% 10%, color-mix(in oklab, var(--accent) 30%, transparent) 0%, transparent 60%), linear-gradient(135deg, var(--primary), var(--primary-glow))",
            }}
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-wider text-primary-foreground/70">
                Общий баланс
              </div>
              <div className="mt-2 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                ₽ 0,00
              </div>
              <div className="mt-2 text-sm text-primary-foreground/75">
                Подключите счета и цифровой рубль через официальные интеграции, чтобы видеть
                реальный баланс.
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-11 bg-surface-elevated text-foreground hover:bg-surface"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Подключить счёт
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Показать QR
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Доходы", "₽ 0"],
                ["Расходы", "₽ 0"],
                ["Подписки", "0"],
                ["Документы", "0"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4 backdrop-blur"
                >
                  <div className="text-xs text-primary-foreground/70">{l}</div>
                  <div className="mt-1 font-display text-xl font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold">Быстрые действия</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {([
              { Icon: Send, label: "Перевести" },
              { Icon: Wallet, label: "Оплатить" },
              { Icon: QrCode, label: "QR-код" },
              { Icon: FileText, label: "Документ" },
              { Icon: BarChart3, label: "Аналитика" },
              { Icon: Sparkles, label: "AI" },
            ] as const).map(({ Icon, label }) => (
              <button
                key={label}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-elegant"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="text-sm font-medium">{label}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Modules preview */}
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-lg font-semibold">Модули кабинета</h2>
            <span className="text-xs text-muted-foreground">
              Подключаются через официальные API и партнёрские соглашения
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES_BY_ROLE[role].map((m) => (
              <div
                key={m.title}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-foreground/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-base font-semibold">{m.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                </div>
                <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  Скоро
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const MODULES_BY_ROLE: Record<AppRole, { title: string; desc: string }[]> = {
  citizen: [
    { title: "Кошелёк и счета", desc: "Баланс, история, лимиты и подключённые счета." },
    { title: "Платежи и переводы", desc: "QR, СБП, по реквизитам и по телефону." },
    { title: "Аналитика", desc: "Доходы, расходы, категории и прогноз." },
    { title: "Подписки и автоплатежи", desc: "Управление регулярными платежами." },
    { title: "Документы", desc: "Чеки, квитанции, выписки и архив." },
    { title: "AI-ассистент", desc: "Голосовые команды и быстрые сценарии." },
  ],
  self_employed: [
    { title: "Доходы и клиенты", desc: "История поступлений и карточки клиентов." },
    { title: "Каталог услуг", desc: "Цены, описания и публикация." },
    { title: "Счета и QR", desc: "Выставление счёта и оплата по QR." },
    { title: "Документы", desc: "Договоры, акты, шаблоны." },
    { title: "Налоги", desc: "Календарь, напоминания и подготовка данных." },
    { title: "AI-черновики", desc: "Готовые шаблоны документов." },
  ],
  sole_proprietor: [
    { title: "CRM", desc: "Лиды, сделки и воронка продаж." },
    { title: "Каталог и склад", desc: "Товары, остатки, инвентаризация." },
    { title: "Заказы", desc: "Оплата, доставка, история." },
    { title: "Финансы", desc: "ДДС, бюджет, платёжный календарь." },
    { title: "Команда и зарплата", desc: "Сотрудники, роли, начисления." },
    { title: "BI-аналитика", desc: "Дашборды, отчёты, прогнозы." },
  ],
  llc: [
    { title: "Холдинг", desc: "Организации, филиалы, юр. лица." },
    { title: "Казначейство", desc: "Очередь согласования и контроль лимитов." },
    { title: "Бюджеты", desc: "План, факт, прогноз, центры затрат." },
    { title: "Управление организациями", desc: "Реквизиты, банковские счета, документы." },
    { title: "Команды и роли", desc: "Иерархия, права, активность." },
    { title: "Compliance и аудит", desc: "Журнал безопасности и политики." },
  ],
  developer: [
    { title: "REST & GraphQL", desc: "Документация, версии, примеры." },
    { title: "SDK", desc: "12 языков, готовые шаблоны интеграции." },
    { title: "Sandbox", desc: "Тестовые пользователи, данные и события." },
    { title: "API Keys & OAuth", desc: "Ключи, скоупы, ротация, IP-allow." },
    { title: "Webhooks", desc: "Подписки, повторы, подпись запросов." },
    { title: "Marketplace", desc: "Публикация приложений и плагинов." },
  ],
  admin: [
    { title: "Пользователи", desc: "Поиск, фильтры, блокировки и приглашения." },
    { title: "Организации", desc: "Юр. лица, филиалы, ответственные." },
    { title: "Роли и права", desc: "RBAC, кастомные роли, разрешения." },
    { title: "Безопасность", desc: "Сессии, устройства, 2FA, подозрительная активность." },
    { title: "Мониторинг", desc: "Состояние API, очередей, баз и сервисов." },
    { title: "Журнал аудита", desc: "Полная история действий и фильтрация." },
  ],
};
