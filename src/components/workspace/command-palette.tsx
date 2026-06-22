import { useEffect } from "react";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "@tanstack/react-router";
import {
  Users, Package, CreditCard, FileText, FileSignature, Building2, UserSquare2, Activity, ArrowRight,
} from "lucide-react";
import { GLOBAL_SEARCH_INDEX } from "@/lib/mock/business";
import { WORKSPACES } from "@/lib/workspace";

const ICONS = {
  client: Users,
  product: Package,
  payment: CreditCard,
  document: FileText,
  contract: FileSignature,
  organization: Building2,
  employee: UserSquare2,
  operation: Activity,
} as const;

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const grouped = GLOBAL_SEARCH_INDEX.reduce<Record<string, typeof GLOBAL_SEARCH_INDEX>>((acc, it) => {
    (acc[it.kind] ??= []).push(it);
    return acc;
  }, {});

  const groupLabel: Record<string, string> = {
    client: "Клиенты", product: "Товары", payment: "Платежи", document: "Документы",
    contract: "Договоры", organization: "Организации", employee: "Сотрудники", operation: "Операции",
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Поиск клиентов, товаров, документов, платежей…" />
      <CommandList>
        <CommandEmpty>Ничего не найдено</CommandEmpty>
        <CommandGroup heading="Перейти в кабинет">
          {WORKSPACES.map((w) => (
            <CommandItem
              key={w.kind}
              value={`workspace ${w.label}`}
              onSelect={() => {
                navigate({ to: w.basePath });
                onOpenChange(false);
              }}
            >
              <w.icon className="mr-2 h-4 w-4" />
              {w.label}
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        {Object.entries(grouped).map(([kind, items]) => {
          const Icon = ICONS[kind as keyof typeof ICONS] ?? Activity;
          return (
            <CommandGroup key={kind} heading={groupLabel[kind] ?? kind}>
              {items.slice(0, 6).map((it) => (
                <CommandItem
                  key={it.id}
                  value={`${kind} ${it.title} ${it.subtitle ?? ""}`}
                  onSelect={() => {
                    if (it.href) navigate({ to: it.href });
                    onOpenChange(false);
                  }}
                >
                  <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm">{it.title}</div>
                    {it.subtitle && <div className="text-xs text-muted-foreground">{it.subtitle}</div>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
