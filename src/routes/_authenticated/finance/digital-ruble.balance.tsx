import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/finance/digital-ruble/balance")({
  head: () => ({ meta: [{ title: "Баланс ЦР · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Баланс ЦР"
      description="Баланс и история"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Всего" value={mock.fmtRub(248_350)} hint="за месяц" trend={{ value: "+12,4%", positive: true }} />
        <StatCard label="Активных" value="124" hint="статус: ок" />
        <StatCard label="Среднее" value={mock.fmtRub(8_240)} />
        <StatCard label="Ошибок" value="0" hint="за 24ч" />
      </div>
      <SectionCard title="Динамика">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><div className="mb-2 text-xs text-muted-foreground">Запросы</div><MiniBar data={mock.series(20, 80, 60)} /></div>
          <div><div className="mb-2 text-xs text-muted-foreground">Объём</div><Sparkline data={mock.series(20, 100, 40)} /></div>
        </div>
      </SectionCard>
    </PlatformPage>
  );
}
