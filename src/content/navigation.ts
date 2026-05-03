import type { NavLink } from "@/types/content";

export type PrimaryNavId = "next" | "ops" | "demo" | "appendix";

const primaryNavItems: Array<{
  id: PrimaryNavId;
  label: string;
  href: (baseUrl: string) => string;
}> = [
  { id: "demo", label: "Intake", href: (baseUrl) => `${baseUrl}#prototype` },
  { id: "next", label: "Reconciliation", href: (baseUrl) => `${baseUrl}Next/` },
  { id: "ops", label: "Operations", href: (baseUrl) => `${baseUrl}Ops/` },
  { id: "appendix", label: "Appendix", href: (baseUrl) => `${baseUrl}appendix/` },
];

export function getPrimaryNav(active: PrimaryNavId, baseUrl: string): NavLink[] {
  return primaryNavItems.map((item) => ({
    href: item.href(baseUrl),
    label: item.label,
    variant: item.id === active ? "accent" : undefined,
  }));
}
