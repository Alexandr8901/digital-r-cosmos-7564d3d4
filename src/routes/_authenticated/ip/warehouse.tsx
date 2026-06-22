import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column, StatCard, Money } from "@/components/workspace/kit";
import { generateProducts, type Product } from "@/lib/mock/business";
import { useMemo } from "react";
import { Warehouse, Package, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/ip/warehouse")({
  head: () => ({ meta: [{ title: "Склад — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateProducts(), []);
  const totalStock = rows.reduce((s, r) => s + r.stock, 0);
  const totalValue = rows.reduce((s, r) => s + r.stock * r.cost, 0);
  const lowStock = rows.filter((r) => r.stock < 20).length;

  const cols: Column<Product>[] = [
    { key: "name", header: "Товар", render: (r) => <div><div className="font-medium">{r.name}</div><div className="text-xs text-muted-foreground">{r.sku}</div></div> },
    { key: "stock", header: "Остаток", className: "text-right", render: (r) => <span className={r.stock < 20 ? "text-destructive" : ""}>{r.stock}</span> },
    { key: "reserved", header: "Резерв", className: "text-right" },
    { key: "cost", header: "Себестоимость", className: "text-right", render: (r) => <Money value={r.cost} /> },
    { key: "value", header: "Стоимость", className: "text-right", accessor: (r) => r.stock * r.cost, render: (r) => <Money value={r.stock * r.cost} className="font-medium" /> },
  ];
  return (
    <ModulePage
      title="Склад"
      description="Остатки, перемещения, инвентаризация, приход и расход."
      action={
        <>
          <Button variant="outline"><ArrowDownToLine className="mr-1 h-4 w-4" />Приход</Button>
          <Button variant="outline"><ArrowUpFromLine className="mr-1 h-4 w-4" />Расход</Button>
          <Button>Инвентаризация</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Позиций" value={rows.length} icon={<Package className="h-4 w-4" />} />
        <StatCard label="Единиц на складе" value={totalStock} icon={<Warehouse className="h-4 w-4" />} />
        <StatCard label="Стоимость остатков" value={<Money value={totalValue} />} />
        <StatCard label="Низкий остаток" value={lowStock} hint="< 20 единиц" />
      </div>
      <DataTable rows={rows} columns={cols} searchKeys={["name", "sku"]} exportName="warehouse" />
    </ModulePage>
  );
}
