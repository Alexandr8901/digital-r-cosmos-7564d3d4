import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";

const COLUMNS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Продукт",
    links: [
      { to: "/features", label: "Возможности" },
      { to: "/citizens", label: "Для граждан" },
      { to: "/business", label: "Для бизнеса" },
      { to: "/developers", label: "Для разработчиков" },
      { to: "/pricing", label: "Тарифы" },
    ],
  },
  {
    title: "Разработчикам",
    links: [
      { to: "/api", label: "API" },
      { to: "/docs", label: "Документация" },
      { to: "/developers", label: "SDK и Sandbox" },
    ],
  },
  {
    title: "Поддержка",
    links: [
      { to: "/support", label: "Центр поддержки" },
      { to: "/contacts", label: "Контакты" },
      { to: "/security", label: "Безопасность" },
    ],
  },
  {
    title: "Правовое",
    links: [
      { to: "/terms", label: "Пользовательское соглашение" },
      { to: "/privacy", label: "Политика конфиденциальности" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Единая финансовая экосистема России. Один аккаунт для граждан, бизнеса
              и разработчиков.
            </p>
            <div className="mt-6 flex gap-2">
              <Link
                to="/auth/register"
                className="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Начать бесплатно
              </Link>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold">{col.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} ЦифроРубль. Все права защищены.</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-success" />
            Все системы работают штатно
          </div>
        </div>
      </div>
    </footer>
  );
}
