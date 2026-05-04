import type { Highlight, Metric, TimelineStep } from "../types/content";

interface PrototypeState {
  id: "intake" | "queue" | "follow-up" | "handoff" | "audit";
  title: string;
  summary: string;
  keySignals: string[];
}

interface CaseStudyContent {
  productName: string;
  tagline: string;
  audience: string;
  valueStatement: string;
  heroPoints: string[];
  problemSummary: string;
  solutionSummary: string;
  highlights: Highlight[];
  timeline: TimelineStep[];
  kpis: Metric[];
  prototypeStates: PrototypeState[];
  deliveryPrinciples: string[];
  emailBlurb: string;
}

export const caseStudyContent: CaseStudyContent = {
  productName: "Safety Intake Desk",
  tagline:
    "A thin internal workflow that captures potential adverse events at first contact and prepares source-backed handoff packets for qualified reviewers.",
  audience: "BioScript hiring manager and program leadership",
  valueStatement:
    "This MVP is intentionally narrow: improve first-mile intake quality, reviewer speed, and handoff reliability without pretending to replace a full pharmacovigilance platform.",
  heroPoints: [
    "Built for routine patient-support interactions where potential adverse events first surface.",
    "Preserves human-in-the-loop review and clear role separation for medical judgment.",
    "Uses sidecar architecture and existing systems to reduce integration risk and speed pilot launch.",
  ],
  problemSummary:
    "Frontline teams often capture potential adverse events in free-text operational notes. That creates missing minimum case facts, inconsistent seriousness routing, and avoidable reviewer rework. The result is slower handoff and weaker auditability in a workflow that should be fast, structured, and defensible.",
  solutionSummary:
    "Safety Intake Desk introduces a single guided intake flow, reviewer queue, follow-up tasks, duplicate checks, and handoff export. It focuses on one pilot program and one primary intake channel so adoption, data quality, and cycle-time impact can be measured quickly.",
  highlights: [
    {
      title: "Right scope for v1",
      detail:
        "Solve first-mile capture and triage only. Keep regulatory submission, literature monitoring, and broader PV platform functions out of scope.",
    },
    {
      title: "Operations-first design",
      detail:
        "Start from existing patient/program context, require core intake fields, allow save-incomplete, and drive structured follow-up instead of abandoning partial cases.",
    },
    {
      title: "Reviewer-centered workflow",
      detail:
        "Queue states and decision points make reviewer work visible, measurable, and auditable while preserving qualified human judgment.",
    },
    {
      title: "Compliance-aware architecture",
      detail:
        "Future production controls would need SSO, role-based access, field masking, validation, SOP alignment, and QA approval before any real pilot.",
    },
  ],
  timeline: [
    {
      title: "Weeks 1-2: Discovery",
      detail:
        "Confirm pilot program, map current intake path, baseline completeness and turnaround metrics, and lock acceptance criteria.",
    },
    {
      title: "Weeks 3-5: Design",
      detail:
        "Define intake schema, queue states, follow-up rules, and handoff packet format with operations and reviewer stakeholders.",
    },
    {
      title: "Weeks 6-10: Build",
      detail:
        "Implement intake, queue, tasks, duplicate suggestions, audit trail, and dashboard instrumentation in a sidecar workflow module.",
    },
    {
      title: "Weeks 11-12: UAT + Training",
      detail:
        "Replay historical examples, validate edge cases, run role-based training, and complete privacy/access checks before go-live.",
    },
    {
      title: "Weeks 13-16: Pilot",
      detail:
        "Run production pilot, review weekly KPIs, tune field labels and rules, and decide expand, iterate, or stop.",
    },
  ],
  kpis: [
    {
      label: "Minimum-field completeness",
      value: "Pilot target: >=95%",
      note: "Baseline to be measured before pilot; tracks required reporter, patient, product, and reaction evidence at handoff.",
    },
    {
      label: "Reviewer assignment speed",
      value: "Example threshold: <=1 hour urgent cues, <=1 business day routine queue",
      note: "PV owner confirms seriousness and reportability; the demo only measures routing responsiveness.",
    },
    {
      label: "Duplicate handoff rate",
      value: "Pilot target: <5%",
      note: "Baseline to be measured before pilot; duplicate status remains a PV-owner decision.",
    },
    {
      label: "Eligible-user adoption",
      value: "Pilot target: >=80%",
      note: "Example threshold for whether trained users choose the intake flow when capture is in scope.",
    },
  ],
  prototypeStates: [
    {
      id: "intake",
      title: "Guided intake from patient context",
      summary:
        "Frontline user opens a Potential AE action, captures verbatim narrative plus minimum structured fields, and can save incomplete with explicit gaps.",
      keySignals: [
        "Required-field validation",
        "Seriousness prompts",
        "Save-incomplete status",
      ],
    },
    {
      id: "queue",
      title: "Reviewer queue and status model",
      summary:
        "Qualified reviewers triage by urgency and state, moving cases through clear statuses with role-controlled decision fields.",
      keySignals: [
        "New and awaiting review lanes",
        "Priority sorting",
        "Reviewer-only decision controls",
      ],
    },
    {
      id: "follow-up",
      title: "Follow-up task management",
      summary:
        "Missing information is converted into owned tasks with due dates and closure notes so partial intakes are recoverable, not lost.",
      keySignals: [
        "Task ownership",
        "Due-date tracking",
        "Closure rationale",
      ],
    },
    {
      id: "handoff",
      title: "Handoff-ready export",
      summary:
        "When review is complete, the case is exported as a structured packet for the downstream safety owner with traceable decision history.",
      keySignals: [
        "Structured payload",
        "Duplicate-candidate warning",
        "Downstream reference capture",
      ],
    },
    {
      id: "audit",
      title: "Audit and KPI snapshot",
      summary:
        "Program managers see queue health, SLA performance, missing-data patterns, and adoption trends to guide coaching and process improvements.",
      keySignals: [
        "Status distribution",
        "SLA clock visibility",
        "Completeness and rework trend lines",
      ],
    },
  ],
  deliveryPrinciples: [
    "Narrow pilot scope: one program, one primary intake channel, one workflow slice.",
    "Procedure fit: no production use without SOP mapping, training, privacy review, and QA approval.",
    "Reviewer burden reduction: capture missing facts earlier without moving safety decisions out of qualified review.",
    "Handoff evidence: preserve source snippets, timestamps, uncertainty flags, and reviewer-status metadata.",
    "Audit-ready status history: show ownership, due windows, and closure notes for review and process exceptions.",
  ],
  emailBlurb:
    "Safety Intake Desk is a product-scoped MVP for BioScript that improves first-mile adverse-event intake and reviewer handoff quality in 12-16 weeks, without a core-system rewrite.",
};
