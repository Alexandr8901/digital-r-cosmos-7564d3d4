import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { MarketingShell, PageHero } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты · ЦифроРубль" },
      { name: "description", content: "Контактные данные ЦифроРубль: офис, телефон, email." },
      { property: "og:title", content: "Контакты · ЦифроРубль" },
      { property: "og:description", content: "Свяжитесь с нами любым удобным способом." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <MarketingShell>
      <PageHero eyebrow="Контакты" title="Свяжитесь с нами" />
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { Icon: Mail, label: "Email", value: "hello@digitalruble.example" },
            { Icon: Phone, label: "Телефон", value: "8 800 000-00-00" },
            { Icon: MapPin, label: "Офис", value: "Москва, Россия" },
            { Icon: Mail, label: "Партнёрства", value: "partners@digitalruble.example" },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-6">
              <c.Icon className="h-5 w-5 text-accent-foreground" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
              <div className="mt-1 font-medium">{c.value}</div>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
