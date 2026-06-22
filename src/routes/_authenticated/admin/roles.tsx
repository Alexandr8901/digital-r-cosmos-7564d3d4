import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, SectionCard, Tag } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, KeyRound } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/roles")({
  head: () => ({ meta: [{ title: "Роли · Администрирование" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Роли (RBAC)"
      description="Базовые и пользовательские роли с разграничением полномочий"
      action={<Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать роль</Button>}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {admin.ROLE_DEFS.map(r => (
          <Card key={r.key} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <KeyRound className="h-4 w-4" />
              </div>
              <Tag>{r.users} польз.</Tag>
            </div>
            <div className="mt-3 font-display text-sm font-semibold">{r.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{r.desc}</div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Права</Button>
              <Button size="sm" variant="ghost">Изменить</Button>
            </div>
          </Card>
        ))}
      </div>

      <SectionCard title="Принцип наименьших привилегий (Least Privilege)">
        <p className="text-sm text-muted-foreground">
          Каждой роли назначаются только те полномочия, которые необходимы для выполнения её задач.
          Все назначения ролей и изменения прав фиксируются в журнале аудита.
        </p>
      </SectionCard>
    </PlatformPage>
  );
}
