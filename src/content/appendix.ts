import type { AppendixSection, RiskItem } from "@/types/content";
import { caseStudyContent } from "@/content/caseStudy";

export const demoAppendixSections = [
  {
    id: "intake",
    navLabel: "Intake",
    title: "Safety Intake Desk",
    routeLabel: "Main demo",
    href: (baseUrl: string) => `${baseUrl}#prototype`,
    purpose:
      "Shows the first-mile adverse-event intake workflow: messy source text, model-assisted draft fields, reviewer confirmation, save-incomplete state, follow-up, and handoff readiness.",
    bestFor:
      "Explaining why the product starts at capture quality instead of trying to replace the downstream pharmacovigilance stack.",
    proofPoints: [
      "Separates model-populated fields from fields trusted for handoff.",
      "Preserves incomplete cases instead of forcing false completion.",
      "Makes reviewer queueing, follow-up, export, and audit context visible in one static prototype.",
    ],
  },
  {
    id: "reconciliation",
    navLabel: "Reconciliation",
    title: "Ghost-Case Reconciliation Drill",
    routeLabel: "Control demo",
    href: (baseUrl: string) => `${baseUrl}Next/`,
    purpose:
      "Pressure-tests whether safety records can disappear between source capture, transfer evidence, and downstream acknowledgement.",
    bestFor:
      "Showing operating control thinking: not just intake UI, but evidence, exceptions, and escalation when the handoff path breaks.",
    proofPoints: [
      "Compares source logs, transfer ledgers, and acknowledgement records side by side.",
      "Lets the reviewer inspect flagged records rather than trusting a summary metric.",
      "Keeps the output framed as human control support, not automated regulatory decisioning.",
    ],
  },
  {
    id: "operations",
    navLabel: "Operations",
    title: "Care Operations Control Room",
    routeLabel: "Manager demo",
    href: (baseUrl: string) => `${baseUrl}Ops/`,
    purpose:
      "Simulates one patient-support operating day so a manager can see how staffing, triage rules, and blockers affect same-day work.",
    bestFor:
      "Showing broader usefulness to BioScript beyond adverse-event intake: prioritization, capacity tradeoffs, therapy-start risk, callback exposure, and reimbursement blockers.",
    proofPoints: [
      "Turns a queue of synthetic patient-support work into a priority recommendation.",
      "Makes tradeoffs visible across case management, nursing, pharmacy, reimbursement, and scheduling lanes.",
      "Keeps the simulator front-end-only and explicitly synthetic.",
    ],
  },
];

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
