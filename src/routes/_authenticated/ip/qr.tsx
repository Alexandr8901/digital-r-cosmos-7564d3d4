import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, SectionCard, Money, IntegrationStatus } from "@/components/workspace/kit";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/ip/qr")({
  head: () => ({ meta: [{ title: "QR — ИП" }] }),
  component: Page,
});

function Page() {
  const [amount, setAmount] = useState(15000);
  const [note, setNote] = useState("Оплата заказа");
  return (
    <ModulePage title="QR-коды" description="Генерация QR для приёма платежей." integration={<IntegrationStatus />}>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <SectionCard title="Параметры">
          <div className="space-y-3">
            <div><Label>Сумма</Label><Input type="number" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} /></div>
            <div><Label>Назначение</Label><Input value={note} onChange={(e) => setNote(e.target.value)} /></div>
          </div>
        </SectionCard>
        <SectionCard title="QR">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-2xl bg-white p-4 shadow-card"><QRCodeSVG value={`pay/${amount}/${encodeURIComponent(note)}`} size={180} /></div>
            <div className="font-display text-xl font-semibold"><Money value={amount} /></div>
            <div className="text-xs text-muted-foreground">{note}</div>
          </div>
        </SectionCard>
      </div>
    </ModulePage>
  );
}
