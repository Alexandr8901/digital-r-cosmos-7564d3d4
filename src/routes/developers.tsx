import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Code2, Webhook, Box, Terminal, KeyRound, FileJson, Sparkles, GitBranch,
} from "lucide-react";
import { MarketingShell, PageHero, FeatureGrid, CTASection } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Для разработчиков · ЦифроРубль" },
      { name: "description", content: "REST API, GraphQL, SDK, Sandbox, OAuth, Webhooks и OpenAPI спецификация." },
      { property: "og:title", content: "Для разработчиков · ЦифроРубль" },
      { property: "og:description", content: "Платформа для интеграции и разработки финансовых сервисов." },
    ],
  }),
  component: DevPage,
});

function DevPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Developer Platform"
        title="Платформа для разработчиков"
        subtitle="Полноценный набор инструментов для интеграции с финансовой экосистемой."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/api">Открыть API</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/docs">Документация</Link></Button>
        </div>
      </PageHero>
      <FeatureGrid
        items={[
          { icon: <Code2 className="h-5 w-5" />, title: "REST API", description: "Стандартизованный HTTPS-интерфейс.", status: "available" },
          { icon: <FileJson className="h-5 w-5" />, title: "GraphQL", description: "Гибкие запросы и подписки.", status: "in-development" },
          { icon: <Box className="h-5 w-5" />, title: "SDK", description: "Node.js, Python, Go, Java, Kotlin, Swift.", status: "in-development" },
          { icon: <Terminal className="h-5 w-5" />, title: "Sandbox", description: "Песочница с тестовыми данными." },
          { icon: <KeyRound className="h-5 w-5" />, title: "OAuth 2.1", description: "Безопасная авторизация приложений." },
          { icon: <Webhook className="h-5 w-5" />, title: "Webhooks", description: "Подписка на события в реальном времени." },
          { icon: <GitBranch className="h-5 w-5" />, title: "OpenAPI 3.1", description: "Машиночитаемая спецификация." },
          { icon: <Sparkles className="h-5 w-5" />, title: "AI помощник", description: "Подсказки по API и генерация кода." },
        ]}
      />
      <CTASection title="Готовы интегрировать?" subtitle="Получите тестовые ключи и попробуйте API в песочнице." />
    </MarketingShell>
  );
}
