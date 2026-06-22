import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight, Copy, Check } from "lucide-react";
import { useState } from "react";

export { StatCard, PageHeader, EmptyState, SectionCard } from "@/components/citizen/kit";
export { Money, StatusBadge, IntegrationStatus, DataTable, ErrorState, Skeleton, Sparkline, KpiBadge, ModulePage } from "@/components/workspace/kit";
export type { Column } from "@/components/workspace/kit";

export function PlatformPage({
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
          {description && <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>}
          {integration && <div className="mt-3">{integration}</div>}
        </div>
        {action && <div className="flex flex-wrap gap-2">{action}</div>}
      </div>
      {children}
    </motion.div>
  );
}

export function FeatureGrid({ items }: { items: { icon: any; title: string; description: string; to?: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Card key={i} className="group p-4 transition-colors hover:bg-muted/40">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <it.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 font-display text-sm font-semibold">
                {it.title}
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{it.description}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function CodeBlock({ language, code }: { language?: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#0b1020] text-[13px]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/60">
          {language ?? "code"}
        </div>
        <button onClick={copy} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-white/70 hover:bg-white/10">
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Скопировано" : "Копировать"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ListRow({
  title,
  subtitle,
  right,
  icon,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 border-b border-border px-4 py-3 last:border-0", className)}>
      {icon && <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground">{icon}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{title}</div>
        {subtitle && <div className="truncate text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      {right && <div className="text-right text-sm">{right}</div>}
    </div>
  );
}

export function StepNav({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "grid h-6 w-6 place-items-center rounded-full border text-[11px] font-medium",
              i < current && "border-success bg-success/15 text-success",
              i === current && "border-primary bg-primary text-primary-foreground",
              i > current && "border-border bg-muted text-muted-foreground",
            )}
          >
            {i < current ? <Check className="h-3 w-3" /> : i + 1}
          </div>
          <div className={cn("text-xs", i === current ? "font-medium" : "text-muted-foreground")}>{s}</div>
          {i < steps.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
        </div>
      ))}
    </div>
  );
}

export function Tag({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "primary" | "success" | "warning" }) {
  const cls = {
    default: "bg-muted text-muted-foreground border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  }[variant];
  return (
    <Badge variant="outline" className={cn("font-normal", cls)}>
      {children}
    </Badge>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px]", className)}>
      {children}
    </span>
  );
}

export function QuickAction({ icon: Icon, label, onClick, to }: { icon: any; label: string; onClick?: () => void; to?: string }) {
  const inner = (
    <>
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-xs font-medium leading-tight">{label}</div>
    </>
  );
  const cls = "group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center transition-shadow hover:shadow-md";
  if (to) return <a href={to} className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

export function MiniBar({ data, color = "var(--primary)" }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex h-10 items-end gap-1">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{ height: `${Math.max(8, (v / max) * 100)}%`, background: color, opacity: 0.6 + (v / max) * 0.4 }}
        />
      ))}
    </div>
  );
}

export function Donut({ value, label }: { value: number; label?: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative inline-flex h-14 w-14 items-center justify-center">
      <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
        <circle cx="30" cy="30" r={r} stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" fill="none" />
        <circle cx="30" cy="30" r={r} stroke="currentColor" strokeWidth="6" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" className="text-primary" />
      </svg>
      <div className="absolute text-center">
        <div className="text-[11px] font-semibold leading-none">{value}%</div>
        {label && <div className="text-[9px] text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}
