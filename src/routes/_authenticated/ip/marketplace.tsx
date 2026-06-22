import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, IntegrationStatus } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Plug, Database, ShoppingBag, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ip/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace — ИП" }] }),
  component: Page,
});

const APPS = [
  { Icon: ShoppingBag, name: "Wildberries Sync", category: "Маркетплейсы", description: "Заказы, остатки, цены в одном месте", price: "999 ₽/мес" },
  { Icon: Database, name: "1С: Бухгалтерия", category: "Учёт", description: "Двусторонний обмен документами", price: "2 400 ₽/мес" },
  { Icon: MessageSquare, name: "WhatsApp Business", category: "Коммуникации", description: "Шаблоны сообщений и автоответы", price: "Бесплатно" },
  { Icon: Plug, name: "Telegram Bot", category: "Уведомления", description: "Уведомления о заказах и оплатах", price: "Бесплатно" },
];

function Page() {
  return (
    <ModulePage title="Marketplace" description="Расширения, интеграции и партнёрские приложения." integration={<IntegrationStatus status="in-development" label="Каталог пополняется — подключение приложений через официальные SDK" />}>
      <div className="grid gap-4 md:grid-cols-2">
        {APPS.map((a) => (
          <SectionCard key={a.name} title={a.name}>
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent"><a.Icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-1">{a.category}</Badge>
                <p className="text-sm text-muted-foreground">{a.description}</p>
                <div className="mt-2 text-xs font-medium">{a.price}</div>
              </div>
              <Button variant="outline" size="sm">Установить</Button>
            </div>
          </SectionCard>
        ))}
      </div>
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
        <div>
          <Store className="mx-auto h-8 w-8 text-muted-foreground" />
          <div className="mt-2 font-display text-base font-semibold">Скоро в каталоге</div>
          <div className="mt-1 text-sm text-muted-foreground">CRM Bitrix24, СБИС, Контур.Эльба, amoCRM, Яндекс.Маркет</div>
        </div>
      </div>
    </ModulePage>
  );
}
