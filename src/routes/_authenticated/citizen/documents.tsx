import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/citizen/kit";

export const Route = createFileRoute("/_authenticated/citizen/documents")({
  head: () => ({ meta: [{ title: "Документы · ЦифроРубль" }] }),
  component: DocsPage,
});

const DOCUMENTS = [
  { id: "d1", title: "Выписка по счёту за май 2026", type: "Выписка", date: "01.06.2026", size: "152 КБ" },
  { id: "d2", title: "Квитанция ЖКХ — Мосэнергосбыт", type: "Квитанция", date: "28.05.2026", size: "48 КБ" },
  { id: "d3", title: "Чек: ВкусВилл", type: "Чек", date: "27.05.2026", size: "12 КБ" },
  { id: "d4", title: "Договор оказания услуг №2024-15", type: "Договор", date: "20.05.2026", size: "1.2 МБ" },
  { id: "d5", title: "Налоговое уведомление 2025", type: "Налоги", date: "15.05.2026", size: "320 КБ" },
  { id: "d6", title: "Выписка по счёту за апрель 2026", type: "Выписка", date: "01.05.2026", size: "148 КБ" },
];

function DocsPage() {
  const [q, setQ] = useState("");
  const filtered = DOCUMENTS.filter((d) => d.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Документы" description={`${filtered.length} документов`} />
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="h-10 pl-9" placeholder="Поиск документа" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="grid gap-3">
        {filtered.map((d) => (
          <Card key={d.id} className="flex items-center gap-4 p-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{d.title}</div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{d.type}</Badge>
                <span>{d.date} · {d.size}</span>
              </div>
            </div>
            <Button variant="outline" size="sm"><Download className="mr-2 h-3.5 w-3.5" />Скачать</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
