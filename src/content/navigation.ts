import type { NavLink } from "@/types/content";

export type PrimaryNavId = "next" | "ops" | "demo" | "appendix";

const primaryNavItems: Array<{
  id: PrimaryNavId;
  label: string;
  href: (baseUrl: string) => string;
}> = [
  { id: "next", label: "Next", href: (baseUrl) => `${baseUrl}Next/` },
  { id: "ops", label: "Ops", href: (baseUrl) => `${baseUrl}Ops/` },
  { id: "demo", label: "Demo", href: (baseUrl) => `${baseUrl}#prototype` },
  { id: "appendix", label: "Appendix", href: (baseUrl) => `${baseUrl}appendix/` },
];

export function getPrimaryNav(active: PrimaryNavId, baseUrl: string): NavLink[] {
  return primaryNavItems.map((item) => ({
    href: item.href(baseUrl),
    label: item.label,
    variant: item.id === active ? "accent" : undefined,
  }));
}
