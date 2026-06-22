import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, FileText, CreditCard, Package, BarChart3, UserCog,
  Code2, ShoppingBag, Sparkles, Briefcase, Calculator, Receipt,
} from "lucide-react";
import { MarketingShell, PageHero, FeatureGrid, CTASection } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Для бизнеса · ЦифроРубль" },
      { name: "description", content: "Кабинет бизнеса: CRM, документооборот, платежи, склад, отчёты, команда, API и AI." },
      { property: "og:title", content: "Для бизнеса · ЦифроРубль" },
      { property: "og:description", content: "CRM, документы, склад и отчёты в одном продукте." },
    ],
  }),
  component: BusinessPage,
});

function BusinessPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrow="Для бизнеса"
        title="Бизнес-операции на одной платформе"
        subtitle="От самозанятого до ООО: продажи, документы, склад и финансовая отчётность."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/auth/register">Начать бесплатно</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/pricing">Тарифы</Link></Button>
        </div>
      </PageHero>
      <FeatureGrid
        items={[
          { icon: <Briefcase className="h-5 w-5" />, title: "Самозанятые", description: "Чеки, клиенты и налог на профдоход.", status: "in-development" },
          { icon: <Calculator className="h-5 w-5" />, title: "ИП", description: "Учёт, отчётность, документы.", status: "in-development" },
          { icon: <Users className="h-5 w-5" />, title: "CRM", description: "Сделки, контакты, воронки." },
          { icon: <FileText className="h-5 w-5" />, title: "Документы", description: "Договоры, акты, счета и УПД." },
          { icon: <CreditCard className="h-5 w-5" />, title: "Платежи", description: "Приём оплат и массовые выплаты." },
          { icon: <Package className="h-5 w-5" />, title: "Склад", description: "Остатки, поступления и инвентаризация." },
          { icon: <BarChart3 className="h-5 w-5" />, title: "Отчёты", description: "Финансы, продажи и BI-аналитика." },
          { icon: <UserCog className="h-5 w-5" />, title: "Команда", description: "Сотрудники, роли и доступы." },
          { icon: <Code2 className="h-5 w-5" />, title: "API", description: "Программный доступ ко всем данным." },
          { icon: <ShoppingBag className="h-5 w-5" />, title: "Marketplace", description: "Готовые интеграции и шаблоны." },
          { icon: <Receipt className="h-5 w-5" />, title: "Налоги", description: "Расчёт и напоминания.", status: "pending-api" },
          { icon: <Sparkles className="h-5 w-5" />, title: "AI", description: "Подготовка отчётов и поиск по данным." },
        ]}
      />
      <CTASection />
    </MarketingShell>
  );
}
