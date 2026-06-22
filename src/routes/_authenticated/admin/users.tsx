import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, DataTable, StatusBadge, Tag } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus, Download, UserPlus } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({ meta: [{ title: "Пользователи · Администрирование" }] }),
  component: Page,
});

function Page() {
  const rows = admin.users(40).map(u => ({ ...u, lastSeenStr: admin.fmtDateTime(u.lastSeen), createdStr: admin.fmtDateTime(u.created), mfaStr: u.mfa ? "Да" : "Нет" }));
  return (
    <PlatformPage
      title="Пользователи"
      description="Управление учётными записями, ролями и доступами"
      integration={<IntegrationStatus />}
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button variant="outline" size="sm"><UserPlus className="mr-1.5 h-3.5 w-3.5" />Пригласить</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать</Button>
        </>
      }
    >
      <DataTable
        rows={rows}
        searchKeys={["name","email","org","role"] as any}
        filters={[
          { key: "status" as any, label: "Статус", options: [{value:"active",label:"Активен"},{value:"blocked",label:"Заблокирован"},{value:"invited",label:"Приглашён"},{value:"pending",label:"Ожидает"}] },
          { key: "role" as any, label: "Роль", options: admin.ROLE_DEFS.map(r => ({ value: r.key, label: r.label })) }
        ]}
        columns={[
          { key: "name", header: "Пользователь" },
          { key: "email", header: "E-mail" },
          { key: "org", header: "Организация" },
          { key: "role", header: "Роль", render: r => <Tag>{r.role}</Tag> },
          { key: "status", header: "Статус", render: r => <StatusBadge status={r.status} /> },
          { key: "mfaStr", header: "MFA" },
          { key: "lastSeenStr", header: "Был онлайн" },
        ]}
      />
    </PlatformPage>
  );
}
