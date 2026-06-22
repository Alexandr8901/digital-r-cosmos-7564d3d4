import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, DataTable, Tag } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/backups")({
  head: () => ({ meta: [{ title: "Резервные копии · Администрирование" }] }),
  component: Page,
});

function Page() {
  const rows = admin.backups().map(b => ({ ...b, whenStr: admin.fmtDateTime(b.when) }));
  return (
    <PlatformPage
      title="Резервное копирование"
      description="Создание, расписание, проверка и восстановление. Данные шифруются, чувствительная информация не отображается в интерфейсе."
      integration={<IntegrationStatus />}
      action={<><Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать копию</Button></>}
    >
      <DataTable
        rows={rows}
        searchKeys={["name","type"] as any}
        columns={[
          { key: "name", header: "Имя" },
          { key: "type", header: "Тип", render: r => <Tag>{r.type}</Tag> },
          { key: "size", header: "Размер" },
          { key: "location", header: "Хранилище" },
          { key: "status", header: "Статус", render: r => <Tag variant={r.status === "ok" ? "success" : "warning"}>{r.status}</Tag> },
          { key: "whenStr", header: "Создана" },
        ]}
      />
    </PlatformPage>
  );
}
