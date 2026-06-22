import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, Money, type Column } from "@/components/workspace/kit";
import { generateClients, fmtDate, type Client } from "@/lib/mock/business";
import { useMemo } from "react";
import { Building2, User } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/customers")({
  head: () => ({ meta: [{ title: "Покупатели — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateClients(36), []);
  const cols: Column<Client>[] = [
    {
      key: "name", header: "Покупатель",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-muted">
            {r.type === "company" ? <Building2 className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
          </div>
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.phone}</div>
          </div>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "ordersCount", header: "Заказов", className: "text-right" },
    { key: "totalSpent", header: "Оборот", className: "text-right", render: (r) => <Money value={r.totalSpent} className="font-medium" /> },
    { key: "lastInteractionAt", header: "Контакт", render: (r) => fmtDate(r.lastInteractionAt), accessor: (r) => r.lastInteractionAt },
  ];
  return (
    <ModulePage title="Покупатели" description="Карточки покупателей, контакты, история и теги.">
      <DataTable rows={rows} columns={cols} searchKeys={["name", "email", "phone"]} exportName="customers" />
    </ModulePage>
  );
}
