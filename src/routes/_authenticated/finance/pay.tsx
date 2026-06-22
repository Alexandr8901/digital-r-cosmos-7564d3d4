import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { PlatformPage, IntegrationStatus, SectionCard } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Zap, Building2, QrCode, CreditCard, Wallet } from "lucide-react";
import { sberInitPayment } from "@/lib/sber.functions";

export const Route = createFileRoute("/_authenticated/finance/pay")({
  head: () => ({
    meta: [
      { title: "Оплата · ЦифроРубль" },
      { name: "description", content: "Запуск моментального платежа через Сбер API и другие каналы." },
    ],
  }),
  component: PayPage,
});

type MethodId = "sber" | "sbp" | "card" | "digital-ruble";

const METHODS: Array<{
  id: MethodId;
  title: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  enabled: boolean;
}> = [
  { id: "sber", title: "Сбер · Моментальный платёж", hint: "Sber API · register.do", icon: Building2, badge: "Рекомендуем", enabled: true },
  { id: "sbp", title: "СБП", hint: "Платёж по QR через СБП", icon: QrCode, enabled: false },
  { id: "card", title: "Банковская карта", hint: "Visa, Mastercard, МИР", icon: CreditCard, enabled: false },
  { id: "digital-ruble", title: "Цифровой рубль", hint: "Перевод с кошелька ЦБ РФ", icon: Wallet, enabled: false },
];

function PayPage() {
  const initSber = useServerFn(sberInitPayment);
  const [method, setMethod] = useState<MethodId>("sber");
  const [amount, setAmount] = useState("1000");
  const [description, setDescription] = useState("Пополнение баланса ЦифроРубль");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const orderNumber = useMemo(
    () => `ORD-${Date.now().toString(36).toUpperCase()}`,
    [],
  );

  const amountKopecks = Math.round(Number(amount.replace(",", ".")) * 100);
  const canPay = method === "sber" && amountKopecks > 0 && !loading;

  async function handlePay() {
    if (method !== "sber") {
      toast.info("Этот метод появится после подключения соответствующего партнёра.");
      return;
    }
    setLoading(true);
    try {
      const origin = window.location.origin;
      const res = await initSber({
        data: {
          amount: amountKopecks,
          orderNumber,
          description: description || undefined,
          email: email || undefined,
          returnUrl: `${origin}/finance/pay?status=success&order=${orderNumber}`,
          failUrl: `${origin}/finance/pay?status=fail&order=${orderNumber}`,
        },
      });
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success("Заказ создан. Переходим к оплате…");
      window.location.href = res.formUrl;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось создать платёж");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PlatformPage
      title="Оплата"
      description="Выберите способ оплаты и запустите моментальный платёж"
      integration={<IntegrationStatus />}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <SectionCard title="Способ оплаты" description="Каналы, доступные в вашем кабинете">
            <div className="grid gap-3 sm:grid-cols-2">
              {METHODS.map((m) => {
                const Icon = m.icon;
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => m.enabled && setMethod(m.id)}
                    disabled={!m.enabled}
                    className={[
                      "group flex items-start gap-3 rounded-xl border p-4 text-left transition",
                      active
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "border-border hover:border-primary/40 hover:bg-muted/40",
                      !m.enabled && "opacity-60 cursor-not-allowed",
                    ].filter(Boolean).join(" ")}
                  >
                    <div className={["mt-0.5 rounded-lg p-2", active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"].join(" ")}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{m.title}</div>
                        {m.badge && <Badge variant="secondary" className="text-[10px]">{m.badge}</Badge>}
                        {!m.enabled && <Badge variant="outline" className="text-[10px]">скоро</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{m.hint}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Параметры платежа" description="Сумма и назначение">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="amount">Сумма, ₽</Label>
                <Input id="amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="order">Номер заказа</Label>
                <Input id="order" value={orderNumber} readOnly className="font-mono text-xs" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="desc">Назначение</Label>
                <Textarea id="desc" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email">E-mail для чека (необязательно)</Label>
                <Input id="email" type="email" placeholder="client@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Zap className="h-4 w-4 text-primary" /> Итого к оплате
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">
              {(amountKopecks / 100).toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Метод: <span className="text-foreground">{METHODS.find((m) => m.id === method)?.title}</span>
            </div>
            <Button className="mt-5 w-full" size="lg" onClick={handlePay} disabled={!canPay}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
              Оплатить через Сбер
            </Button>
            <div className="mt-3 flex items-start gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Платёж проводится на стороне Сбербанка. Реквизиты карты в наш сервис не передаются.
            </div>
          </Card>

          <Card className="p-5 text-xs text-muted-foreground space-y-2">
            <div className="text-sm font-medium text-foreground">Интеграция</div>
            <div>Используется официальный REST API Сбербанк Эквайринг (<code className="font-mono">register.do</code>).</div>
            <div>Среда определяется переменной <code className="font-mono">SBER_API_ENV</code> (<code>test</code> / <code>prod</code>).</div>
          </Card>
        </div>
      </div>
    </PlatformPage>
  );
}
