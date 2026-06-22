import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageHero, CTASection } from "@/components/marketing/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/api")({
  head: () => ({
    meta: [
      { title: "API · ЦифроРубль" },
      { name: "description", content: "Документация публичного API ЦифроРубль: REST endpoints, аутентификация, ошибки и примеры." },
      { property: "og:title", content: "API · ЦифроРубль" },
      { property: "og:description", content: "REST API для интеграции с экосистемой ЦифроРубль." },
    ],
  }),
  component: ApiPage,
});

const ENDPOINTS = [
  { method: "GET", path: "/v1/account/balance", description: "Текущий баланс по всем счетам", status: "available" },
  { method: "POST", path: "/v1/transfers", description: "Создать перевод", status: "available" },
  { method: "GET", path: "/v1/transactions", description: "Список операций с фильтрами", status: "available" },
  { method: "POST", path: "/v1/qr", description: "Сгенерировать QR-код", status: "available" },
  { method: "GET", path: "/v1/subscriptions", description: "Подписки пользователя", status: "available" },
  { method: "POST", path: "/v1/documents", description: "Загрузка документа", status: "in-development" },
  { method: "POST", path: "/v1/payments/utility", description: "Оплата ЖКХ", status: "pending-api" },
  { method: "POST", path: "/v1/payments/tax", description: "Оплата налога", status: "pending-api" },
] as const;

export function ApiPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="API v1"
        title="Публичное API"
        subtitle="REST endpoints для интеграции с экосистемой ЦифроРубль. OpenAPI 3.1 спецификация и SDK."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/docs">Открыть документацию</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/developers">Песочница</Link></Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold">Основные эндпойнты</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          {ENDPOINTS.map((e, i) => (
            <div key={e.path} className={`flex items-center gap-4 p-4 ${i ? "border-t border-border" : ""} bg-card`}>
              <span className={`min-w-[60px] rounded-md px-2 py-1 text-center font-mono text-xs font-semibold ${
                e.method === "GET" ? "bg-success/15 text-success" : "bg-accent-soft text-accent-foreground"
              }`}>
                {e.method}
              </span>
              <code className="flex-1 font-mono text-sm">{e.path}</code>
              <span className="hidden text-sm text-muted-foreground md:block">{e.description}</span>
              <Badge variant="outline" className="shrink-0 text-xs">
                {e.status === "available" ? "Доступно" : e.status === "in-development" ? "В разработке" : "После API"}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="font-display text-2xl font-semibold">Пример запроса</h2>
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card p-6 text-sm">
{`curl https://api.digitalruble.example/v1/account/balance \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"

{
  "currency": "RUB",
  "available": 158420.50,
  "blocked": 0,
  "accounts": [...]
}`}
        </pre>
      </section>
      <CTASection />
    </MarketingShell>
  );
}
