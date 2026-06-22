import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import { SectionHeading } from "./features";

const PROMPTS = [
  "Оплати интернет на следующий месяц",
  "Покажи расходы за квартал",
  "Создай счёт на 84 000 ₽ для клиента «Анна К.»",
  "Подготовь договор на разработку сайта",
  "Какие налоги нужно оплатить в апреле?",
  "Сколько я заработал в этом месяце?",
  "Сделай финансовый отчёт за Q1",
  "Найди последний платёж за хостинг",
];

const CHAT = [
  { role: "user", text: "Покажи мои расходы за март по категориям" },
  {
    role: "ai",
    text:
      "За март вы потратили 41 870 ₽. Основные категории: Транспорт — 14 200 ₽, Продукты — 11 400 ₽, Подписки — 5 600 ₽. Расходы на подписки выросли на 18% — показать какие?",
  },
];

export function AiSection() {
  return (
    <section id="developers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="AI First"
              align="left"
              title="Финансовый ассистент, который понимает по-человечески"
              description="Спросите голосом или текстом. AI готовит черновики платежей, договоров и отчётов — окончательное выполнение всегда требует вашего подтверждения."
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {PROMPTS.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 shadow-card transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong overflow-hidden rounded-3xl border border-border shadow-elegant"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-5 py-3.5">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold">AI · ЦифроРубль</div>
                <div className="text-xs text-muted-foreground">
                  Подключено к вашим финансам · конфиденциально
                </div>
              </div>
            </div>

            <div className="space-y-3 p-5">
              {CHAT.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.15 }}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[90%] rounded-2xl rounded-tl-md bg-secondary px-4 py-2.5 text-sm text-foreground"
                  }
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            <div className="border-t border-border/60 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2">
                <input
                  disabled
                  placeholder="Спросите что угодно про ваши финансы…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
