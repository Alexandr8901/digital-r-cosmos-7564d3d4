import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, DataTable, StatusBadge, Tag } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/organizations")({
  head: () => ({ meta: [{ title: "Организации · Администрирование" }] }),
  component: Page,
});

function Page() {
  const rows = admin.orgs(18).map(o => ({ ...o, createdStr: admin.fmtDateTime(o.created), membersStr: `${o.members}` }));
  return (
    <PlatformPage
      title="Организации"
      description="Юридические лица, ИП и самозанятые на платформе"
      integration={<IntegrationStatus />}
      action={<><Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать</Button></>}
    >
      <DataTable
        rows={rows}
        searchKeys={["name","inn","plan"] as any}
        filters={[
          { key: "type" as any, label: "Тип", options: [{value:"ООО",label:"ООО"},{value:"ИП",label:"ИП"},{value:"Самозанятый",label:"Самозанятый"}] },
          { key: "status" as any, label: "Статус", options: [{value:"active",label:"Активна"},{value:"suspended",label:"Приостановлена"}] },
        ]}
        columns={[
          { key: "name", header: "Организация" },
          { key: "inn", header: "ИНН" },
          { key: "type", header: "Тип", render: r => <Tag>{r.type}</Tag> },
          { key: "membersStr", header: "Сотрудников" },
          { key: "plan", header: "Тариф", render: r => <Tag variant="primary">{r.plan}</Tag> },
          { key: "status", header: "Статус", render: r => <StatusBadge status={r.status === "active" ? "active" : "blocked"} /> },
          { key: "createdStr", header: "Создана" },
        ]}
      />
    </PlatformPage>
  );
}
