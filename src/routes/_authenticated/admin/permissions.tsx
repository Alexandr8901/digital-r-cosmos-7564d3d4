import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, SectionCard } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import * as admin from "@/lib/mock/admin";

export const Route = createFileRoute("/_authenticated/admin/permissions")({
  head: () => ({ meta: [{ title: "Права доступа · Администрирование" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Права доступа"
      description="Матрица разрешений: модули × действия. Назначаются на роли и команды."
      action={<Button size="sm"><Save className="mr-1.5 h-3.5 w-3.5" />Сохранить</Button>}
    >
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Модуль</th>
              {admin.PERMISSIONS.map(p => <th key={p} className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">{p}</th>)}
            </tr>
          </thead>
          <tbody>
            {admin.PERMISSION_MODULES.map(m => (
              <tr key={m} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{m}</td>
                {admin.PERMISSIONS.map(p => (
                  <td key={p} className="px-3 py-2 text-center">
                    <Checkbox defaultChecked={Math.random() > 0.4} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <SectionCard title="Замечание">
        <p className="text-sm text-muted-foreground">
          Каждое разрешение назначается отдельно. Действия выполняются строго в пределах прав активной роли.
        </p>
      </SectionCard>
    </PlatformPage>
  );
}
