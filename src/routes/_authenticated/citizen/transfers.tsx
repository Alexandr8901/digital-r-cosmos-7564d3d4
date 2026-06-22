import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, SectionCard } from "@/components/citizen/kit";
import { favorites, formatRub } from "@/lib/mock/citizen";

export const Route = createFileRoute("/_authenticated/citizen/transfers")({
  head: () => ({ meta: [{ title: "Переводы · ЦифроРубль" }] }),
  component: TransfersPage,
});

function TransfersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Переводы" description="Переводы между своими счетами и контактам" />

      <Tabs defaultValue="phone">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="own">Между своими</TabsTrigger>
          <TabsTrigger value="phone">По телефону</TabsTrigger>
          <TabsTrigger value="card">По реквизитам</TabsTrigger>
          <TabsTrigger value="qr">По QR</TabsTrigger>
          <TabsTrigger value="template">По шаблону</TabsTrigger>
        </TabsList>

        <TabsContent value="own" className="mt-6">
          <TransferForm fields={[
            { label: "Со счёта", placeholder: "Основной счёт •• 4521" },
            { label: "На счёт", placeholder: "Сберегательный •• 8810" },
            { label: "Сумма, ₽", placeholder: "5000", type: "number" },
          ]} />
        </TabsContent>

        <TabsContent value="phone" className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <TransferForm fields={[
            { label: "Номер телефона", placeholder: "+7 900 000-00-00" },
            { label: "Получатель", placeholder: "Имя получателя" },
            { label: "Сумма, ₽", placeholder: "1000", type: "number" },
            { label: "Сообщение", placeholder: "Необязательно" },
          ]} />
          <SectionCard title="Избранные">
            <div className="space-y-2">
              {favorites.map((f) => (
                <button key={f.id} className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted/50">
                  <Avatar className="h-9 w-9"><AvatarFallback className="bg-accent text-accent-foreground text-xs">{f.initials}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.phone}</div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="card" className="mt-6">
          <TransferForm fields={[
            { label: "Номер счёта или карты", placeholder: "0000 0000 0000 0000" },
            { label: "БИК", placeholder: "044525000" },
            { label: "Получатель", placeholder: "Иван Иванов" },
            { label: "Сумма, ₽", placeholder: "0", type: "number" },
          ]} />
        </TabsContent>

        <TabsContent value="qr" className="mt-6">
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Сканер QR доступен в мобильном приложении или из раздела <a href="/citizen/qr" className="text-foreground underline">QR</a>.
          </div>
        </TabsContent>

        <TabsContent value="template" className="mt-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {favorites.map((f) => (
              <div key={f.id} className="rounded-xl border border-border p-4">
                <div className="font-medium">Перевод: {f.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{f.phone}</div>
                <div className="mt-3 font-display text-lg font-semibold">{formatRub(2500)}</div>
                <Button size="sm" className="mt-3 w-full">Использовать</Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TransferForm({ fields }: { fields: { label: string; placeholder: string; type?: string }[] }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  return (
    <form
      className="space-y-4 rounded-2xl border border-border bg-card p-6"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Перевод создан");
      }}
    >
      {fields.map((f) => (
        <div key={f.label}>
          <Label>{f.label}</Label>
          <Input
            className="mt-1.5 h-11"
            placeholder={f.placeholder}
            type={f.type ?? "text"}
            value={vals[f.label] ?? ""}
            onChange={(e) => setVals({ ...vals, [f.label]: e.target.value })}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="submit"><Send className="mr-2 h-4 w-4" />Перевести</Button>
      </div>
    </form>
  );
}
