import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { MarketingShell, PageHero, CTASection } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Тарифы · ЦифроРубль" },
      { name: "description", content: "Прозрачные тарифы для граждан, бизнеса и разработчиков." },
      { property: "og:title", content: "Тарифы · ЦифроРубль" },
      { property: "og:description", content: "Гибкие планы для каждого типа пользователей." },
    ],
  }),
  component: PricingPage,
});

const PLANS = [
  {
    name: "Базовый",
    price: "0 ₽",
    period: "навсегда",
    description: "Для граждан и личного использования.",
    features: [
      "Личный кабинет гражданина",
      "Платежи и переводы",
      "QR-коды и автоплатежи",
      "Аналитика и история",
      "AI-помощник: 50 запросов / мес",
    ],
    cta: "Начать бесплатно",
    highlight: false,
  },
  {
    name: "Бизнес",
    price: "990 ₽",
    period: "в месяц",
    description: "Для самозанятых, ИП и небольших ООО.",
    features: [
      "Всё из Базового",
      "CRM и документооборот",
      "Платежи бизнеса",
      "Команда до 10 человек",
      "AI-помощник: 1000 запросов / мес",
      "Приоритетная поддержка",
    ],
    cta: "Начать пробный период",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "По запросу",
    period: "",
    description: "Для крупных компаний и холдингов.",
    features: [
      "Всё из Бизнес",
      "SSO и SCIM",
      "Расширенный аудит",
      "SLA и выделенный менеджер",
      "Безлимитный AI",
      "Кастомные интеграции",
    ],
    cta: "Связаться",
    highlight: false,
  },
];

function PricingPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Тарифы"
        title="Простые и прозрачные"
        subtitle="Начните бесплатно. Расширяйтесь по мере роста потребностей."
      />
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative rounded-2xl border bg-card p-8",
                p.highlight ? "border-primary shadow-elegant" : "border-border",
              )}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Популярный
                </div>
              )}
              <div className="font-display text-lg font-semibold">{p.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold">{p.price}</span>
                {p.period && <span className="text-sm text-muted-foreground">{p.period}</span>}
              </div>
              <Button
                asChild
                variant={p.highlight ? "default" : "outline"}
                className="mt-6 w-full"
              >
                <Link to={p.name === "Enterprise" ? "/contacts" : "/auth/register"}>{p.cta}</Link>
              </Button>
              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </MarketingShell>
  );
}
