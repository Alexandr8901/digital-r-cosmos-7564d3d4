import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader, Money, IntegrationStatus, SectionCard } from "@/components/workspace/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronLeft, ChevronRight, QrCode, ReceiptText, Send } from "lucide-react";
import { generateClients, generateServices, type Client, type Service } from "@/lib/mock/business";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/self-employed/invoices/new")({
  head: () => ({ meta: [{ title: "Новый счёт — Самозанятый" }] }),
  component: Page,
});

const STEPS = ["Клиент", "Услуги", "Условия", "Способ оплаты", "Предпросмотр", "Готово"] as const;

type Item = { service: Service; qty: number };

function Page() {
  const navigate = useNavigate();
  const clients = useMemo(() => generateClients(18), []);
  const services = useMemo(() => generateServices(), []);
  const [step, setStep] = useState(0);
  const [client, setClient] = useState<Client | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [comment, setComment] = useState("");
  const [dueDays, setDueDays] = useState(7);
  const [method, setMethod] = useState<"qr" | "bank" | "card">("qr");

  const total = items.reduce((s, i) => s + i.service.price * i.qty, 0);
  const canNext =
    (step === 0 && client) || (step === 1 && items.length > 0) ||
    step === 2 || step === 3 || step === 4 || step === 5;

  function toggle(s: Service) {
    setItems((p) =>
      p.find((x) => x.service.id === s.id) ? p.filter((x) => x.service.id !== s.id) : [...p, { service: s, qty: 1 }],
    );
  }

  function submit() {
    toast({ title: "Счёт создан", description: `${client?.name} · ${total.toLocaleString("ru-RU")} ₽ — отправлен клиенту.` });
    setStep(5);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Новый счёт"
        description="Мастер выставления счёта в 5 шагов."
        action={
          <Button asChild variant="outline">
            <Link to="/self-employed/invoices">К списку</Link>
          </Button>
        }
      />

      <Stepper step={step} />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && (
                <ClientStep clients={clients} value={client} onChange={setClient} />
              )}
              {step === 1 && (
                <ServicesStep services={services} items={items} onToggle={toggle} onQty={(id, q) =>
                  setItems((p) => p.map((x) => x.service.id === id ? { ...x, qty: q } : x))
                } />
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-semibold">Условия</h2>
                  <div>
                    <Label>Комментарий клиенту</Label>
                    <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Например: оплата по договору №12 от 01.06" />
                  </div>
                  <div>
                    <Label>Срок оплаты (дней)</Label>
                    <Input type="number" value={dueDays} onChange={(e) => setDueDays(+e.target.value || 7)} min={1} max={60} className="max-w-[140px]" />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-semibold">Способ оплаты</h2>
                  <RadioGroup value={method} onValueChange={(v) => setMethod(v as any)} className="space-y-2">
                    <MethodOption value="qr" label="СБП-QR" desc="Клиент сканирует QR и платит мгновенно" />
                    <MethodOption value="bank" label="Банковский перевод" desc="Реквизиты счёта в письме" />
                    <MethodOption value="card" label="Картой по ссылке" desc="Платёжная ссылка через эквайринг" />
                  </RadioGroup>
                  <IntegrationStatus />
                </div>
              )}
              {step === 4 && (
                <Preview client={client} items={items} comment={comment} dueDays={dueDays} method={method} total={total} />
              )}
              {step === 5 && (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                    <Check className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold">Счёт отправлен</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Клиент получит уведомление в течение минуты.</p>
                  <div className="mt-6 flex justify-center gap-2">
                    <Button onClick={() => navigate({ to: "/self-employed/invoices" })}>К списку счетов</Button>
                    <Button variant="outline" onClick={() => { setStep(0); setClient(null); setItems([]); }}>
                      Создать ещё
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step < 5 && (
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                <ChevronLeft className="mr-1 h-4 w-4" />Назад
              </Button>
              {step === 4 ? (
                <Button onClick={submit}>
                  <Send className="mr-1 h-4 w-4" />Отправить клиенту
                </Button>
              ) : (
                <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
                  Далее<ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </Card>

        <div className="space-y-4">
          <SectionCard title="Итого">
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Услуг</span>
                <span className="font-medium">{items.length}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-3">
                <span className="text-sm text-muted-foreground">К оплате</span>
                <span className="font-display text-2xl font-semibold"><Money value={total} /></span>
              </div>
              {client && (
                <div className="rounded-lg bg-muted/40 p-3 text-xs">
                  <div className="text-muted-foreground">Клиент</div>
                  <div className="mt-0.5 font-medium">{client.name}</div>
                </div>
              )}
            </div>
          </SectionCard>
          <SectionCard title="QR-код оплаты">
            <div className="aspect-square rounded-xl border border-dashed border-border bg-muted/40 p-6">
              <div className="grid h-full w-full place-items-center text-muted-foreground">
                <div className="text-center">
                  <QrCode className="mx-auto mb-2 h-12 w-12" />
                  <div className="text-xs">QR появится в предпросмотре</div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex flex-wrap gap-2">
      {STEPS.map((s, i) => (
        <li
          key={s}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            i === step
              ? "border-primary bg-primary text-primary-foreground"
              : i < step
              ? "border-success/30 bg-success/10 text-success"
              : "border-border bg-card text-muted-foreground"
          }`}
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-background/30 text-[10px]">{i < step ? <Check className="h-3 w-3" /> : i + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}

function ClientStep({ clients, value, onChange }: { clients: Client[]; value: Client | null; onChange: (c: Client) => void }) {
  const [q, setQ] = useState("");
  const filtered = clients.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Выберите клиента</h2>
      <Input placeholder="Поиск клиента…" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="max-h-[420px] space-y-1 overflow-y-auto">
        {filtered.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onChange(c)}
              className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                value?.id === c.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
              }`}
            >
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.phone}</div>
              </div>
              {value?.id === c.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServicesStep({ services, items, onToggle, onQty }: {
  services: Service[]; items: Item[];
  onToggle: (s: Service) => void; onQty: (id: string, q: number) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Выберите услуги</h2>
      <ul className="max-h-[440px] space-y-2 overflow-y-auto">
        {services.map((s) => {
          const it = items.find((i) => i.service.id === s.id);
          return (
            <li key={s.id} className={`rounded-lg border p-3 transition-colors ${it ? "border-primary bg-primary/5" : "border-border"}`}>
              <div className="flex items-center justify-between gap-3">
                <button onClick={() => onToggle(s)} className="flex-1 text-left">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.category} · <Money value={s.price} /></div>
                </button>
                {it && (
                  <Input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => onQty(s.id, Math.max(1, +e.target.value || 1))}
                    className="w-20"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MethodOption({ value, label, desc }: { value: string; label: string; desc: string }) {
  return (
    <Label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
      <RadioGroupItem value={value} className="mt-0.5" />
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </Label>
  );
}

function Preview({ client, items, comment, dueDays, method, total }: {
  client: Client | null; items: Item[]; comment: string; dueDays: number; method: string; total: number;
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold">Предпросмотр</h2>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Счёт на оплату</div>
            <div className="font-display text-lg font-semibold">INV-2026-{String(Math.floor(Math.random() * 9999)).padStart(4, "0")}</div>
          </div>
          <ReceiptText className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Клиент</div>
            <div className="font-medium">{client?.name}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Срок оплаты</div>
            <div className="font-medium">{dueDays} дней</div>
          </div>
        </div>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {items.map((it) => (
            <li key={it.service.id} className="flex items-center justify-between py-2 text-sm">
              <span>{it.service.name} × {it.qty}</span>
              <Money value={it.service.price * it.qty} className="font-medium" />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Итого к оплате</span>
          <span className="font-display text-2xl font-semibold"><Money value={total} /></span>
        </div>
        {comment && <div className="mt-3 rounded-lg bg-muted/40 p-3 text-xs">{comment}</div>}
        <div className="mt-3 text-xs text-muted-foreground">Способ оплаты: {method.toUpperCase()}</div>
      </div>
    </div>
  );
}
