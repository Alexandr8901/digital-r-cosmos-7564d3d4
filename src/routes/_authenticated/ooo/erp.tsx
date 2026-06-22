import { createFileRoute, Link } from "@tanstack/react-router";
import { ModulePage, SectionCard, StatCard, Money } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Warehouse, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ooo/erp")({
  head: () => ({ meta: [{ title: "ERP — ООО" }] }),
  component: Page,
});

function Page() {
  return (
    <ModulePage title="ERP-контур" description="Управление заказами, складом, каталогом и поставками.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="SKU в каталоге" value="2 482" icon={<Package className="h-4 w-4" />} />
        <StatCard label="Заказов в работе" value={146} icon={<ShoppingCart className="h-4 w-4" />} />
        <StatCard label="Стоимость остатков" value={<Money value={284600000} />} icon={<Warehouse className="h-4 w-4" />} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Каталог", to: "/ip/catalog", text: "Товары, цены, остатки" },
          { title: "Склад", to: "/ip/warehouse", text: "Остатки, перемещения, инвентаризация" },
          { title: "Заказы", to: "/ip/orders", text: "Жизненный цикл и доставка" },
        ].map((c) => (
          <SectionCard key={c.title} title={c.title}>
            <p className="text-sm text-muted-foreground">{c.text}</p>
            <Button asChild variant="outline" size="sm" className="mt-4"><Link to={c.to}>Открыть <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </SectionCard>
        ))}
      </div>
    </ModulePage>
  );
}
