import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column, StatusBadge } from "@/components/workspace/kit";
import { generateEmployees, fmtDate, type Employee } from "@/lib/mock/business";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/team")({
  head: () => ({ meta: [{ title: "Команда — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateEmployees(), []);
  const cols: Column<Employee>[] = [
    { key: "fullName", header: "Сотрудник", render: (r) => <div><div className="font-medium">{r.fullName}</div><div className="text-xs text-muted-foreground">{r.email}</div></div> },
    { key: "role", header: "Роль" },
    { key: "department", header: "Отдел" },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status === "invited" ? "awaiting" : r.status} /> },
    { key: "lastLoginAt", header: "Активность", render: (r) => fmtDate(r.lastLoginAt), accessor: (r) => r.lastLoginAt },
  ];
  return (
    <ModulePage title="Команда" description="Сотрудники, приглашения, роли и активность." action={<Button><Plus className="mr-1 h-4 w-4" />Пригласить</Button>}>
      <DataTable rows={rows} columns={cols} searchKeys={["fullName", "email", "role"]} filters={[{ key: "status", label: "статус", options: [{ value: "active", label: "Активные" }, { value: "invited", label: "Приглашённые" }, { value: "blocked", label: "Заблокированные" }] }]} exportName="team" />
    </ModulePage>
  );
}
