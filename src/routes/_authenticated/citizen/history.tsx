import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { PageHeader } from "@/components/citizen/kit";
import { generateTransactions, formatRub, type TxStatus } from "@/lib/mock/citizen";

export const Route = createFileRoute("/_authenticated/citizen/history")({
  head: () => ({ meta: [{ title: "История · ЦифроРубль" }] }),
  component: HistoryPage,
});

const STATUS_LABEL: Record<TxStatus, { label: string; cls: string }> = {
  completed: { label: "Выполнено", cls: "bg-success/15 text-success border-success/20" },
  pending: { label: "В обработке", cls: "bg-warning/15 text-warning border-warning/20" },
  failed: { label: "Ошибка", cls: "bg-destructive/15 text-destructive border-destructive/20" },
};

function HistoryPage() {
  const all = useMemo(() => generateTransactions(120, 13), []);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const categories = useMemo(() => Array.from(new Set(all.map((t) => t.category))), [all]);

  const filtered = all.filter((t) => {
    if (q && !t.title.toLowerCase().includes(q.toLowerCase()) && !t.category.toLowerCase().includes(q.toLowerCase())) return false;
    if (category !== "all" && t.category !== category) return false;
    if (type !== "all" && t.type !== type) return false;
    if (status !== "all" && t.status !== status) return false;
    return true;
  });

  function exportCsv() {
    const header = "Дата;Описание;Категория;Сумма;Тип;Статус;Счёт\n";
    const rows = filtered
      .map((t) =>
        [new Date(t.date).toISOString(), t.title, t.category, t.amount, t.type, t.status, t.account].join(";"),
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="История операций"
        description={`Найдено ${filtered.length} из ${all.length}`}
        action={<Button variant="outline" onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Экспорт CSV</Button>}
      />

      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_180px_180px_180px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-10 pl-9" placeholder="Поиск" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <FilterSelect value={category} onChange={setCategory} options={[{ v: "all", l: "Все категории" }, ...categories.map((c) => ({ v: c, l: c }))]} />
          <FilterSelect value={type} onChange={setType} options={[
            { v: "all", l: "Все типы" },
            { v: "income", l: "Доход" },
            { v: "expense", l: "Расход" },
            { v: "transfer", l: "Перевод" },
          ]} />
          <FilterSelect value={status} onChange={setStatus} options={[
            { v: "all", l: "Любой статус" },
            { v: "completed", l: "Выполнено" },
            { v: "pending", l: "В обработке" },
            { v: "failed", l: "Ошибка" },
          ]} />
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Счёт</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Сумма</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                  <Filter className="mx-auto mb-2 h-5 w-5" />
                  Ничего не найдено по выбранным фильтрам
                </TableCell>
              </TableRow>
            )}
            {filtered.slice(0, 60).map((t) => (
              <TableRow key={t.id}>
                <TableCell className="text-sm text-muted-foreground">{new Date(t.date).toLocaleDateString("ru-RU")}</TableCell>
                <TableCell className="font-medium">{t.title}</TableCell>
                <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.account}</TableCell>
                <TableCell>
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase ${STATUS_LABEL[t.status].cls}`}>
                    {STATUS_LABEL[t.status].label}
                  </span>
                </TableCell>
                <TableCell className={`text-right font-semibold ${t.amount > 0 ? "text-success" : ""}`}>
                  {formatRub(t.amount, { sign: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o.v} value={o.v}>{o.l}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
