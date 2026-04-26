export type LedgerStatus =
  | "Clean"
  | "No acknowledgement"
  | "Late acknowledgement"
  | "Invalid rejection"
  | "Causality trap"
  | "Duplicate review";

export interface MinimumCriterion {
  label: string;
  state: "present" | "missing" | "unclear";
  evidence: string;
}

export interface ReconciliationRecord {
  caseId: string;
  channel: string;
  patientToken: string;
  suspectProduct: string;
  eventPhrase: string;
  reporter: string;
  sourceReceivedAt: string;
  transferredAt: string;
  acknowledgementAt: string;
  acknowledgementStatus: string;
  acknowledgementReason: string;
  status: LedgerStatus;
  severity: "Control break" | "Reviewer check" | "Clear";
  sourceSnippet: string;
  minimumCriteria: MinimumCriterion[];
  dayZeroImplication: string;
  finding: string;
  escalationSummary: string;
}

export const reconciliationRecords: ReconciliationRecord[] = [
  {
    caseId: "SID-2026-014",
    channel: "Nurse callback",
    patientToken: "PT-A17",
    suspectProduct: "BIO-MAB-42",
    eventPhrase: "shortness of breath after injection",
    reporter: "Patient via nurse",
    sourceReceivedAt: "2026-04-15 09:12 ET",
    transferredAt: "2026-04-15 09:46 ET",
    acknowledgementAt: "2026-04-15 10:03 ET",
    acknowledgementStatus: "Accepted",
    acknowledgementReason: "Minimum criteria present",
    status: "Clean",
    severity: "Clear",
    sourceSnippet:
      "Adult patient PT-A17 told RN-M06 they had shortness of breath the same morning after BIO-MAB-42 injection.",
    minimumCriteria: [
      { label: "Identifiable patient", state: "present", evidence: "PT-A17 token in nurse note" },
      { label: "Suspect product", state: "present", evidence: "BIO-MAB-42 named" },
      { label: "Adverse event", state: "present", evidence: "Shortness of breath" },
      { label: "Identifiable reporter", state: "present", evidence: "RN-M06 documented caller" },
    ],
    dayZeroImplication: "Receipt and transfer are aligned; no reconciliation action needed.",
    finding: "No mismatch. Source, transfer, and acknowledgement ledgers agree.",
    escalationSummary: "No escalation packet required for this record.",
  },
  {
    caseId: "SID-2026-015",
    channel: "Pharmacy refill call",
    patientToken: "PT-C04",
    suspectProduct: "BIO-MAB-42",
    eventPhrase: "hospital visit after rash",
    reporter: "Pharmacist",
    sourceReceivedAt: "2026-04-15 11:20 ET",
    transferredAt: "2026-04-15 12:04 ET",
    acknowledgementAt: "Missing",
    acknowledgementStatus: "No acknowledgement",
    acknowledgementReason: "No external safety-system receipt found",
    status: "No acknowledgement",
    severity: "Control break",
    sourceSnippet:
      "Refill call: pharmacist notes PT-C04 reported a rash after BIO-MAB-42 and said they went to hospital that night.",
    minimumCriteria: [
      { label: "Identifiable patient", state: "present", evidence: "PT-C04 refill token" },
      { label: "Suspect product", state: "present", evidence: "BIO-MAB-42 refill record" },
      { label: "Adverse event", state: "present", evidence: "Rash and hospital visit" },
      { label: "Identifiable reporter", state: "present", evidence: "Pharmacist user ID in call log" },
    ],
    dayZeroImplication:
      "The PSP transfer exists, but the external acknowledgement is absent. PV owner should confirm receipt before the case silently ages.",
    finding: "Sent to safety mailbox but not acknowledged in the external ledger.",
    escalationSummary:
      "Escalate missing acknowledgement for SID-2026-015 with source call, transfer timestamp, and minimum-criteria evidence.",
  },
  {
    caseId: "SID-2026-016",
    channel: "Reimbursement note",
    patientToken: "PT-D19",
    suspectProduct: "BIO-INF-09",
    eventPhrase: "dizziness and fall",
    reporter: "Case manager",
    sourceReceivedAt: "2026-04-15 13:05 ET",
    transferredAt: "2026-04-15 13:40 ET",
    acknowledgementAt: "2026-04-16 10:18 ET",
    acknowledgementStatus: "Accepted late",
    acknowledgementReason: "Queued for medical review before acknowledgement",
    status: "Late acknowledgement",
    severity: "Control break",
    sourceSnippet:
      "Case manager documented that PT-D19 felt dizzy after BIO-INF-09 and fell in the clinic lobby; follow-up phone is on file.",
    minimumCriteria: [
      { label: "Identifiable patient", state: "present", evidence: "PT-D19 program token" },
      { label: "Suspect product", state: "present", evidence: "BIO-INF-09 in reimbursement note" },
      { label: "Adverse event", state: "present", evidence: "Dizziness and fall" },
      { label: "Identifiable reporter", state: "present", evidence: "Case manager documented source" },
    ],
    dayZeroImplication:
      "The acknowledgement returned the next business day. This needs an SLA note and PV confirmation of clock handling.",
    finding: "Acknowledged after the same-day control window.",
    escalationSummary:
      "Escalate late acknowledgement for SID-2026-016 with transfer evidence and reason code.",
  },
  {
    caseId: "SID-2026-017",
    channel: "PSP enrollment form",
    patientToken: "Initials + DOB",
    suspectProduct: "BIO-MAB-42",
    eventPhrase: "rash after injection",
    reporter: "Caregiver",
    sourceReceivedAt: "2026-04-15 14:44 ET",
    transferredAt: "2026-04-15 15:10 ET",
    acknowledgementAt: "2026-04-15 15:35 ET",
    acknowledgementStatus: "Rejected invalid",
    acknowledgementReason: "Rejected as no identifiable patient",
    status: "Invalid rejection",
    severity: "Control break",
    sourceSnippet:
      "Enrollment form note includes patient initials K.L., DOB month/year, caregiver phone, BIO-MAB-42, and 'rash after injection'.",
    minimumCriteria: [
      { label: "Identifiable patient", state: "present", evidence: "Initials K.L. plus DOB month/year" },
      { label: "Suspect product", state: "present", evidence: "BIO-MAB-42 listed" },
      { label: "Adverse event", state: "present", evidence: "Rash after injection" },
      { label: "Identifiable reporter", state: "present", evidence: "Caregiver phone present" },
    ],
    dayZeroImplication:
      "The rejection reason conflicts with source evidence. Human PV review should decide validity, not the reconciliation control.",
    finding: "Rejected as invalid even though the source note has patient-identifying evidence.",
    escalationSummary:
      "Prepare PV review packet for SID-2026-017 showing the rejected reason and the source evidence for identifiable patient.",
  },
  {
    caseId: "SID-2026-018",
    channel: "Nurse call",
    patientToken: "Adult patient",
    suspectProduct: "BIO-INF-09",
    eventPhrase: "headache after dose",
    reporter: "Nurse",
    sourceReceivedAt: "2026-04-15 16:25 ET",
    transferredAt: "2026-04-15 16:42 ET",
    acknowledgementAt: "2026-04-15 17:01 ET",
    acknowledgementStatus: "Cancelled",
    acknowledgementReason: "Reporter said event was probably unrelated",
    status: "Causality trap",
    severity: "Control break",
    sourceSnippet:
      "Nurse note: adult patient reported headache after BIO-INF-09. Reporter added that it was 'probably just stress'.",
    minimumCriteria: [
      { label: "Identifiable patient", state: "present", evidence: "Adult patient tied to program note" },
      { label: "Suspect product", state: "present", evidence: "BIO-INF-09 named" },
      { label: "Adverse event", state: "present", evidence: "Headache after dose" },
      { label: "Identifiable reporter", state: "present", evidence: "Nurse ID on note" },
    ],
    dayZeroImplication:
      "A causality comment should not erase the operational record. PV owner should review the cancellation reason.",
    finding: "Cancelled because of a causality statement even though report facts are present.",
    escalationSummary:
      "Escalate cancellation rationale for SID-2026-018; include source wording and minimum-criteria checklist.",
  },
  {
    caseId: "SID-2026-019",
    channel: "Caregiver voicemail",
    patientToken: "PT-A17",
    suspectProduct: "BIO-MAB-42",
    eventPhrase: "shortness of breath after injection",
    reporter: "Caregiver",
    sourceReceivedAt: "2026-04-15 18:08 ET",
    transferredAt: "2026-04-15 18:34 ET",
    acknowledgementAt: "2026-04-15 19:02 ET",
    acknowledgementStatus: "Pending duplicate review",
    acknowledgementReason: "Possible duplicate of SID-2026-014",
    status: "Duplicate review",
    severity: "Reviewer check",
    sourceSnippet:
      "After-hours voicemail from caregiver references PT-A17, shortness of breath, and same product. Relationship to morning nurse call is unclear.",
    minimumCriteria: [
      { label: "Identifiable patient", state: "present", evidence: "PT-A17 token repeated" },
      { label: "Suspect product", state: "present", evidence: "BIO-MAB-42 named" },
      { label: "Adverse event", state: "present", evidence: "Shortness of breath" },
      { label: "Identifiable reporter", state: "present", evidence: "Caregiver voicemail and callback number" },
    ],
    dayZeroImplication:
      "This may be a duplicate, but the control should preserve the evidence until PV confirms linkage.",
    finding: "Duplicate candidate needs human linkage review before closure.",
    escalationSummary:
      "Route SID-2026-019 for duplicate linkage review against SID-2026-014 with both source snippets.",
  },
];

export const reconciliationSummary = {
  title: "Ghost-Case Reconciliation Drill",
  subtitle:
    "A static control simulation that checks whether PSP safety records survived the handoff from first contact to external acknowledgement.",
  guardrail:
    "This does not submit, invalidate, or decide reportability. It prepares evidence for a qualified PV owner.",
};
