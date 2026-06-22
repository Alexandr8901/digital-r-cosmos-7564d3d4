import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/business/reports")({
  head: () => ({ meta: [{ title: "Отчёты · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Отчёты"
      description="Готовые отчёты"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "Финансовый", description: "Доходы и расходы" },
          { icon: Sparkles, title: "Продажи", description: "По периодам и менеджерам" },
          { icon: Sparkles, title: "Склад", description: "Остатки и оборачиваемость" },
          { icon: Sparkles, title: "Закупки", description: "Поставщики и расходы" },
          { icon: Sparkles, title: "Кадры", description: "Сотрудники и активность" },
          { icon: Sparkles, title: "Налоги", description: "К уплате и история" }
        ]} />
    </PlatformPage>
  );
}
