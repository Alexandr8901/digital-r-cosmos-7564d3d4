import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState } from "@/components/platform/kit";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/notifications")({
  head: () => ({ meta: [{ title: "Уведомления · Администрирование" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Уведомления"
      description="Правила доставки Email, Push, SMS и Webhook"
      integration={<IntegrationStatus />}
      action={<Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Создать</Button>}
    >
      <EmptyState
        title="Раздел готов к работе"
        description="Интерфейс модуля «Уведомления» подключается к ядру платформы через официальные API и политику разграничения прав."
      />
    </PlatformPage>
  );
}
