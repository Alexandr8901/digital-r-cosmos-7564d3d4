import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/marketplace/security")({
  head: () => ({ meta: [{ title: "Безопасность · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Безопасность"
      description="Разрешения, OAuth, журнал доступа"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "Разрешения", description: "OAuth scopes" },
          { icon: Sparkles, title: "История доступа", description: "Все вызовы" },
          { icon: Sparkles, title: "API Keys", description: "Ключи приложения" },
          { icon: Sparkles, title: "Подключённые", description: "Активные приложения" },
          { icon: Sparkles, title: "Отозвать", description: "Снять доступ" }
        ]} />
    </PlatformPage>
  );
}
