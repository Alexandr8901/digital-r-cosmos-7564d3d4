import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, DataTable, Tag } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/audit")({
  head: () => ({ meta: [{ title: "Журнал аудита · Администрирование" }] }),
  component: Page,
});

function Page() {
  const rows = admin.auditLog(80).map(e => ({ ...e, whenStr: admin.fmtDateTime(e.when) }));
  return (
    <PlatformPage
      title="Журнал аудита"
      description="Все административные действия записываются с указанием актора, IP, устройства и результата"
      integration={<IntegrationStatus />}
      action={<Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>}
    >
      <DataTable
        rows={rows}
        searchKeys={["who","action","label","target","ip"] as any}
        filters={[
          { key: "result" as any, label: "Результат", options: [{value:"success",label:"Успех"},{value:"failed",label:"Ошибка"}] },
        ]}
        columns={[
          { key: "whenStr", header: "Когда" },
          { key: "who", header: "Кто" },
          { key: "label", header: "Действие" },
          { key: "action", header: "Код", render: r => <Tag>{r.action}</Tag> },
          { key: "target", header: "Объект" },
          { key: "ip", header: "IP" },
          { key: "device", header: "Устройство" },
          { key: "result", header: "Результат", render: r => <Tag variant={r.result === "success" ? "success" : "warning"}>{r.result === "success" ? "OK" : "Ошибка"}</Tag> },
        ]}
      />
    </PlatformPage>
  );
}
