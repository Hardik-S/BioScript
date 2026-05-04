import type { AppendixSection, RiskItem } from "@/types/content";
import { caseStudyContent } from "@/content/caseStudy";

export const demoBoundaryText =
  "Static front-end demo using synthetic/redacted examples. It does not submit reports, decide validity, assess seriousness, determine reportability, send messages, or handle real patient data. Qualified PV/Quality owners remain responsible for all safety decisions.";

export const shortVersionSections = [
  {
    id: "intake",
    navLabel: "Intake",
    title: "Safety Intake Desk",
    summary:
      "A narrow first-mile intake MVP: capture the initial safety signal cleanly, preserve incomplete drafts, surface missing minimum criteria, and hand qualified reviewers a clearer evidence packet.",
    points: [
      "Best proof: messy source notes become structured fields without hiding uncertainty.",
      "Primary owner: frontline capture and coordinator follow-up, with PV owner confirmation before handoff.",
      "Why it matters: less reconstruction work and fewer cases forced into false completion.",
    ],
    href: (baseUrl: string) => `${baseUrl}#prototype`,
    ctaLabel: "Open Intake",
  },
  {
    id: "reconciliation",
    navLabel: "Reconciliation",
    title: "Safety Case Reconciliation Control",
    summary:
      "A control surface for finding safety records that risk disappearing between source capture, transfer evidence, and downstream acknowledgement.",
    points: [
      "Best proof: source, transfer, and acknowledgement ledgers stay inspectable side by side.",
      "Primary owner: PV operations or PV owner closes exceptions with evidence and disposition.",
      "Why it matters: handoff reliability becomes visible instead of assumed.",
    ],
    href: (baseUrl: string) => `${baseUrl}Next/`,
    ctaLabel: "Open Reconciliation",
  },
  {
    id: "operations",
    navLabel: "Operations",
    title: "Care Operations Control Room",
    summary:
      "A manager-facing prioritization demo for one patient-support operating day, focused on workload, blockers, capacity, and same-day tradeoffs.",
    points: [
      "Best proof: synthetic work queues recompute into clear priority recommendations.",
      "Primary owner: operations manager uses the view to decide what work should happen first.",
      "Why it matters: it shows broader BioScript usefulness beyond safety intake alone.",
    ],
    href: (baseUrl: string) => `${baseUrl}Ops/`,
    ctaLabel: "Open Operations",
  },
];

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
    title: "Safety Case Reconciliation Control",
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
      "A 12 to 16 week pilot is an assumption, contingent on scope, QA/privacy review, SOP fit, and stakeholder availability.",
    points: caseStudyContent.kpis.map((metric) => `${metric.label}: ${metric.value}. ${metric.note}`),
  },
];

export const managerQuestions = [
  {
    question: "Who owns day-0 clock assessment?",
    answer:
      "The static demo does not confirm day 0. A qualified PV owner confirms minimum criteria and decides clock handling under the applicable SOP.",
  },
  {
    question: "Which fields are minimum criteria versus enrichment?",
    answer:
      "Minimum criteria are identifiable patient, identifiable reporter/source, suspect product, and adverse event/reaction. Onset, concomitant meds, seriousness cues, and notes are follow-up enrichment until reviewed.",
  },
  {
    question: "Who can mark a field trusted for handoff?",
    answer:
      "Frontline users capture source text, coordinators flag missing facts, and qualified PV/Quality owners confirm validity, seriousness, duplicate status, reportability, and submission decisions.",
  },
  {
    question: "What source text is preserved?",
    answer:
      "The handoff packet preserves verbatim source snippets, timestamps, field-level uncertainty, reviewer-status metadata, and follow-up history.",
  },
  {
    question: "How are safety decisions kept out of automation?",
    answer:
      "The demo can flag urgency cues and prepare evidence. It does not assess seriousness, expectedness, causality, duplicate status, reportability, or submission decisions.",
  },
  {
    question: "What happens when acknowledgement is missing or late?",
    answer:
      "The reconciliation control creates an owned exception with evidence, due window, required disposition, and closure note for PV operations or PV-owner review.",
  },
  {
    question: "What is the pilot stop, iterate, or expand rule?",
    answer:
      "Stop if reviewer burden rises or minimum-criteria quality does not improve; iterate if labels/SOP fit need tuning; expand only after baseline-to-target evidence and QA/privacy approval.",
  },
  {
    question: "What does this static demo not prove?",
    answer:
      "It does not prove production validation, integration reliability, privacy controls, SOP approval, training completion, real transfer, or downstream regulatory outcomes.",
  },
];

export const limitationSections = [
  {
    title: "Demo Boundary",
    points: [demoBoundaryText],
  },
  {
    title: "What This Demo Does Not Do",
    points: [
      "No real PHI or patient data.",
      "No submissions, transfers, messages, or production-system updates.",
      "No safety, clinical, reimbursement, causality, duplicate, or reportability decisions.",
    ],
  },
  {
    title: "Decision Ownership",
    points: [
      "Frontline user: captures source narrative and operational context.",
      "Coordinator: flags missing facts and prepares follow-up tasks.",
      "PV owner: confirms validity, seriousness, duplicate status, reportability, and any submission decision.",
      "QA/manager: reviews SOP fit, audit/process exceptions, training, and pilot governance.",
    ],
  },
  {
    title: "Minimum Criteria And Clock Handling",
    points: [
      "The four minimum criteria are identifiable patient, identifiable reporter/source, suspect product, and adverse event/reaction.",
      "Day 0 is not treated as confirmed by this demo; PV owner validates minimum criteria and clock handling.",
    ],
  },
  {
    title: "Pilot Evidence Plan",
    points: [
      "Baseline: measure current completeness, reviewer rework, cycle time, and acknowledgement exceptions before pilot.",
      "Target: compare against minimum-field completeness, queue responsiveness, duplicate handoff rate, and trained-user adoption thresholds.",
      "Failure threshold: stop or redesign if reviewer burden rises, uncertainty is hidden, or SOP/QA fit is not defensible.",
    ],
  },
  {
    title: "Static Demo Limitations",
    points: [
      "All data is synthetic/redacted and all actions are simulated.",
      "Production would require validation, privacy/security review, role-based access, SOP alignment, training, and change control.",
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
