import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/finance/digital-ruble/banks")({
  head: () => ({ meta: [{ title: "Банки-партнёры ЦР · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Банки-партнёры ЦР"
      description="Подключённые банки"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "Сбербанк", description: "Системно значимый банк" },
          { icon: Sparkles, title: "ВТБ", description: "Системно значимый банк" },
          { icon: Sparkles, title: "Газпромбанк", description: "Банк-партнёр" },
          { icon: Sparkles, title: "Альфа-Банк", description: "Банк-партнёр" }
        ]} />
    </PlatformPage>
  );
}
