import { createFileRoute, Link } from "@tanstack/react-router";
import {
  QrCode, ArrowLeftRight, History, PieChart, Repeat, Calendar,
  Receipt, Home, AlertTriangle, FileText, Sparkles, Wallet,
} from "lucide-react";
import { MarketingShell, PageHero, FeatureGrid, CTASection } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/citizens")({
  head: () => ({
    meta: [
      { title: "Для граждан · ЦифроРубль" },
      { name: "description", content: "Личный кабинет гражданина: платежи, переводы, QR, ЖКХ, налоги, штрафы, документы и AI-помощник." },
      { property: "og:title", content: "Для граждан · ЦифроРубль" },
      { property: "og:description", content: "Один аккаунт для всех личных финансов." },
    ],
  }),
  component: CitizensPage,
});

function CitizensPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Для граждан"
        title="Личные финансы в одном месте"
        subtitle="Платежи, переводы, документы, налоги и AI-помощник. Всё для повседневной жизни."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/auth/register">Начать бесплатно</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/features">Все возможности</Link></Button>
        </div>
      </PageHero>
      <FeatureGrid
        items={[
          { icon: <Wallet className="h-5 w-5" />, title: "Кошелёк", description: "Общий баланс и все ваши счета." },
          { icon: <QrCode className="h-5 w-5" />, title: "Оплата QR", description: "Сканируйте и платите за секунды." },
          { icon: <ArrowLeftRight className="h-5 w-5" />, title: "Переводы", description: "По телефону, реквизитам, QR и шаблону." },
          { icon: <History className="h-5 w-5" />, title: "История", description: "Поиск, фильтры, экспорт операций." },
          { icon: <PieChart className="h-5 w-5" />, title: "Аналитика", description: "Категории, тренды и прогноз расходов." },
          { icon: <Repeat className="h-5 w-5" />, title: "Подписки", description: "Контроль и отмена в один клик." },
          { icon: <Calendar className="h-5 w-5" />, title: "Автоплатежи", description: "ЖКХ, связь и интернет вовремя." },
          { icon: <Receipt className="h-5 w-5" />, title: "Налоги", description: "Уведомления и оплата без очередей.", status: "pending-api" },
          { icon: <Home className="h-5 w-5" />, title: "ЖКХ", description: "Все счета и история платежей." },
          { icon: <AlertTriangle className="h-5 w-5" />, title: "Штрафы", description: "Уведомления о новых штрафах.", status: "pending-api" },
          { icon: <FileText className="h-5 w-5" />, title: "Документы", description: "Чеки, квитанции и выписки." },
          { icon: <Sparkles className="h-5 w-5" />, title: "AI", description: "Спросите о расходах или счетах." },
        ]}
      />
      <CTASection title="Откройте кабинет гражданина" subtitle="Регистрация занимает 60 секунд." />
    </MarketingShell>
  );
}
