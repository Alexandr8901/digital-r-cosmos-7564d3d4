import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/developers/api")({
  head: () => ({ meta: [{ title: "API · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="API"
      description="Универсальный REST/GraphQL интерфейс"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "REST", description: "JSON по HTTPS" },
          { icon: Sparkles, title: "GraphQL", description: "Гибкие запросы" },
          { icon: Sparkles, title: "Webhooks", description: "Push-уведомления" },
          { icon: Sparkles, title: "OAuth 2.1", description: "Авторизация приложений" },
          { icon: Sparkles, title: "OpenAPI 3.1", description: "Спецификация" },
          { icon: Sparkles, title: "SDK", description: "12+ языков" }
        ]} />
    </PlatformPage>
  );
}
