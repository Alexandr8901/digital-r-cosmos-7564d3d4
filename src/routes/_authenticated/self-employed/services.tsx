import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ModulePage, DataTable, Money, StatusBadge, type Column } from "@/components/workspace/kit";
import { generateServices, type Service } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";

export const Route = createFileRoute("/_authenticated/self-employed/services")({
  head: () => ({ meta: [{ title: "Услуги — Самозанятый" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateServices(), []);

  const cols: Column<Service>[] = [
    {
      key: "name", header: "Услуга",
      render: (r) => (
        <div className="flex items-center gap-2">
          {r.favorite && <Star className="h-3.5 w-3.5 fill-warning text-warning" />}
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.sku}</div>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Категория" },
    { key: "price", header: "Стоимость", className: "text-right", render: (r) => <Money value={r.price} className="font-medium" /> },
    { key: "published", header: "Статус", render: (r) => <StatusBadge status={r.published ? "active" : "inactive"} /> },
  ];

  return (
    <ModulePage
      title="Каталог услуг"
      description="Создавайте услуги, управляйте ценами и публикацией."
      action={<Button><Plus className="mr-1 h-4 w-4" />Новая услуга</Button>}
    >
      <DataTable
        rows={rows}
        columns={cols}
        searchKeys={["name", "sku", "category"]}
        filters={[{ key: "category", label: "категория", options: Array.from(new Set(rows.map((r) => r.category))).map((c) => ({ value: c, label: c })) }]}
        exportName="services"
      />
    </ModulePage>
  );
}
