import { createFileRoute } from "@tanstack/react-router";
import {
  Shield, Zap, Users, Code2, Plug, Sparkles, Smartphone, BadgeCheck,
  Wallet, FileText, BarChart3, MessageSquare,
} from "lucide-react";
import { MarketingShell, PageHero, FeatureGrid, CTASection } from "@/components/marketing/page-shell";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Возможности · ЦифроРубль" },
      { name: "description", content: "Полный обзор возможностей единой финансовой экосистемы ЦифроРубль: платежи, переводы, документы, аналитика, AI и API." },
      { property: "og:title", content: "Возможности · ЦифроРубль" },
      { property: "og:description", content: "Платежи, переводы, документы, аналитика, AI и API в одном аккаунте." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Возможности"
        title="Всё, что нужно для работы с финансами"
        subtitle="Полный набор инструментов для граждан, бизнеса и разработчиков. Один аккаунт — вся экосистема."
      />
      <FeatureGrid
        items={[
          { icon: <Shield className="h-5 w-5" />, title: "Безопасность", description: "Шифрование, журнал аудита, защита 152-ФЗ.", status: "available" },
          { icon: <Zap className="h-5 w-5" />, title: "Скорость", description: "Мгновенные операции и отклик интерфейса.", status: "available" },
          { icon: <Users className="h-5 w-5" />, title: "Единый аккаунт", description: "Гражданин, самозанятый, ИП, ООО, разработчик.", status: "available" },
          { icon: <Code2 className="h-5 w-5" />, title: "REST и GraphQL API", description: "Полноценный программный интерфейс.", status: "available" },
          { icon: <Plug className="h-5 w-5" />, title: "Интеграции", description: "Подключение через официальные API.", status: "in-development" },
          { icon: <Sparkles className="h-5 w-5" />, title: "AI-помощник", description: "Финансы, документы, налоги — голосом или текстом.", status: "available" },
          { icon: <Smartphone className="h-5 w-5" />, title: "Адаптивный интерфейс", description: "Идеален на десктопе и мобильных.", status: "available" },
          { icon: <BadgeCheck className="h-5 w-5" />, title: "Официальные подключения", description: "Только подтверждённые государственные API.", status: "pending-api" },
          { icon: <Wallet className="h-5 w-5" />, title: "Кошелёк и платежи", description: "QR, переводы, ЖКХ, налоги, штрафы.", status: "available" },
          { icon: <FileText className="h-5 w-5" />, title: "Документы", description: "Выписки, квитанции, чеки и договоры.", status: "available" },
          { icon: <BarChart3 className="h-5 w-5" />, title: "Аналитика", description: "Доходы, расходы, прогноз и категории.", status: "available" },
          { icon: <MessageSquare className="h-5 w-5" />, title: "Поддержка 24/7", description: "Чат, база знаний и официальные каналы.", status: "available" },
        ]}
      />
      <CTASection />
    </MarketingShell>
  );
}
