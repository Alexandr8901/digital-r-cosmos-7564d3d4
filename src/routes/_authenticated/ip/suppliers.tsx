import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, Money, StatusBadge, type Column } from "@/components/workspace/kit";
import { generateSuppliers, type Supplier } from "@/lib/mock/business";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/suppliers")({
  head: () => ({ meta: [{ title: "Поставщики — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateSuppliers(), []);
  const cols: Column<Supplier>[] = [
    { key: "name", header: "Поставщик", render: (r) => <div><div className="font-medium">{r.name}</div><div className="text-xs text-muted-foreground">ИНН {r.inn}</div></div> },
    { key: "contact", header: "Контакт" },
    { key: "phone", header: "Телефон" },
    { key: "deliveriesCount", header: "Поставок", className: "text-right" },
    { key: "totalPaid", header: "Оборот", className: "text-right", render: (r) => <Money value={r.totalPaid} /> },
    { key: "status", header: "Статус", render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <ModulePage title="Поставщики" description="Карточки, контакты, документы и история поставок." action={<Button><Plus className="mr-1 h-4 w-4" />Поставщик</Button>}>
      <DataTable rows={rows} columns={cols} searchKeys={["name", "inn", "contact"]} exportName="suppliers" />
    </ModulePage>
  );
}
