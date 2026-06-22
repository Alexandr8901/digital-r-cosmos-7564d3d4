import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  UserSquare2,
  Code2,
  Plug,
  Sparkles,
  Smartphone,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Безопасность",
    desc: "Шифрование данных, RBAC, JWT, журнал аудита и подготовка к стандартам отрасли.",
  },
  {
    icon: Zap,
    title: "Скорость",
    desc: "Серверные компоненты, оптимизированные API и кэширование для миллионов пользователей.",
  },
  {
    icon: UserSquare2,
    title: "Единый аккаунт",
    desc: "Граждане, самозанятые, ИП, ООО и разработчики — в одном аккаунте без повторного входа.",
  },
  {
    icon: Code2,
    title: "API First",
    desc: "REST, GraphQL, SDK, Sandbox, OAuth и Webhooks. Любая интеграция доступна разработчику.",
  },
  {
    icon: Plug,
    title: "Интеграции",
    desc: "Готовность к подключению банков, бухгалтерий, маркетплейсов и государственных сервисов.",
  },
  {
    icon: Sparkles,
    title: "AI",
    desc: "Встроенный ассистент: оплати интернет, покажи расходы, подготовь договор, найди платёж.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    desc: "Единый опыт на смартфоне, планшете и десктопе с быстрыми платежами и QR-сканером.",
  },
  {
    icon: Building2,
    title: "Официальные подключения",
    desc: "Архитектура для соглашений с банк-партнёрами и операторами цифрового рубля.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Преимущества"
          title="Платформа, в которой всё уже есть"
          description="Восемь принципов, на которых строится каждый модуль ЦифроРубля."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-foreground ring-1 ring-inset ring-accent/20">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-accent/0 transition-opacity group-hover:to-accent/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
