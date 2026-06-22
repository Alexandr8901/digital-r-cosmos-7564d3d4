import type { ReactNode } from "react";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Download, Filter, Plug, ShieldCheck, Clock, AlertTriangle, Inbox } from "lucide-react";
import { motion } from "framer-motion";

export { StatCard, PageHeader, EmptyState, SectionCard } from "@/components/citizen/kit";

export function Money({ value, sign, className }: { value: number; sign?: boolean; className?: string }) {
  const abs = Math.abs(value);
  const txt = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: abs >= 1000 ? 0 : 2,
  }).format(abs);
  const prefix = sign ? (value >= 0 ? "+ " : "− ") : value < 0 ? "− " : "";
  return (
    <span
      className={cn(
        "tabular-nums",
        sign && value > 0 && "text-success",
        sign && value < 0 && "text-destructive",
        className,
      )}
    >
      {prefix}
      {txt}
    </span>
  );
}

export function StatusBadge({
  status,
  labels,
}: {
  status: string;
  labels?: Record<string, { label: string; variant?: "default" | "success" | "warning" | "destructive" | "muted" }>;
}) {
  const map: Record<string, { label: string; variant?: "default" | "success" | "warning" | "destructive" | "muted" }> =
    labels ?? (DEFAULT_STATUS as any);
  const v = map[status] ?? { label: status, variant: "muted" as const };
  const variant = v.variant ?? "muted";
  const cls = ({
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/15 text-success border-success/20",
    warning: "bg-warning/15 text-warning border-warning/20",
    destructive: "bg-destructive/15 text-destructive border-destructive/20",
    muted: "bg-muted text-muted-foreground border-border",
  }[v.variant ?? "muted"];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {v.label}
    </span>
  );
}

const DEFAULT_STATUS = {
  paid: { label: "Оплачен", variant: "success" as const },
  pending: { label: "Ожидает", variant: "warning" as const },
  overdue: { label: "Просрочен", variant: "destructive" as const },
  draft: { label: "Черновик", variant: "muted" as const },
  cancelled: { label: "Отменён", variant: "muted" as const },
  active: { label: "Активный", variant: "success" as const },
  inactive: { label: "Неактивный", variant: "muted" as const },
  completed: { label: "Готово", variant: "success" as const },
  in_progress: { label: "В работе", variant: "default" as const },
  approved: { label: "Согласовано", variant: "success" as const },
  rejected: { label: "Отклонено", variant: "destructive" as const },
  awaiting: { label: "На согласовании", variant: "warning" as const },
};

export function IntegrationStatus({
  status = "pending-official-api",
  label,
}: {
  status?: "pending-official-api" | "live" | "in-development";
  label?: string;
}) {
  const map = {
    "pending-official-api": {
      icon: Plug,
      cls: "border-warning/30 bg-warning/10 text-warning",
      text: label ?? "Подключается через официальное API",
    },
    "in-development": {
      icon: Clock,
      cls: "border-border bg-muted text-muted-foreground",
      text: label ?? "В разработке",
    },
    live: {
      icon: ShieldCheck,
      cls: "border-success/30 bg-success/10 text-success",
      text: label ?? "Подключено",
    },
  } as const;
  const v = map[status];
  const Icon = v.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium", v.cls)}>
      <Icon className="h-3 w-3" />
      {v.text}
    </span>
  );
}

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
  sortable?: boolean;
  accessor?: (row: T) => string | number;
};

export function DataTable<T extends { id: string | number }>({
  rows,
  columns,
  searchKeys,
  filters,
  exportName = "export",
  emptyTitle = "Нет данных",
  emptyDescription = "Здесь появятся записи, когда вы их добавите.",
  rowAction,
  toolbar,
}: {
  rows: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  filters?: { key: keyof T; label: string; options: { value: string; label: string }[] }[];
  exportName?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  rowAction?: (row: T) => void;
  toolbar?: ReactNode;
}) {
  const [q, setQ] = useState("");
  const [filterVals, setFilterVals] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (q && searchKeys) {
        const hay = searchKeys.map((k) => String(r[k] ?? "")).join(" ").toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      for (const [k, v] of Object.entries(filterVals)) {
        if (v && v !== "all" && String((r as any)[k]) !== v) return false;
      }
      return true;
    });
  }, [rows, q, filterVals, searchKeys]);

  const exportCsv = () => {
    const headers = columns.map((c) => c.header);
    const lines = filtered.map((r) =>
      columns
        .map((c) => {
          const v = c.accessor ? c.accessor(r) : (r as any)[c.key];
          const s = v == null ? "" : String(v);
          return `"${s.replace(/"/g, '""')}"`;
        })
        .join(","),
    );
    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        {searchKeys && (
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск…" className="h-9 pl-9" />
          </div>
        )}
        {filters?.map((f) => (
          <Select
            key={String(f.key)}
            value={filterVals[String(f.key)] ?? "all"}
            onValueChange={(v) => setFilterVals((p) => ({ ...p, [String(f.key)]: v }))}
          >
            <SelectTrigger className="h-9 w-[170px]">
              <Filter className="mr-2 h-3.5 w-3.5" />
              <SelectValue placeholder={f.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все: {f.label}</SelectItem>
              {f.options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {toolbar}
          <Button variant="outline" size="sm" onClick={exportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            CSV
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Inbox className="h-5 w-5" />
          </div>
          <div className="font-display text-base font-semibold">{emptyTitle}</div>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{emptyDescription}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead key={String(c.key)} className={c.className}>
                    {c.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow
                  key={String(row.id)}
                  className={rowAction ? "cursor-pointer" : undefined}
                  onClick={rowAction ? () => rowAction(row) : undefined}
                >
                  {columns.map((c) => (
                    <TableCell key={String(c.key)} className={c.className}>
                      {c.render ? c.render(row) : String((row as any)[c.key] ?? "—")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
        <span>Показано {filtered.length} из {rows.length}</span>
        <span>Демо-данные</span>
      </div>
    </Card>
  );
}

export function ModulePage({
  title,
  description,
  action,
  integration,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  integration?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          {integration && <div className="mt-3">{integration}</div>}
        </div>
        {action && <div className="flex flex-wrap gap-2">{action}</div>}
      </div>
      {children}
    </motion.div>
  );
}

export function ErrorState({ title = "Что-то пошло не так", description, onRetry }: { title?: string; description?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-10 text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="font-display text-base font-semibold">{title}</div>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Повторить
        </Button>
      )}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 100, h = 28;
  const max = Math.max(...data, 1), min = Math.min(...data, 0);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1 || 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-7 w-full text-accent", className)} preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={pts} />
    </svg>
  );
}

export function KpiBadge({ value, positive }: { value: string; positive?: boolean }) {
  return (
    <Badge variant="outline" className={cn("font-medium", positive ? "text-success border-success/30 bg-success/10" : "text-destructive border-destructive/30 bg-destructive/10")}>
      {value}
    </Badge>
  );
}
