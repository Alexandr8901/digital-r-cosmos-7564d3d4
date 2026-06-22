import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/marketplace/categories")({
  head: () => ({ meta: [{ title: "Категории · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Категории"
      description="Категории Marketplace"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "Банки", description: "Расчётные счета" },
          { icon: Sparkles, title: "Бухгалтерия", description: "1С, Контур, СБИС" },
          { icon: Sparkles, title: "CRM", description: "amoCRM, Bitrix24" },
          { icon: Sparkles, title: "ERP", description: "1С, SAP, Microsoft" },
          { icon: Sparkles, title: "Документооборот", description: "ЭДО" },
          { icon: Sparkles, title: "Налоги", description: "Отчётность" },
          { icon: Sparkles, title: "Логистика", description: "СДЭК, Яндекс" },
          { icon: Sparkles, title: "Доставка", description: "Курьеры" },
          { icon: Sparkles, title: "Онлайн-кассы", description: "АТОЛ, Эвотор" },
          { icon: Sparkles, title: "Маркетинг", description: "Рассылки" },
          { icon: Sparkles, title: "E-commerce", description: "OZON, WB" },
          { icon: Sparkles, title: "AI", description: "Аналитика, помощники" }
        ]} />
    </PlatformPage>
  );
}
