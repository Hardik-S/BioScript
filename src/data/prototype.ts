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

export type FieldConfidence = "high" | "medium" | "low";

export interface RawExample {
  id: string;
  source: string;
  text: string;
}

export interface ExtractionRun {
  id: string;
  rawText: string;
  extractedValues: Partial<Record<string, string>>;
  fieldConfidence: Partial<Record<string, FieldConfidence>>;
  reviewFlags?: Partial<Record<string, string>>;
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

export interface MinimumCaseCriterion {
  criterion: string;
  sourceEvidence: string;
  confidence: FieldConfidence;
  reviewerStatus: string;
}

export interface PrototypeContent {
  title: string;
  subtitle: string;
  patientContext: Record<string, string>;
  requiredFields: string[];
  rawExamples: RawExample[];
  extractionRuns: ExtractionRun[];
  workflow: WorkflowStep[];
  intakeFields: IntakeField[];
  minimumCaseCriteria: MinimumCaseCriterion[];
  queue: ReviewerQueueItem[];
  followUp: FollowUpItem[];
  handoff: HandoffPacket;
  metrics: AuditMetric[];
}

export const prototypeContent: PrototypeContent = {
  title: "Safety Intake Desk",
  subtitle:
    "Structured intake drafting aid: preserve source text, flag missing facts, and prepare a PV-owner review packet.",
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
      label: "Intake",
      note: "Drop in source material, then review the model-built draft.",
    },
    {
      id: "saved",
      label: "Saved Case",
      note: "Persist draft when required details are still missing.",
    },
    {
      id: "queue",
      label: "Reviewer Queue",
      note: "Flag urgency cues and route to PV queue; PV confirms seriousness and reportability.",
    },
    {
      id: "followup",
      label: "Follow-up",
      note: "Assign tasks for missing clinical facts and contact attempts.",
    },
    {
      id: "handoff",
      label: "Handoff Ready",
      note: "Preview handoff packet contents and reviewer-status metadata.",
    },
    {
      id: "audit",
      label: "Audit Snapshot",
      note: "Track cycle time, completion quality, and queue age.",
    },
  ],
  rawExamples: [
    {
      id: "call-note-john-doe",
      source: "Call transcript excerpt",
      text:
        "9:42am inbound call from oncology support nurse (Melissa, RN-77). " +
        "Patient John Doe says he felt chest tightness and dizziness about 30 mins after BIO-IMM-21 injection last Wednesday evening. " +
        "Symptoms improved after rest, no ER visit reported. " +
        "Unsure if he also took his blood pressure tablet beforehand. " +
        "Nurse asks if this should be logged as possible AE and requests reviewer follow-up.",
    },
    {
      id: "email-escalation",
      source: "Escalation email",
      text:
        "Subject: possible reaction after infusion - need PV view\n\n" +
        "From: care.coordinator@redacted.example\n" +
        "Spoke with pt (John D.) this morning. Reports dizziness, nausea, and chest pressure after treatment. " +
        "Mentions 'the bio immune one, 21 maybe?' so product name may be imprecise. " +
        "Onset sounds like \"yesterday late afternoon\" relative to call today. " +
        "Please triage and advise if we need second outreach for concomitant meds.",
    },
    {
      id: "excel-row-paste",
      source: "Pasted Excel row",
      text:
        "AE Intake Dump | row 38 | 2026-04-15 10:18 ET\tPAT-REDACTED-1042 / John D\tproduct: BIO IMM 21 ?\t" +
        "reaction: chest tight + dizzy + nausea after injection\tonset: last wed pm maybe 6ish\t" +
        "reporter=RN-77 field nurse\tconmeds: BP med ? unknown\tnotes: no ER, wants callback",
    },
  ],
  extractionRuns: [
    {
      id: "run-john-doe-call",
      rawText:
        "9:42am inbound call from oncology support nurse (Melissa, RN-77). " +
        "Patient John Doe says he felt chest tightness and dizziness about 30 mins after BIO-IMM-21 injection last Wednesday evening. " +
        "Symptoms improved after rest, no ER visit reported. " +
        "Unsure if he also took his blood pressure tablet beforehand. " +
        "Nurse asks if this should be logged as possible AE and requests reviewer follow-up.",
      extractedValues: {
        suspectProduct: "BIO-IMM-21",
        reactionSummary:
          "Patient reported chest tightness and dizziness about 30 minutes after injection; improved with rest.",
        eventOnset: "2026-04-09",
        reporterRole: "Field Nurse (RN-77)",
        concomitantMeds: "Possible blood pressure tablet (not confirmed)",
        notes:
          "Model draft from inbound call transcript. Recommend reviewer confirm exact onset date and concomitant meds.",
      },
      fieldConfidence: {
        suspectProduct: "high",
        reactionSummary: "high",
        eventOnset: "low",
        reporterRole: "medium",
        concomitantMeds: "low",
        notes: "high",
      },
      reviewFlags: {
        eventOnset: "Date inferred from relative phrasing: \"last Wednesday evening.\"",
        concomitantMeds: "Medication mention was uncertain in source note.",
      },
    },
    {
      id: "run-email-escalation",
      rawText:
        "Subject: possible reaction after infusion - need PV view\n\n" +
        "From: care.coordinator@redacted.example\n" +
        "Spoke with pt (John D.) this morning. Reports dizziness, nausea, and chest pressure after treatment. " +
        "Mentions 'the bio immune one, 21 maybe?' so product name may be imprecise. " +
        "Onset sounds like \"yesterday late afternoon\" relative to call today. " +
        "Please triage and advise if we need second outreach for concomitant meds.",
      extractedValues: {
        suspectProduct: "BIO-IMM-21 (?)",
        reactionSummary:
          "Patient reported dizziness, nausea, and chest pressure after treatment; severity not yet medically reviewed.",
        eventOnset: "2026-04-14",
        reporterRole: "Care Coordinator (email escalation)",
        concomitantMeds: "",
        notes:
          "Model draft from escalation email. Product identity and onset timing need reviewer confirmation.",
      },
      fieldConfidence: {
        suspectProduct: "low",
        reactionSummary: "high",
        eventOnset: "low",
        reporterRole: "high",
        concomitantMeds: "medium",
        notes: "high",
      },
      reviewFlags: {
        suspectProduct: "Product label in source was ambiguous (\"bio immune one, 21 maybe\").",
        eventOnset: "Date inferred from relative phrase \"yesterday late afternoon.\"",
      },
    },
    {
      id: "run-excel-row-paste",
      rawText:
        "AE Intake Dump | row 38 | 2026-04-15 10:18 ET\tPAT-REDACTED-1042 / John D\tproduct: BIO IMM 21 ?\t" +
        "reaction: chest tight + dizzy + nausea after injection\tonset: last wed pm maybe 6ish\t" +
        "reporter=RN-77 field nurse\tconmeds: BP med ? unknown\tnotes: no ER, wants callback",
      extractedValues: {
        suspectProduct: "BIO-IMM-21 (?)",
        reactionSummary:
          "Patient reported chest tightness, dizziness, and nausea after injection; no ER visit reported.",
        eventOnset: "2026-04-09",
        reporterRole: "Field Nurse (RN-77)",
        concomitantMeds: "Possible blood pressure medication (unconfirmed)",
        notes:
          "Model draft from pasted spreadsheet row. Reviewer should confirm product text normalization and onset estimate.",
      },
      fieldConfidence: {
        suspectProduct: "low",
        reactionSummary: "medium",
        eventOnset: "low",
        reporterRole: "medium",
        concomitantMeds: "low",
        notes: "high",
      },
      reviewFlags: {
        suspectProduct: "Product token was pasted as \"BIO IMM 21 ?\" and may need normalization.",
        eventOnset: "Onset inferred from shorthand phrase \"last wed pm maybe 6ish.\"",
        concomitantMeds: "Concomitant medication listed as uncertain shorthand in source row.",
      },
    },
  ],
  intakeFields: [
    {
      id: "suspectProduct",
      label: "Suspect product",
      required: true,
      value: "",
      placeholder: "Enter product name or code",
    },
    {
      id: "reactionSummary",
      label: "Reaction summary (verbatim)",
      required: true,
      value: "",
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
      value: "",
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
  minimumCaseCriteria: [
    {
      criterion: "Identifiable patient",
      sourceEvidence: "PAT-REDACTED-1042 / John D appears in source context.",
      confidence: "medium",
      reviewerStatus: "PV owner validates whether patient identity is sufficient.",
    },
    {
      criterion: "Identifiable reporter/source",
      sourceEvidence: "Field nurse RN-77 and inbound call source are captured.",
      confidence: "medium",
      reviewerStatus: "PV owner confirms source/reporting relationship.",
    },
    {
      criterion: "Suspect product",
      sourceEvidence: "BIO-IMM-21 is extracted with uncertainty flags when source text is ambiguous.",
      confidence: "high",
      reviewerStatus: "PV owner confirms product normalization before handoff.",
    },
    {
      criterion: "Adverse event/reaction",
      sourceEvidence: "Chest tightness, dizziness, and nausea are preserved from source narrative.",
      confidence: "high",
      reviewerStatus: "PV owner confirms validity, seriousness, and reportability outside this demo.",
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
      owner: "PV owner",
      task: "PV owner seriousness review",
      due: "Today 17:30 ET",
      status: "Open",
    },
  ],
  handoff: {
    packetId: "PKT-AE-2026-0431",
    destination: "Safety Operations Inbox",
    included: [
      "Structured case payload",
      "Verbatim reporter notes",
      "Timeline + follow-up log",
      "Reviewer-status metadata and uncertainty flags",
    ],
    exportState: "Static transfer preview only; no transfer occurs",
  },
  metrics: [
    {
      label: "Minimum-field completeness",
      value: "Pilot target: >=95%",
      delta: "Baseline to be measured before pilot",
    },
    {
      label: "Intake-to-review queue time",
      value: "Example threshold: <=1 hour for urgent cues",
      delta: "PV owner confirms seriousness and reportability",
    },
    {
      label: "Follow-up closure <24h",
      value: "Pilot target: >=80%",
      delta: "Measured after baseline, not a current result",
    },
    {
      label: "Queue >2h (high priority)",
      value: "Example threshold: 0 unresolved urgent-cue items",
      delta: "Requires pilot baseline and SOP-defined clock handling",
    },
  ],
};
