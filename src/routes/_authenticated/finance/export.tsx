import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/finance/export")({
  head: () => ({ meta: [{ title: "Экспорт · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Экспорт"
      description="Выгрузка данных в CSV, Excel, PDF, JSON"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "CSV", description: "Простой текстовый формат" },
          { icon: Sparkles, title: "Excel", description: "XLSX для Microsoft Office" },
          { icon: Sparkles, title: "PDF", description: "Печатная форма" },
          { icon: Sparkles, title: "JSON", description: "Для интеграций" },
          { icon: Sparkles, title: "Архив", description: "ZIP со всеми форматами" },
          { icon: Sparkles, title: "Печать", description: "Готовая печатная форма" }
        ]} />
    </PlatformPage>
  );
}
