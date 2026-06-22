import { motion } from "framer-motion";
import {
  Landmark,
  ScrollText,
  Users,
  Package,
  ShoppingBag,
  Receipt,
  FileSignature,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "./features";

type Status = "available" | "in_progress" | "via_partner";

interface Integration {
  name: string;
  icon: LucideIcon;
  status: Status;
}

const STATUS_LABEL: Record<Status, { label: string; cls: string }> = {
  available: {
    label: "Доступно",
    cls: "bg-success/10 text-success ring-1 ring-inset ring-success/20",
  },
  in_progress: {
    label: "В разработке",
    cls: "bg-warning/15 text-warning-foreground ring-1 ring-inset ring-warning/30",
  },
  via_partner: {
    label: "Через официальный API",
    cls: "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
  },
};

const ITEMS: Integration[] = [
  { name: "Банки-партнёры", icon: Landmark, status: "via_partner" },
  { name: "Государственные сервисы", icon: ScrollText, status: "via_partner" },
  { name: "CRM-системы", icon: Users, status: "available" },
  { name: "ERP-системы", icon: Package, status: "in_progress" },
  { name: "Бухгалтерия", icon: Receipt, status: "in_progress" },
  { name: "Интернет-магазины", icon: ShoppingBag, status: "available" },
  { name: "Документооборот", icon: FileSignature, status: "via_partner" },
  { name: "Маркетплейсы / Логистика", icon: Truck, status: "in_progress" },
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Экосистема"
          title="Готовность к официальным интеграциям"
          description="Платформа спроектирована для подключения через официальные API и партнёрские соглашения. Прямые подключения активируются по мере доступности."
        />

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface ring-1 ring-inset ring-border">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_LABEL[item.status].cls}`}
                >
                  {STATUS_LABEL[item.status].label}
                </span>
              </div>
              <div className="font-display text-base font-semibold">{item.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
