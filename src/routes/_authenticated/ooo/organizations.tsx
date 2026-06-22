import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column, StatusBadge } from "@/components/workspace/kit";
import { generateOrganizations, type Organization } from "@/lib/mock/business";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/ooo/organizations")({
  head: () => ({ meta: [{ title: "Организации — ООО" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateOrganizations(), []);
  const cols: Column<Organization>[] = [
    { key: "name", header: "Организация", render: (r) => <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Building2 className="h-3.5 w-3.5" /></div><div><div className="font-medium">{r.name}</div><div className="text-xs text-muted-foreground">{r.address}</div></div></div> },
    { key: "inn", header: "ИНН" },
    { key: "kpp", header: "КПП" },
    { key: "type", header: "Тип", render: (r) => <Badge variant="outline">{r.type.toUpperCase()}</Badge> },
    { key: "responsible", header: "Ответственный" },
    { key: "accountsCount", header: "Счета", className: "text-right" },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status === "archived" ? "inactive" : "active"} /> },
  ];
  return (
    <ModulePage title="Организации холдинга" description="Юридические лица, реквизиты и ответственные." action={<Button><Plus className="mr-1 h-4 w-4" />Добавить</Button>}>
      <DataTable rows={rows} columns={cols} searchKeys={["name", "inn", "responsible"]} filters={[{ key: "type", label: "тип", options: [{ value: "ip", label: "ИП" }, { value: "ooo", label: "ООО" }] }]} exportName="organizations" />
    </ModulePage>
  );
}
