import type { AppendixSection, RiskItem } from "@/types/content";
import { caseStudyContent } from "@/content/caseStudy";

export const appendixSections: AppendixSection[] = [
  {
    title: "Problem framing",
    intro:
      caseStudyContent.problemSummary,
    points: [
      "Potential adverse events often surface inside routine patient-support interactions rather than inside purpose-built safety software.",
      "When the first signal lands in free-text notes, reviewers inherit missing minimum case facts, inconsistent urgency cues, and avoidable reconstruction work.",
      "The first operational problem to solve is intake quality and handoff reliability, not a full downstream PV platform replacement.",
    ],
  },
  {
    title: "Solution boundary",
    intro:
      caseStudyContent.solutionSummary,
    points: caseStudyContent.deliveryPrinciples,
  },
  {
    title: "Workflow logic",
    intro:
      "The operating sequence stays intentionally narrow: capture, triage, follow-up, handoff, and audit visibility.",
    points: caseStudyContent.timeline.map((step) => `${step.title}: ${step.detail}`),
  },
  {
    title: "Why this wedge",
    intro:
      "The MVP earns the right to expand only if it improves first-mile capture without pretending to replace the full safety stack.",
    points: caseStudyContent.highlights.map((item) => `${item.title}: ${item.detail}`),
  },
  {
    title: "Pilot delivery assumptions",
    intro:
      "A 12 to 16 week pilot remains realistic only if the architecture stays honest, the scope stays narrow, and success is measured tightly.",
    points: caseStudyContent.kpis.map((metric) => `${metric.label}: ${metric.value}. ${metric.note}`),
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
