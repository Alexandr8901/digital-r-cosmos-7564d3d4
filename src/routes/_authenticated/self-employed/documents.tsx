import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, DataTable, type Column } from "@/components/workspace/kit";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

type Doc = { id: string; name: string; type: string; client: string; createdAt: string; size: string };

export const Route = createFileRoute("/_authenticated/self-employed/documents")({
  head: () => ({ meta: [{ title: "Документы — Самозанятый" }] }),
  component: Page,
});

function Page() {
  const rows = useMemo<Doc[]>(() => [
    { id: "d1", name: "Договор оказания услуг №2026-001", type: "Договор", client: "ООО «Технологии Будущего»", createdAt: "2026-06-01", size: "184 КБ" },
    { id: "d2", name: "Акт выполненных работ №14", type: "Акт", client: "ИП Воронов А.Б.", createdAt: "2026-06-08", size: "92 КБ" },
    { id: "d3", name: "Счёт INV-2026-0007", type: "Счёт", client: "ООО «Орбита»", createdAt: "2026-06-10", size: "64 КБ" },
    { id: "d4", name: "Шаблон договора (типовой)", type: "Шаблон", client: "—", createdAt: "2026-05-20", size: "156 КБ" },
    { id: "d5", name: "Акт №13", type: "Акт", client: "ООО «Северный Ветер»", createdAt: "2026-05-30", size: "88 КБ" },
  ], []);
  const cols: Column<Doc>[] = [
    { key: "name", header: "Документ", render: (r) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{r.name}</span></div> },
    { key: "type", header: "Тип" },
    { key: "client", header: "Клиент" },
    { key: "createdAt", header: "Создан" },
    { key: "size", header: "Размер" },
  ];
  return (
    <ModulePage
      title="Документы"
      description="Договоры, акты, счета, шаблоны, версии и архив."
      action={<Button><Plus className="mr-1 h-4 w-4" />Новый документ</Button>}
    >
      <DataTable rows={rows} columns={cols} searchKeys={["name", "client"]} filters={[{ key: "type", label: "тип", options: ["Договор", "Акт", "Счёт", "Шаблон"].map((v) => ({ value: v, label: v })) }]} exportName="documents" />
    </ModulePage>
  );
}
