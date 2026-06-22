import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/business/automation")({
  head: () => ({ meta: [{ title: "AI Автоматизация · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="AI Автоматизация"
      description="Сценарии автоматизации"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "Оплата → уведомление", description: "Триггер при поступлении" },
          { icon: Sparkles, title: "Просрочка → напоминание", description: "Уведомление контрагенту" },
          { icon: Sparkles, title: "Низкий остаток → задача", description: "Авто-задача закупщику" },
          { icon: Sparkles, title: "Новый клиент → менеджер", description: "Авто-назначение" }
        ]} />
    </PlatformPage>
  );
}
