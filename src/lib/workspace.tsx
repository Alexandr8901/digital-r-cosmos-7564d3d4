import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { User, Briefcase, Building2, Landmark } from "lucide-react";

export type WorkspaceKind = "citizen" | "self_employed" | "ip" | "ooo";

export type Workspace = {
  kind: WorkspaceKind;
  label: string;
  short: string;
  description: string;
  basePath: string;
  icon: typeof User;
  accent: string;
};

export const WORKSPACES: Workspace[] = [
  {
    kind: "citizen",
    label: "Гражданин",
    short: "Личный",
    description: "Личные финансы, платежи, документы",
    basePath: "/citizen",
    icon: User,
    accent: "text-accent",
  },
  {
    kind: "self_employed",
    label: "Самозанятый",
    short: "Самозанятый",
    description: "Доходы, клиенты, услуги, счета",
    basePath: "/self-employed",
    icon: Briefcase,
    accent: "text-accent",
  },
  {
    kind: "ip",
    label: "ИП",
    short: "ИП",
    description: "ERP, CRM, склад, финансы",
    basePath: "/ip",
    icon: Building2,
    accent: "text-accent",
  },
  {
    kind: "ooo",
    label: "ООО",
    short: "ООО",
    description: "Холдинг, казначейство, бюджеты",
    basePath: "/ooo",
    icon: Landmark,
    accent: "text-accent",
  },
];

const KEY = "cifrorubl.active_workspace";

type Ctx = {
  active: Workspace;
  setActive: (kind: WorkspaceKind) => void;
  workspaces: Workspace[];
};

const WorkspaceCtx = createContext<Ctx | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const initial =
    WORKSPACES.find((w) => pathname.startsWith(w.basePath))?.kind ??
    (typeof window !== "undefined"
      ? ((localStorage.getItem(KEY) as WorkspaceKind | null) ?? "citizen")
      : "citizen");

  const [kind, setKind] = useState<WorkspaceKind>(initial);
  const navigate = useNavigate();

  useEffect(() => {
    const matched = WORKSPACES.find((w) => pathname.startsWith(w.basePath));
    if (matched && matched.kind !== kind) setKind(matched.kind);
  }, [pathname, kind]);

  const active = useMemo(
    () => WORKSPACES.find((w) => w.kind === kind) ?? WORKSPACES[0],
    [kind],
  );

  const setActive = (next: WorkspaceKind) => {
    setKind(next);
    if (typeof window !== "undefined") localStorage.setItem(KEY, next);
    const target = WORKSPACES.find((w) => w.kind === next);
    if (target) navigate({ to: target.basePath });
  };

  return (
    <WorkspaceCtx.Provider value={{ active, setActive, workspaces: WORKSPACES }}>
      {children}
    </WorkspaceCtx.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceCtx);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
