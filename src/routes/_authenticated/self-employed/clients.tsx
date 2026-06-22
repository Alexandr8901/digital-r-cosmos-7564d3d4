import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ModulePage, DataTable, Money, type Column } from "@/components/workspace/kit";
import { generateClients, fmtDate, type Client } from "@/lib/mock/business";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Phone, Building2, User } from "lucide-react";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/self-employed/clients")({
  head: () => ({ meta: [{ title: "Клиенты — Самозанятый" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo(() => generateClients(24), []);
  const [selected, setSelected] = useState<Client | null>(null);

  const cols: Column<Client>[] = [
    {
      key: "name", header: "Клиент",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-medium">
            {r.type === "company" ? <Building2 className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
          </div>
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.email}</div>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Телефон" },
    { key: "ordersCount", header: "Заказов", className: "text-right" },
    { key: "totalSpent", header: "Оборот", className: "text-right", render: (r) => <Money value={r.totalSpent} className="font-medium" /> },
    { key: "lastInteractionAt", header: "Контакт", render: (r) => fmtDate(r.lastInteractionAt), accessor: (r) => r.lastInteractionAt },
    { key: "tags", header: "Теги", render: (r) => <div className="flex gap-1">{r.tags.map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}</div> },
  ];

  return (
    <ModulePage
      title="Клиенты"
      description="Карточки клиентов, контакты, история и заметки."
      action={<Button><Plus className="mr-1 h-4 w-4" />Новый клиент</Button>}
    >
      <DataTable
        rows={rows}
        columns={cols}
        searchKeys={["name", "email", "phone"]}
        filters={[{ key: "type", label: "тип", options: [{ value: "person", label: "Физлицо" }, { value: "company", label: "Компания" }] }]}
        rowAction={(r) => setSelected(r)}
        exportName="clients"
      />

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.name}</SheetTitle>
                <SheetDescription>{selected.type === "company" ? "Компания" : "Физическое лицо"}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Row icon={<Mail className="h-4 w-4" />} label="Email" value={selected.email} />
                  <Row icon={<Phone className="h-4 w-4" />} label="Телефон" value={selected.phone} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Заказов" value={String(selected.ordersCount)} />
                  <Stat label="Оборот" value={<Money value={selected.totalSpent} />} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">История</div>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="rounded-lg border border-border p-3">Последний контакт: {fmtDate(selected.lastInteractionAt)}</li>
                    <li className="rounded-lg border border-border p-3 text-muted-foreground">Полная история подгружается из официального CRM API.</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </ModulePage>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg font-semibold">{value}</div>
    </div>
  );
}
