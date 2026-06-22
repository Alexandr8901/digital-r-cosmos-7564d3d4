import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useMemo } from "react";

type Doc = { id: string; name: string; type: string; counterparty: string; createdAt: string };

export const Route = createFileRoute("/_authenticated/ip/documents")({
  head: () => ({ meta: [{ title: "Документы — ИП" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo<Doc[]>(() => Array.from({ length: 18 }, (_, i) => ({
    id: `d${i}`,
    name: `Документ №${1000 + i}`,
    type: ["Договор", "Акт", "Счёт", "УПД", "ТТН"][i % 5],
    counterparty: ["ООО «Орбита»", "ИП Воронов", "ООО «Дельта-Софт»"][i % 3],
    createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString("ru-RU"),
  })), []);
  const cols: Column<Doc>[] = [
    { key: "name", header: "Документ", render: (r) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />{r.name}</div> },
    { key: "type", header: "Тип" },
    { key: "counterparty", header: "Контрагент" },
    { key: "createdAt", header: "Создан" },
  ];
  return (
    <ModulePage title="Документы" description="Договоры, акты, УПД, ТТН и шаблоны." action={<Button><Plus className="mr-1 h-4 w-4" />Документ</Button>}>
      <DataTable rows={rows} columns={cols} searchKeys={["name", "counterparty"]} filters={[{ key: "type", label: "тип", options: ["Договор", "Акт", "Счёт", "УПД", "ТТН"].map((v) => ({ value: v, label: v })) }]} exportName="documents" />
    </ModulePage>
  );
}
