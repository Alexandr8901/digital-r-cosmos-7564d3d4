import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, DataTable, StatusBadge, Tag, Pill } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/tickets")({
  head: () => ({ meta: [{ title: "Тикеты · Администрирование" }] }),
  component: Page,
});

function Page() {
  const rows = admin.tickets(30).map(t => ({ ...t, updatedStr: admin.fmtDateTime(t.updated) }));
  return (
    <PlatformPage
      title="Тикеты поддержки"
      description="Обращения пользователей, SLA и назначения"
      integration={<IntegrationStatus />}
      action={<><Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать</Button></>}
    >
      <DataTable
        rows={rows}
        searchKeys={["id","subject","requester","assignee"] as any}
        filters={[
          { key: "status" as any, label: "Статус", options: [{value:"new",label:"Новый"},{value:"open",label:"Открыт"},{value:"pending",label:"Ожидает"},{value:"resolved",label:"Решён"},{value:"closed",label:"Закрыт"}] },
          { key: "priority" as any, label: "Приоритет", options: [{value:"low",label:"Низкий"},{value:"normal",label:"Обычный"},{value:"high",label:"Высокий"},{value:"urgent",label:"Срочный"}] },
        ]}
        columns={[
          { key: "id", header: "№" },
          { key: "subject", header: "Тема" },
          { key: "category", header: "Категория", render: r => <Tag>{r.category}</Tag> },
          { key: "priority", header: "Приоритет", render: r => <Pill>{r.priority}</Pill> },
          { key: "requester", header: "Автор" },
          { key: "assignee", header: "Исполнитель" },
          { key: "status", header: "Статус", render: r => <StatusBadge status={r.status === "resolved" || r.status === "closed" ? "approved" : r.status === "new" ? "pending" : "active"} /> },
          { key: "sla", header: "SLA" },
          { key: "updatedStr", header: "Обновлён" },
        ]}
      />
    </PlatformPage>
  );
}
