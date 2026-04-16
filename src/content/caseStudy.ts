import type { Highlight, Metric, NavLink, TimelineStep } from "../types/content";

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
  nav: NavLink[];
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
    "A thin internal workflow that captures potential adverse events at first contact and routes audit-ready handoff packages to qualified reviewers.",
  audience: "BioScript hiring manager and program leadership",
  valueStatement:
    "This MVP is intentionally narrow: improve first-mile intake quality, reviewer speed, and handoff reliability without pretending to replace a full pharmacovigilance platform.",
  nav: [
    { href: "#problem", label: "Problem" },
    { href: "#solution", label: "Solution" },
    { href: "#prototype", label: "Prototype" },
    { href: "#delivery", label: "Delivery" },
    { href: "#credibility", label: "Credibility" },
  ],
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
        "Use SSO, program-scoped access, field masking, and export-based handoff to fit sensitive-data workflows without forcing a core system rewrite.",
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
      value: ">=95%",
      note: "Share of intake cases containing required reporter, patient, product, and reaction fields at handoff.",
    },
    {
      label: "Reviewer assignment speed",
      value: "<=1 hour serious, <=1 business day non-serious",
      note: "Measures queue responsiveness and urgency routing performance.",
    },
    {
      label: "Duplicate handoff rate",
      value: "<5%",
      note: "Tracks data hygiene before downstream transfer.",
    },
    {
      label: "Eligible-user adoption",
      value: ">=80%",
      note: "Confirms the workflow is being used when events are eligible for intake.",
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
    "KISS: one program, one primary intake channel, one workflow slice.",
    "YAGNI: no full PV platform features in v1.",
    "DRY: one intake model reused across queue, tasks, export, and reporting.",
    "SOLID: separate intake capture, review decisions, tasking, and metrics into clear workflow responsibilities.",
  ],
  emailBlurb:
    "Safety Intake Desk is a product-scoped MVP for BioScript that improves first-mile adverse-event intake and reviewer handoff quality in 12-16 weeks, without a core-system rewrite.",
};

