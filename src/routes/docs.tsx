import { createFileRoute, Link } from "@tanstack/react-router";
import { Book, Code2, KeyRound, Webhook, Sparkles, ShieldCheck } from "lucide-react";
import { MarketingShell, PageHero } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Документация · ЦифроРубль" },
      { name: "description", content: "Гайды, справочники, рецепты и примеры для разработчиков." },
      { property: "og:title", content: "Документация · ЦифроРубль" },
      { property: "og:description", content: "Всё необходимое для интеграции с платформой." },
    ],
  }),
  component: DocsPage,
});

const SECTIONS = [
  { icon: Book, title: "Введение", description: "Концепции, архитектура и термины." },
  { icon: KeyRound, title: "Аутентификация", description: "OAuth 2.1, токены и ключи." },
  { icon: Code2, title: "API Reference", description: "Полный справочник эндпойнтов." },
  { icon: Webhook, title: "Webhooks", description: "Подписка на события платформы." },
  { icon: ShieldCheck, title: "Безопасность", description: "Шифрование, аудит и compliance." },
  { icon: Sparkles, title: "Рецепты", description: "Готовые сценарии и примеры кода." },
];

function DocsPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Документация"
        title="Всё для интеграции"
        subtitle="Руководства, справочники API, рецепты и примеры кода на нескольких языках."
      />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <Link
              key={s.title}
              to="/docs"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card"
            >
              <s.icon className="h-6 w-6 text-accent-foreground" />
              <div className="mt-4 font-display text-lg font-semibold group-hover:text-primary">{s.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
