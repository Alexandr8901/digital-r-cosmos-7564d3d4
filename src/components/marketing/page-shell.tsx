import type { ReactNode } from "react";
import { MarketingHeader } from "./header";
import { MarketingFooter } from "./footer";
import { Badge } from "@/components/ui/badge";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <MarketingHeader />
      <main className="pt-24">{children}</main>
      <MarketingFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-accent/10 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28">
        {eyebrow && (
          <Badge variant="secondary" className="mb-5 bg-accent-soft text-accent-foreground">
            {eyebrow}
          </Badge>
        )}
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function FeatureGrid({
  items,
}: {
  items: { icon?: ReactNode; title: string; description: string; status?: "available" | "in-development" | "pending-api" }[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card"
          >
            {it.icon && (
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-foreground">
                {it.icon}
              </div>
            )}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold">{it.title}</h3>
              {it.status && <StatusBadge status={it.status} />}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StatusBadge({ status }: { status: "available" | "in-development" | "pending-api" }) {
  const map = {
    available: { label: "Доступно", className: "bg-success/15 text-success border-success/20" },
    "in-development": {
      label: "В разработке",
      className: "bg-warning/15 text-warning border-warning/20",
    },
    "pending-api": {
      label: "После официального API",
      className: "bg-muted text-muted-foreground border-border",
    },
  } as const;
  const m = map[status];
  return (
    <span className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${m.className}`}>
      {m.label}
    </span>
  );
}

export function CTASection({
  title = "Готовы начать?",
  subtitle = "Создайте аккаунт за 60 секунд и подключайтесь к экосистеме.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-3xl brand-deep p-10 text-on-brand md:p-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-white/80">{subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/auth/register"
              className="inline-flex h-11 items-center rounded-xl bg-white px-5 text-sm font-semibold text-primary hover:bg-white/90"
            >
              Начать бесплатно
            </a>
            <a
              href="/docs"
              className="inline-flex h-11 items-center rounded-xl border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Документация
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
