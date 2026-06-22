import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ModulePage, DataTable, Money, type Column } from "@/components/workspace/kit";
import { generateProducts, type Product } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Package } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/catalog")({
  head: () => ({ meta: [{ title: "Каталог — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateProducts(), []);
  const cols: Column<Product>[] = [
    {
      key: "name", header: "Товар",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-muted text-muted-foreground"><Package className="h-4 w-4" /></div>
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.sku} · {r.barcode}</div>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Категория" },
    { key: "stock", header: "Остаток", className: "text-right" },
    { key: "reserved", header: "Резерв", className: "text-right" },
    { key: "cost", header: "Себестоимость", className: "text-right", render: (r) => <Money value={r.cost} /> },
    { key: "price", header: "Цена", className: "text-right", render: (r) => <Money value={r.price} className="font-medium" /> },
  ];
  return (
    <ModulePage
      title="Каталог товаров"
      description="Управление номенклатурой, ценами и остатками."
      action={
        <>
          <Button variant="outline"><Upload className="mr-1 h-4 w-4" />Импорт</Button>
          <Button variant="outline"><Download className="mr-1 h-4 w-4" />Экспорт</Button>
          <Button><Plus className="mr-1 h-4 w-4" />Новый товар</Button>
        </>
      }
    >
      <DataTable
        rows={rows}
        columns={cols}
        searchKeys={["name", "sku", "barcode"]}
        filters={[{ key: "category", label: "категория", options: Array.from(new Set(rows.map((r) => r.category))).map((c) => ({ value: c, label: c })) }]}
        exportName="catalog"
      />
    </ModulePage>
  );
}
