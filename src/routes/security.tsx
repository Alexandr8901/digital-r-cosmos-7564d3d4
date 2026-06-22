import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, Server, FileCheck, Eye, AlertOctagon } from "lucide-react";
import { MarketingShell, PageHero, FeatureGrid, CTASection } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Безопасность · ЦифроРубль" },
      { name: "description", content: "Принципы безопасности платформы: шифрование, аудит, защита данных." },
      { property: "og:title", content: "Безопасность · ЦифроРубль" },
      { property: "og:description", content: "Шифрование, журнал аудита, защита данных 152-ФЗ." },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Security"
        title="Безопасность по умолчанию"
        subtitle="Принципы наименьших привилегий, шифрование и непрерывный мониторинг."
      />
      <FeatureGrid
        items={[
          { icon: <Lock className="h-5 w-5" />, title: "Шифрование", description: "TLS 1.3 в транзите и AES-256 на диске." },
          { icon: <ShieldCheck className="h-5 w-5" />, title: "Row-Level Security", description: "Доступ к данным только владельца." },
          { icon: <Server className="h-5 w-5" />, title: "Изолированная инфраструктура", description: "Российские дата-центры и резерв." },
          { icon: <FileCheck className="h-5 w-5" />, title: "152-ФЗ", description: "Соответствие требованиям ПДн." },
          { icon: <Eye className="h-5 w-5" />, title: "Журнал аудита", description: "Каждое действие фиксируется." },
          { icon: <AlertOctagon className="h-5 w-5" />, title: "Bug Bounty", description: "Программа вознаграждения за уязвимости.", status: "in-development" },
        ]}
      />
      <CTASection title="Вопросы по безопасности?" subtitle="Свяжитесь с командой безопасности." />
    </MarketingShell>
  );
}
