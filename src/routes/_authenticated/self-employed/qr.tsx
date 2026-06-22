import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, IntegrationStatus, SectionCard, Money } from "@/components/workspace/kit";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, Share2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/self-employed/qr")({
  head: () => ({ meta: [{ title: "QR — Самозанятый" }] }),
  component: Page,
});

function Page() {
  const [amount, setAmount] = useState(5000);
  const [comment, setComment] = useState("Оплата услуги");
  return (
    <ModulePage
      title="QR для приёма оплаты"
      description="Сформируйте QR для СБП. Подключение к платёжному шлюзу — через официальное API."
      integration={<IntegrationStatus />}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <SectionCard title="Параметры">
          <div className="space-y-4">
            <div>
              <Label>Сумма (₽)</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
            </div>
            <div>
              <Label>Назначение</Label>
              <Input value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
              QR-код демонстрационный. После подключения СБП будет содержать реальные платёжные реквизиты.
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Превью QR">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <QRCodeSVG value={`https://pay.cifrorubl.demo/?amount=${amount}&comment=${encodeURIComponent(comment)}`} size={180} />
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-semibold"><Money value={amount} /></div>
              <div className="text-xs text-muted-foreground">{comment}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download className="mr-1 h-3.5 w-3.5" />PNG</Button>
              <Button variant="outline" size="sm"><Share2 className="mr-1 h-3.5 w-3.5" />Поделиться</Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </ModulePage>
  );
}
