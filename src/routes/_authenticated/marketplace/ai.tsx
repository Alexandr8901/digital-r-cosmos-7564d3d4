import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/marketplace/ai")({
  head: () => ({ meta: [{ title: "AI Marketplace · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="AI Marketplace"
      description="AI-инструменты"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "Финансовый анализ", description: "AI-инсайты" },
          { icon: Sparkles, title: "Документы", description: "Черновики" },
          { icon: Sparkles, title: "Продажи", description: "Прогнозы" },
          { icon: Sparkles, title: "CRM", description: "Скоринг лидов" },
          { icon: Sparkles, title: "Поддержка", description: "Ответы клиентам" },
          { icon: Sparkles, title: "Маркетинг", description: "Контент" }
        ]} />
    </PlatformPage>
  );
}
