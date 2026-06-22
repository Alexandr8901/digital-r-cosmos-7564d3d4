import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useMemo } from "react";

type Doc = { id: string; name: string; type: string; organization: string; createdAt: string; signed: string };

export const Route = createFileRoute("/_authenticated/ooo/documents")({
  head: () => ({ meta: [{ title: "Документы — ООО" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo<Doc[]>(() => Array.from({ length: 24 }, (_, i) => ({
    id: `d${i}`,
    name: `Документ №${2000 + i}`,
    type: ["Договор", "Доп. соглашение", "Акт", "УПД", "Приказ", "Доверенность"][i % 6],
    organization: ["ООО «ЦифроРубль Холдинг»", "ООО «ЦифроРубль Софт»", "ООО «ЦифроРубль Логистика»"][i % 3],
    createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString("ru-RU"),
    signed: i % 4 === 0 ? "Не подписан" : "Подписан ЭП",
  })), []);
  const cols: Column<Doc>[] = [
    { key: "name", header: "Документ", render: (r) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />{r.name}</div> },
    { key: "type", header: "Тип" },
    { key: "organization", header: "Организация" },
    { key: "createdAt", header: "Создан" },
    { key: "signed", header: "Подпись" },
  ];
  return (
    <ModulePage title="Документы" description="Договоры, акты, приказы, доверенности и ЭДО." action={<Button><Plus className="mr-1 h-4 w-4" />Документ</Button>}>
      <DataTable rows={rows} columns={cols} searchKeys={["name", "organization"]} filters={[{ key: "type", label: "тип", options: ["Договор", "Доп. соглашение", "Акт", "УПД", "Приказ", "Доверенность"].map((v) => ({ value: v, label: v })) }]} exportName="documents" />
    </ModulePage>
  );
}
