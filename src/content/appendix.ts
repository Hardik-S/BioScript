import type { AppendixSection, RiskItem } from "@/types/content";

export const appendixSections: AppendixSection[] = [
  {
    title: "Why this is the right v1 wedge",
    intro:
      "The strongest product move here is to solve first-mile intake and handoff quality, not to overreach into a full pharmacovigilance platform.",
    points: [
      "BioScript already operates in high-contact patient support workflows where adverse events surface early and informally.",
      "The first operational failure mode is weak intake quality, not the absence of a monolithic end-state platform.",
      "A narrow capture-and-handoff product is materially faster to pilot, easier to adopt, and easier to defend.",
    ],
  },
  {
    title: "Static MVP boundaries",
    intro:
      "This GitHub Pages MVP is intentionally a case-study site with a front-end-only prototype, not a production workflow system.",
    points: [
      "No authentication, storage backend, or real email transfer is implemented.",
      "Prototype states use sample data and local browser persistence only.",
      "The site demonstrates product scope, interaction design, and pilot logic without faking unsupported infrastructure.",
    ],
  },
  {
    title: "Pilot operating model",
    intro:
      "The implementation path stays deliberately lean so a hiring manager can judge sequencing and execution quality quickly.",
    points: [
      "Start with one phone-based patient support program and one primary intake path.",
      "Measure completeness, reviewer speed, duplicate rate, and adoption before expanding channels or functionality.",
      "Keep downstream safety ownership intact and use export-based handoff rather than replacing existing systems.",
    ],
  },
];

export const riskRegister: RiskItem[] = [
  {
    title: "Scope inflation",
    mitigation: "Keep submission tooling, literature review, and broader PV workflows explicitly out of v1.",
  },
  {
    title: "User friction",
    mitigation: "Limit intake to minimum required facts and support save-incomplete instead of forcing full completion at first touch.",
  },
  {
    title: "Integration drag",
    mitigation: "Treat the real product as a sidecar module and the static MVP as a communication artifact, not a fake production build.",
  },
];
