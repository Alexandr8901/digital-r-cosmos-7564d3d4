import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/developers/events")({
  head: () => ({ meta: [{ title: "События · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="События"
      description="Каталог событий платформы"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <DataTable
        rows={mock.generateTxs(20).map(t => ({ ...t, dateStr: mock.fmtDateTime(t.date), amountStr: mock.fmtRub(t.amount) }))}
        searchKeys={["counterparty", "category", "channel"] as any}
        filters={[{ key: "channel" as any, label: "Канал", options: [{value:"Цифровой рубль",label:"Цифровой рубль"},{value:"СБП",label:"СБП"},{value:"Карта",label:"Карта"},{value:"Счёт",label:"Счёт"}] }]}
        columns={[
          { key: "dateStr", header: "Дата" },
          { key: "counterparty", header: "Контрагент" },
          { key: "category", header: "Категория", render: r => <Tag>{r.category}</Tag> },
          { key: "channel", header: "Канал", render: r => <Pill>{r.channel}</Pill> },
          { key: "status", header: "Статус", render: r => <StatusBadge status={r.status} /> },
          { key: "amount", header: "Сумма", render: r => <Money value={r.amount} sign /> },
        ]}
      />
    </PlatformPage>
  );
}
