import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, DataTable, Tag } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart2 } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/reports")({
  head: () => ({ meta: [{ title: "Отчёты · Администрирование" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Отчёты"
      description="Готовые шаблоны отчётов с расписанием и экспортом в CSV/Excel/PDF/JSON"
      integration={<IntegrationStatus />}
      action={<Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>}
    >
      <DataTable
        rows={admin.reports}
        searchKeys={["name","category"] as any}
        columns={[
          { key: "name", header: "Отчёт", render: r => <div className="flex items-center gap-2"><FileBarChart2 className="h-3.5 w-3.5 text-muted-foreground" />{r.name}</div> },
          { key: "category", header: "Категория", render: r => <Tag>{r.category}</Tag> },
          { key: "schedule", header: "Расписание" },
        ]}
      />
    </PlatformPage>
  );
}
