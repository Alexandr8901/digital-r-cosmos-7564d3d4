import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHero } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Пользовательское соглашение · ЦифроРубль" },
      { name: "description", content: "Условия использования платформы ЦифроРубль." },
      { property: "og:title", content: "Пользовательское соглашение · ЦифроРубль" },
      { property: "og:description", content: "Правила и условия пользования сервисами." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <MarketingShell>
      <PageHero eyebrow="Соглашение" title="Пользовательское соглашение" />
      <article className="mx-auto max-w-3xl px-4 pb-16">
        {[
          ["1. Предмет соглашения", "Регулирует отношения между ЦифроРубль и пользователями сервисов платформы."],
          ["2. Регистрация и аккаунт", "Пользователь обязан указывать достоверные данные и нести ответственность за безопасность аккаунта."],
          ["3. Допустимое использование", "Запрещено использовать платформу для незаконных действий, обхода защиты или нарушения прав третьих лиц."],
          ["4. Платные сервисы", "Тарифы и условия оплаты публикуются на странице /pricing и могут изменяться с предварительным уведомлением."],
          ["5. Ответственность", "Платформа не несёт ответственности за действия третьих сторон и форс-мажорные обстоятельства."],
          ["6. Изменения", "Соглашение может обновляться. Актуальная версия публикуется на этой странице."],
        ].map(([t, c]) => (
          <div key={t} className="mt-8 first:mt-0">
            <h2 className="font-display text-xl font-semibold">{t}</h2>
            <p className="mt-3 text-muted-foreground">{c}</p>
          </div>
        ))}
      </article>
    </MarketingShell>
  );
}
