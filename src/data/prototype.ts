export type PrototypeStage =
  | "intake"
  | "saved"
  | "queue"
  | "followup"
  | "handoff"
  | "audit";

export interface WorkflowStep {
  id: PrototypeStage;
  label: string;
  note: string;
}

export interface IntakeField {
  id: string;
  label: string;
  required: boolean;
  value: string;
  placeholder: string;
}

export interface ReviewerQueueItem {
  caseId: string;
  patient: string;
  priority: "High" | "Medium" | "Low";
  status: string;
  submittedAt: string;
}

export interface FollowUpItem {
  owner: string;
  task: string;
  due: string;
  status: "Open" | "In progress" | "Closed";
}

export interface HandoffPacket {
  packetId: string;
  destination: string;
  included: string[];
  exportState: string;
}

export interface AuditMetric {
  label: string;
  value: string;
  delta: string;
}

export interface PrototypeContent {
  title: string;
  subtitle: string;
  patientContext: Record<string, string>;
  requiredFields: string[];
  workflow: WorkflowStep[];
  intakeFields: IntakeField[];
  queue: ReviewerQueueItem[];
  followUp: FollowUpItem[];
  handoff: HandoffPacket;
  metrics: AuditMetric[];
}

export const prototypeContent: PrototypeContent = {
  title: "Safety Intake Desk",
  subtitle:
    "Frontline adverse-event capture with structured triage and audit-ready handoff.",
  patientContext: {
    program: "Oncology Support Program (Pilot)",
    patientRef: "PAT-REDACTED-1042",
    reporter: "Field Nurse (ID: RN-77)",
    interaction: "Inbound call, 09:42 ET",
  },
  requiredFields: [
    "Suspect product",
    "Reaction summary (verbatim)",
    "Event onset date",
    "Reporter role",
  ],
  workflow: [
    {
      id: "intake",
      label: "1. Intake Start",
      note: "Launch from patient context and capture minimum safety data.",
    },
    {
      id: "saved",
      label: "2. Save Incomplete",
      note: "Persist draft when required details are still missing.",
    },
    {
      id: "queue",
      label: "3. Reviewer Queue",
      note: "Route by seriousness and confidence into PV review.",
    },
    {
      id: "followup",
      label: "4. Follow-up",
      note: "Assign tasks for missing clinical facts and contact attempts.",
    },
    {
      id: "handoff",
      label: "5. Handoff Ready",
      note: "Generate export packet and handoff metadata.",
    },
    {
      id: "audit",
      label: "6. Audit/KPI Snapshot",
      note: "Track cycle time, completion quality, and queue age.",
    },
  ],
  intakeFields: [
    {
      id: "suspectProduct",
      label: "Suspect product",
      required: true,
      value: "BIO-IMM-21",
      placeholder: "Enter product name or code",
    },
    {
      id: "reactionSummary",
      label: "Reaction summary (verbatim)",
      required: true,
      value: "Patient reported chest tightness and dizziness after dose.",
      placeholder: "Capture patient words without interpretation",
    },
    {
      id: "eventOnset",
      label: "Event onset date",
      required: true,
      value: "",
      placeholder: "YYYY-MM-DD",
    },
    {
      id: "reporterRole",
      label: "Reporter role",
      required: true,
      value: "Nurse",
      placeholder: "Reporter role",
    },
    {
      id: "concomitantMeds",
      label: "Concomitant medications",
      required: false,
      value: "",
      placeholder: "Optional in intake, required in follow-up if known",
    },
    {
      id: "notes",
      label: "Coordinator notes",
      required: false,
      value: "",
      placeholder: "Operational notes for reviewer",
    },
  ],
  queue: [
    {
      caseId: "AE-2026-0431",
      patient: "PAT-REDACTED-1042",
      priority: "High",
      status: "Needs medical review",
      submittedAt: "10:06 ET",
    },
    {
      caseId: "AE-2026-0432",
      patient: "PAT-REDACTED-1098",
      priority: "Medium",
      status: "Follow-up requested",
      submittedAt: "10:21 ET",
    },
    {
      caseId: "AE-2026-0433",
      patient: "PAT-REDACTED-0994",
      priority: "Low",
      status: "Ready for handoff",
      submittedAt: "10:40 ET",
    },
  ],
  followUp: [
    {
      owner: "Coordinator",
      task: "Confirm concomitant medication list",
      due: "Today 14:00 ET",
      status: "Open",
    },
    {
      owner: "Nurse",
      task: "Second patient outreach attempt",
      due: "Today 16:00 ET",
      status: "In progress",
    },
    {
      owner: "Reviewer",
      task: "Seriousness classification check",
      due: "Today 17:30 ET",
      status: "Closed",
    },
  ],
  handoff: {
    packetId: "PKT-AE-2026-0431",
    destination: "Safety Operations Inbox",
    included: [
      "Structured case payload",
      "Verbatim reporter notes",
      "Timeline + follow-up log",
      "Seriousness triage record",
    ],
    exportState: "Queued for secure transfer",
  },
  metrics: [
    {
      label: "Draft completion rate",
      value: "93%",
      delta: "+8% vs pilot week 1",
    },
    {
      label: "Median intake-to-review",
      value: "27 min",
      delta: "-11 min week-over-week",
    },
    {
      label: "Follow-up closure <24h",
      value: "82%",
      delta: "+6% this week",
    },
    {
      label: "Queue >2h (high priority)",
      value: "0 cases",
      delta: "stable",
    },
  ],
};
