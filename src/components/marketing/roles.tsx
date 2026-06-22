import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Briefcase, Store, Building2, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./features";

interface RoleDef {
  id: "citizen" | "self_employed" | "sole_proprietor" | "llc" | "developer";
  title: string;
  subtitle: string;
  icon: LucideIcon;
  highlights: string[];
}

const ROLES: RoleDef[] = [
  {
    id: "citizen",
    title: "Гражданин",
    subtitle: "Личные финансы и платежи",
    icon: User,
    highlights: [
      "Оплата QR, переводы, СБП",
      "ЖКХ, интернет, штрафы, налоги",
      "История, аналитика и подписки",
      "Документы и автоплатежи",
      "AI-помощник для финансов",
      "Уведомления и безопасность",
    ],
  },
  {
    id: "self_employed",
    title: "Самозанятый",
    subtitle: "Доход без бюрократии",
    icon: Briefcase,
    highlights: [
      "Каталог услуг и клиенты",
      "Выставление счетов и QR",
      "Договоры, акты, шаблоны",
      "Аналитика доходов",
      "Налоговый календарь",
      "AI-черновики документов",
    ],
  },
  {
    id: "sole_proprietor",
    title: "ИП",
    subtitle: "Полноценный ERP-кабинет",
    icon: Store,
    highlights: [
      "CRM, заказы, поставщики",
      "Каталог товаров и услуг",
      "Склад и инвентаризация",
      "Платежи и СБП",
      "Команда, зарплата и налоги",
      "BI-аналитика и отчёты",
    ],
  },
  {
    id: "llc",
    title: "ООО",
    subtitle: "Enterprise: холдинг и казначейство",
    icon: Building2,
    highlights: [
      "Несколько организаций и филиалов",
      "Казначейство и согласования",
      "Центры затрат и бюджеты",
      "Финансовое планирование",
      "Настраиваемые BI-дашборды",
      "Аудит и compliance",
    ],
  },
  {
    id: "developer",
    title: "Разработчик",
    subtitle: "Developer Platform",
    icon: Code2,
    highlights: [
      "REST API и GraphQL",
      "SDK для 12 языков",
      "Sandbox с тестовыми данными",
      "OAuth 2.1 и Webhooks",
      "OpenAPI, Postman, CLI",
      "Marketplace расширений",
    ],
  },
];

export function RolesSection() {
  const [active, setActive] = useState<RoleDef["id"]>("citizen");
  const role = ROLES.find((r) => r.id === active)!;

  return (
    <section id="citizens" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Возможности по ролям"
          title="Один аккаунт — пять режимов работы"
          description="После регистрации выберите роль. Переключайтесь мгновенно — интерфейс адаптируется."
        />

        <div id="business" className="mt-14 grid gap-3 sm:grid-cols-5">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              className={cn(
                "group rounded-2xl border p-4 text-left transition-all",
                active === r.id
                  ? "border-accent/40 bg-accent-soft/40 shadow-card"
                  : "border-border bg-card hover:border-border hover:bg-muted/50",
              )}
            >
              <div
                className={cn(
                  "mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                  active === r.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground/70 group-hover:bg-secondary",
                )}
              >
                <r.icon className="h-4.5 w-4.5" />
              </div>
              <div className="font-display text-base font-semibold">{r.title}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{r.subtitle}</div>
            </button>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-0 lg:grid-cols-[1fr_1.1fr]"
            >
              <div className="p-8 sm:p-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                  <role.icon className="h-3.5 w-3.5" />
                  {role.title}
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                  {role.subtitle}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Всё, что нужно роли «{role.title}», уже встроено в платформу и работает на единой
                  инфраструктуре безопасности и API.
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-foreground/85">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <RolePreview role={role.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function RolePreview({ role }: { role: RoleDef["id"] }) {
  return (
    <div className="relative isolate min-h-[360px] overflow-hidden border-t border-border bg-gradient-to-br from-primary/5 via-surface to-accent/10 p-8 sm:p-12 lg:border-l lg:border-t-0">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div className="relative grid h-full place-items-center">
        <div className="w-full max-w-md space-y-3">
          {role === "citizen" && <CitizenPreview />}
          {role === "self_employed" && <SelfEmployedPreview />}
          {role === "sole_proprietor" && <ErpPreview />}
          {role === "llc" && <LlcPreview />}
          {role === "developer" && <DeveloperPreview />}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: string;
}) {
  return (
    <div className="glass-strong rounded-2xl p-4 shadow-card">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <div className="font-display text-2xl font-semibold">{value}</div>
        {trend && <div className="text-xs font-medium text-success">{trend}</div>}
      </div>
    </div>
  );
}

function CitizenPreview() {
  return (
    <>
      <MetricCard label="Общий баланс" value="₽ 248 530,40" trend="+ 12 430 ₽" />
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Доходы" value="₽ 84 200" />
        <MetricCard label="Расходы" value="₽ 41 870" />
      </div>
      <div className="glass-strong space-y-2 rounded-2xl p-4 shadow-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Последние операции
        </div>
        {[
          ["Перевод · Анна К.", "− 4 200 ₽"],
          ["Оплата QR · Кофейня", "− 320 ₽"],
          ["Поступление · Зарплата", "+ 86 000 ₽"],
        ].map(([t, v]) => (
          <div key={t} className="flex items-center justify-between text-sm">
            <span className="text-foreground/80">{t}</span>
            <span className="font-medium tabular-nums">{v}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function SelfEmployedPreview() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Доход / месяц" value="₽ 312 000" trend="+ 18%" />
        <MetricCard label="Клиенты" value="42" />
      </div>
      <div className="glass-strong rounded-2xl p-4 shadow-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Счёт № 0124
        </div>
        <div className="mt-1 font-display text-xl font-semibold">Веб-разработка · март</div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">К оплате</span>
          <span className="font-semibold tabular-nums">₽ 84 000,00</span>
        </div>
        <button className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
          Отправить QR
        </button>
      </div>
    </>
  );
}

function ErpPreview() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Выручка" value="₽ 4,2 М" trend="+ 9,4%" />
        <MetricCard label="Заказы" value="186" />
      </div>
      <div className="glass-strong rounded-2xl p-4 shadow-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Топ-товары
        </div>
        <div className="mt-3 space-y-2">
          {[
            ["Кофе арабика 250 г", 72],
            ["Чай зелёный", 51],
            ["Шоколад тёмный", 38],
          ].map(([name, v]) => (
            <div key={name as string}>
              <div className="flex justify-between text-sm">
                <span>{name}</span>
                <span className="tabular-nums text-muted-foreground">{v as number} шт.</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${(v as number) * 1.2}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LlcPreview() {
  return (
    <>
      <MetricCard label="Консолидированный баланс" value="₽ 38,4 М" trend="3 ЮЛ · 7 счетов" />
      <div className="glass-strong rounded-2xl p-4 shadow-card">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Очередь согласования
        </div>
        <div className="mt-3 space-y-2 text-sm">
          {[
            ["ООО «Альфа» · Поставщик", "₽ 480 000", "На утверждении"],
            ["Филиал СПб · Аренда", "₽ 92 000", "Утверждено"],
            ["Холдинг · Налоги Q1", "₽ 1 240 000", "На утверждении"],
          ].map(([who, sum, status]) => (
            <div key={who} className="flex items-center justify-between">
              <div>
                <div className="text-foreground/90">{who}</div>
                <div className="text-xs text-muted-foreground">{status}</div>
              </div>
              <div className="font-semibold tabular-nums">{sum}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DeveloperPreview() {
  return (
    <>
      <div className="glass-strong rounded-2xl p-4 font-mono text-[12.5px] leading-relaxed shadow-card">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
          <span className="ml-2 text-xs text-muted-foreground">POST /v1/payments</span>
        </div>
        <pre className="overflow-x-auto text-foreground/90">
{`const payment = await cifrorubl.payments.create({
  amount: 12400,
  currency: "RUB",
  description: "Оплата заказа №3120",
  payer: { phone: "+7..." }
});`}
        </pre>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="API запросов" value="2,4 М" trend="+ 240 / мин" />
        <MetricCard label="Uptime" value="99,99%" />
      </div>
    </>
  );
}
