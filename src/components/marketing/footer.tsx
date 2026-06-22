import { Logo } from "@/components/brand/logo";

const COLUMNS = [
  {
    title: "Продукт",
    links: [
      ["Возможности", "#features"],
      ["Для граждан", "#citizens"],
      ["Для бизнеса", "#business"],
      ["Для разработчиков", "#developers"],
      ["Интеграции", "#integrations"],
    ],
  },
  {
    title: "Разработчикам",
    links: [
      ["REST API", "#developers"],
      ["GraphQL", "#developers"],
      ["SDK", "#developers"],
      ["Sandbox", "#developers"],
      ["Webhooks", "#developers"],
    ],
  },
  {
    title: "Компания",
    links: [
      ["Документация", "#features"],
      ["Поддержка", "#features"],
      ["Контакты", "#features"],
      ["Партнёрам", "#integrations"],
      ["Marketplace", "#integrations"],
    ],
  },
  {
    title: "Правовая информация",
    links: [
      ["Политика конфиденциальности", "#features"],
      ["Пользовательское соглашение", "#features"],
      ["Безопасность", "#features"],
      ["Compliance", "#features"],
    ],
  },
] as const;

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Единая платформа цифрового рубля России. Простая, безопасная и открытая
              финансовая экосистема нового поколения.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} ЦифроРубль. Все права защищены.</span>
          <span>Единая платформа цифрового рубля России</span>
        </div>
      </div>
    </footer>
  );
}
