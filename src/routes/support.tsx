import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare, Book, Mail, Phone } from "lucide-react";
import { MarketingShell, PageHero, CTASection } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Поддержка · ЦифроРубль" },
      { name: "description", content: "Центр поддержки: чат, база знаний, контакты." },
      { property: "og:title", content: "Поддержка · ЦифроРубль" },
      { property: "og:description", content: "Мы поможем 24/7." },
    ],
  }),
  component: SupportPage,
});

const CHANNELS = [
  { icon: MessageSquare, title: "Чат в приложении", description: "Среднее время ответа — 2 минуты.", href: "/citizen/support" },
  { icon: Book, title: "База знаний", description: "Руководства и ответы на популярные вопросы.", href: "/docs" },
  { icon: Mail, title: "Email", description: "support@digitalruble.example", href: "mailto:support@digitalruble.example" },
  { icon: Phone, title: "Горячая линия", description: "8 800 000-00-00 (круглосуточно)", href: "tel:88000000000" },
];

function SupportPage() {
  return (
    <MarketingShell>
      <PageHero eyebrow="Поддержка" title="Мы рядом 24/7" subtitle="Выберите удобный канал связи." />
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((c) => {
            const Inner = (
              <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card">
                <c.icon className="h-6 w-6 text-accent-foreground" />
                <div className="mt-4 font-display text-lg font-semibold">{c.title}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.description}</p>
              </div>
            );
            return c.href.startsWith("/") ? (
              <Link key={c.title} to={c.href}>{Inner}</Link>
            ) : (
              <a key={c.title} href={c.href}>{Inner}</a>
            );
          })}
        </div>
      </section>
      <CTASection title="Не нашли ответ?" subtitle="Напишите нам — поможем разобраться." />
    </MarketingShell>
  );
}
