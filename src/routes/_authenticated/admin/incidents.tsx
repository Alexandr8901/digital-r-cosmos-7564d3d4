import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, DataTable, Tag, Pill } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/incidents")({
  head: () => ({ meta: [{ title: "Инциденты · Администрирование" }] }),
  component: Page,
});

function Page() {
  const rows = admin.incidents(16).map(i => ({ ...i, startedStr: admin.fmtDateTime(i.started) }));
  return (
    <PlatformPage
      title="Инциденты"
      description="Управление инцидентами: статус, приоритет, ответственные и постмортем"
      integration={<IntegrationStatus />}
      action={<Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Открыть инцидент</Button>}
    >
      <DataTable
        rows={rows}
        searchKeys={["id","title","owner"] as any}
        filters={[
          { key: "severity" as any, label: "Severity", options: [{value:"sev1",label:"SEV1"},{value:"sev2",label:"SEV2"},{value:"sev3",label:"SEV3"}] },
          { key: "status" as any, label: "Статус", options: [{value:"investigating",label:"Расследование"},{value:"identified",label:"Идентифицирован"},{value:"monitoring",label:"Мониторинг"},{value:"resolved",label:"Решён"}] },
        ]}
        columns={[
          { key: "id", header: "№" },
          { key: "title", header: "Описание" },
          { key: "severity", header: "Severity", render: r => <Pill>{r.severity.toUpperCase()}</Pill> },
          { key: "status", header: "Статус", render: r => <Tag variant={r.status === "resolved" ? "success" : "warning"}>{r.status}</Tag> },
          { key: "owner", header: "Ответственный" },
          { key: "duration", header: "Длительность" },
          { key: "startedStr", header: "Начало" },
        ]}
      />
    </PlatformPage>
  );
}
