import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column } from "@/components/workspace/kit";
import { generateAudit, fmtDateTime, type AuditEntry } from "@/lib/mock/business";
import { useMemo } from "react";

export const Route = createFileRoute("/_authenticated/ooo/audit")({
  head: () => ({ meta: [{ title: "Аудит — ООО" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateAudit(), []);
  const cols: Column<AuditEntry>[] = [
    { key: "at", header: "Когда", render: (r) => fmtDateTime(r.at), accessor: (r) => r.at },
    { key: "who", header: "Кто" },
    { key: "action", header: "Действие" },
    { key: "entity", header: "Сущность" },
    { key: "entityId", header: "ID" },
    { key: "ip", header: "IP" },
    { key: "device", header: "Устройство" },
  ];
  return (
    <ModulePage title="Аудит" description="Полная история действий: кто, когда, что изменил.">
      <DataTable rows={rows} columns={cols} searchKeys={["who", "action", "entity", "ip"]} filters={[{ key: "entity", label: "сущность", options: ["payment", "document", "user_role", "session", "report", "settings", "order"].map((v) => ({ value: v, label: v })) }]} exportName="audit" />
    </ModulePage>
  );
}
