import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Camera, Download, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader, EmptyState } from "@/components/citizen/kit";
import { formatRub } from "@/lib/mock/citizen";

export const Route = createFileRoute("/_authenticated/citizen/qr")({
  head: () => ({ meta: [{ title: "QR · ЦифроРубль" }] }),
  component: QrPage,
});

function QrPage() {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const payload = JSON.stringify({ to: "user_demo", amount: amount || 0, comment });

  return (
    <div className="space-y-6">
      <PageHeader title="QR" description="Принимайте и совершайте оплаты через QR-код" />
      <Tabs defaultValue="show">
        <TabsList>
          <TabsTrigger value="show">Мой QR</TabsTrigger>
          <TabsTrigger value="scan">Сканировать</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="show" className="mt-6 grid gap-6 md:grid-cols-[1fr_360px]">
          <Card className="p-6">
            <div className="font-display text-lg font-semibold">Параметры QR</div>
            <div className="mt-4 space-y-4">
              <div>
                <Label>Сумма, ₽ (необязательно)</Label>
                <Input className="mt-1.5 h-11" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
              </div>
              <div>
                <Label>Комментарий</Label>
                <Input className="mt-1.5 h-11" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="За кофе" />
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" className="flex-1"><Download className="mr-2 h-4 w-4" />Скачать</Button>
              <Button className="flex-1"><Share2 className="mr-2 h-4 w-4" />Поделиться</Button>
            </div>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6">
            <div className="rounded-2xl border-4 border-primary/10 bg-white p-4">
              <QRCodeSVG value={payload} size={220} fgColor="#0e1a3a" />
            </div>
            <div className="mt-4 text-center">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Получатель</div>
              <div className="mt-1 font-medium">ЦифроРубль · Демо-пользователь</div>
              {amount && <div className="mt-2 font-display text-2xl font-semibold">{formatRub(Number(amount))}</div>}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="scan" className="mt-6">
          <EmptyState
            icon={<Camera className="h-6 w-6" />}
            title="Сканер QR"
            description="Сканирование доступно в мобильном приложении. На десктопе используйте оплату по реквизитам или телефону."
          />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <EmptyState
            icon={<Star className="h-6 w-6" />}
            title="Истории пока нет"
            description="Здесь появятся ваши последние QR-оплаты и сохранённые QR-коды."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
