export type OpsRoleId =
  | "caseManager"
  | "reimbursement"
  | "nurse"
  | "pharmacy"
  | "clinic";

export type OpsScenarioId =
  | "normalMonday"
  | "callSpike"
  | "nurseUnavailable"
  | "payerPortalDelay"
  | "pharmacyCutoffPressure";

export type TriageStrategyId =
  | "earliestSla"
  | "therapyStartFirst"
  | "balancedByRole"
  | "quickUnblocks";

export type SlaRisk = "High" | "Medium" | "Low";
export type ImpactCategory =
  | "therapyStart"
  | "callback"
  | "reimbursement"
  | "pharmacy"
  | "clinic"
  | "routine";

export interface OpsRole {
  id: OpsRoleId;
  label: string;
  laneLabel: string;
}

export interface OpsScenario {
  id: OpsScenarioId;
  label: string;
  note: string;
  activeWorkItems: string[];
  capacityAdjustments?: Partial<Record<OpsRoleId, number>>;
  delayedDependencies?: string[];
}

export interface TriageStrategy {
  id: TriageStrategyId;
  label: string;
  note: string;
}

export interface OpsWorkItem {
  id: string;
  patientRef: string;
  program: string;
  channel: string;
  workType: string;
  ownerRole: OpsRoleId;
  createdAt: string;
  dueAt: string;
  therapyStartDate?: string;
  estimatedEffort: number;
  blockerType?: string;
  dependency?: string;
  patientImpact: string;
  impactCategory: ImpactCategory;
  slaRisk: SlaRisk;
  status: "Open" | "Blocked" | "Ready";
  decisionReason: string;
  isRoutine?: boolean;
  sameDayCutoff?: boolean;
  unblockPotential?: boolean;
}

export const opsRoles: OpsRole[] = [
  { id: "caseManager", label: "Case Manager", laneLabel: "Case Management" },
  { id: "reimbursement", label: "Reimbursement Specialist", laneLabel: "Reimbursement" },
  { id: "nurse", label: "Nurse", laneLabel: "Nursing" },
  { id: "pharmacy", label: "Pharmacy Coordinator", laneLabel: "Pharmacy Coordination" },
  { id: "clinic", label: "Clinic Scheduler", laneLabel: "Clinic Scheduling" },
];

export const defaultCapacity: Record<OpsRoleId, number> = {
  caseManager: 2,
  reimbursement: 2,
  nurse: 1,
  pharmacy: 1,
  clinic: 1,
};

export const triageStrategies: TriageStrategy[] = [
  {
    id: "earliestSla",
    label: "Earliest SLA first",
    note: "Sort the day by due window and callback exposure.",
  },
  {
    id: "therapyStartFirst",
    label: "Therapy-start blockers first",
    note: "Protect starts scheduled today or tomorrow before routine work.",
  },
  {
    id: "balancedByRole",
    label: "Balance work by role",
    note: "Avoid overloading one lane when other teams can clear work.",
  },
  {
    id: "quickUnblocks",
    label: "Clear quick unblocks first",
    note: "Prefer short actions that unlock downstream work.",
  },
];

export const opsWorkItems: OpsWorkItem[] = [
  {
    id: "OPS-101",
    patientRef: "PAT-REDACTED-2041",
    program: "Immunology PSP Pilot",
    channel: "Outbound call",
    workType: "Missing consent follow-up",
    ownerRole: "caseManager",
    createdAt: "2026-04-20 08:20 ET",
    dueAt: "2026-04-20 11:30 ET",
    therapyStartDate: "2026-04-21",
    estimatedEffort: 30,
    blockerType: "Enrollment",
    dependency: "Patient consent confirmation",
    patientImpact: "First dose planned tomorrow",
    impactCategory: "therapyStart",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Consent is the final non-clinical step before tomorrow's first dose.",
    unblockPotential: true,
  },
  {
    id: "OPS-102",
    patientRef: "PAT-REDACTED-2188",
    program: "Immunology PSP Pilot",
    channel: "Payor portal",
    workType: "Prior authorization retry",
    ownerRole: "reimbursement",
    createdAt: "2026-04-20 08:35 ET",
    dueAt: "2026-04-20 12:30 ET",
    therapyStartDate: "2026-04-21",
    estimatedEffort: 45,
    blockerType: "Coverage",
    dependency: "Updated insurer response",
    patientImpact: "Therapy start blocked pending coverage",
    impactCategory: "reimbursement",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Coverage follow-up can unblock tomorrow's scheduled start.",
    unblockPotential: true,
  },
  {
    id: "OPS-103",
    patientRef: "PAT-REDACTED-2304",
    program: "Immunology PSP Pilot",
    channel: "Patient callback",
    workType: "Injection training callback",
    ownerRole: "nurse",
    createdAt: "2026-04-20 08:45 ET",
    dueAt: "2026-04-20 13:00 ET",
    therapyStartDate: "2026-04-21",
    estimatedEffort: 40,
    blockerType: "Education",
    dependency: "Nurse callback",
    patientImpact: "Patient needs education before home start",
    impactCategory: "therapyStart",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Training is needed before a planned home start.",
  },
  {
    id: "OPS-104",
    patientRef: "PAT-REDACTED-2420",
    program: "Immunology PSP Pilot",
    channel: "Pharmacy queue",
    workType: "Delivery address confirmation",
    ownerRole: "pharmacy",
    createdAt: "2026-04-20 09:05 ET",
    dueAt: "2026-04-20 13:45 ET",
    estimatedEffort: 20,
    blockerType: "Delivery",
    dependency: "Address confirmation",
    patientImpact: "Cold-chain shipment cutoff at 14:00",
    impactCategory: "pharmacy",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Same-day shipment will miss the cold-chain cutoff if not confirmed.",
    sameDayCutoff: true,
    unblockPotential: true,
  },
  {
    id: "OPS-105",
    patientRef: "PAT-REDACTED-2512",
    program: "Immunology PSP Pilot",
    channel: "Clinic message",
    workType: "Clinic reschedule",
    ownerRole: "clinic",
    createdAt: "2026-04-20 09:10 ET",
    dueAt: "2026-04-20 15:00 ET",
    estimatedEffort: 25,
    blockerType: "Appointment",
    dependency: "Clinic slot confirmation",
    patientImpact: "Infusion appointment may slip one week",
    impactCategory: "clinic",
    slaRisk: "Medium",
    status: "Ready",
    decisionReason: "Clinic slot confirmation protects the planned service window.",
    sameDayCutoff: true,
  },
  {
    id: "OPS-106",
    patientRef: "PAT-REDACTED-2630",
    program: "Immunology PSP Pilot",
    channel: "Payor portal",
    workType: "Payor portal retry",
    ownerRole: "reimbursement",
    createdAt: "2026-04-20 09:20 ET",
    dueAt: "2026-04-20 14:30 ET",
    therapyStartDate: "2026-04-22",
    estimatedEffort: 35,
    blockerType: "Coverage",
    dependency: "Payor portal available",
    patientImpact: "Blocked until portal available",
    impactCategory: "reimbursement",
    slaRisk: "Medium",
    status: "Blocked",
    decisionReason: "Portal availability controls whether the reimbursement team can act.",
  },
  {
    id: "OPS-107",
    patientRef: "PAT-REDACTED-2744",
    program: "Immunology PSP Pilot",
    channel: "Routine callback",
    workType: "Routine adherence check",
    ownerRole: "caseManager",
    createdAt: "2026-04-20 09:25 ET",
    dueAt: "2026-04-20 16:30 ET",
    estimatedEffort: 20,
    patientImpact: "Low urgency, can defer",
    impactCategory: "routine",
    slaRisk: "Low",
    status: "Open",
    decisionReason: "Routine check has low same-day exposure compared with start blockers.",
    isRoutine: true,
  },
  {
    id: "OPS-108",
    patientRef: "PAT-REDACTED-2818",
    program: "Immunology PSP Pilot",
    channel: "Enrollment form",
    workType: "Manufacturer form correction",
    ownerRole: "caseManager",
    createdAt: "2026-04-20 09:35 ET",
    dueAt: "2026-04-20 12:00 ET",
    therapyStartDate: "2026-04-22",
    estimatedEffort: 25,
    blockerType: "Enrollment",
    dependency: "Missing field correction",
    patientImpact: "Missing field blocks enrolment completion",
    impactCategory: "therapyStart",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "A short correction can unblock the enrollment path.",
    unblockPotential: true,
  },
  {
    id: "OPS-109",
    patientRef: "PAT-REDACTED-2940",
    program: "Immunology PSP Pilot",
    channel: "Patient callback",
    workType: "Nurse education request",
    ownerRole: "nurse",
    createdAt: "2026-04-20 09:50 ET",
    dueAt: "2026-04-20 14:00 ET",
    therapyStartDate: "2026-04-21",
    estimatedEffort: 35,
    blockerType: "Education",
    dependency: "Nurse callback",
    patientImpact: "Patient unsure about first self-injection",
    impactCategory: "therapyStart",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Education callback protects a first self-injection plan.",
  },
  {
    id: "OPS-110",
    patientRef: "PAT-REDACTED-3025",
    program: "Immunology PSP Pilot",
    channel: "Provider fax",
    workType: "Prescription renewal follow-up",
    ownerRole: "caseManager",
    createdAt: "2026-04-20 10:05 ET",
    dueAt: "2026-04-20 16:00 ET",
    estimatedEffort: 30,
    blockerType: "Refill",
    dependency: "Provider confirmation",
    patientImpact: "Refill due in 48h",
    impactCategory: "callback",
    slaRisk: "Medium",
    status: "Open",
    decisionReason: "Refill is not due today, but follow-up reduces wait-risk.",
  },
  {
    id: "OPS-111",
    patientRef: "PAT-REDACTED-3199",
    program: "Immunology PSP Pilot",
    channel: "Patient email",
    workType: "Financial assistance application",
    ownerRole: "reimbursement",
    createdAt: "2026-04-20 10:15 ET",
    dueAt: "2026-04-20 15:30 ET",
    therapyStartDate: "2026-04-22",
    estimatedEffort: 45,
    blockerType: "Affordability",
    dependency: "Patient income attestation",
    patientImpact: "Out-of-pocket concern delaying start",
    impactCategory: "reimbursement",
    slaRisk: "Medium",
    status: "Open",
    decisionReason: "Affordability work keeps the start path moving.",
    unblockPotential: true,
  },
  {
    id: "OPS-112",
    patientRef: "PAT-REDACTED-3272",
    program: "Immunology PSP Pilot",
    channel: "Specialty pharmacy",
    workType: "Stock confirmation",
    ownerRole: "pharmacy",
    createdAt: "2026-04-20 10:20 ET",
    dueAt: "2026-04-20 13:30 ET",
    estimatedEffort: 15,
    blockerType: "Delivery",
    dependency: "Stock confirmation",
    patientImpact: "Shipment cannot release until confirmed",
    impactCategory: "pharmacy",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Short stock confirmation protects a same-day shipment path.",
    sameDayCutoff: true,
    unblockPotential: true,
  },
  {
    id: "OPS-113",
    patientRef: "PAT-REDACTED-3390",
    program: "Immunology PSP Pilot",
    channel: "Inbound call",
    workType: "Benefit status callback",
    ownerRole: "caseManager",
    createdAt: "2026-04-20 10:35 ET",
    dueAt: "2026-04-20 14:45 ET",
    estimatedEffort: 20,
    patientImpact: "Patient waiting for coverage status before booking",
    impactCategory: "callback",
    slaRisk: "Medium",
    status: "Open",
    decisionReason: "Callback has moderate wait-risk but does not block a first dose today.",
  },
  {
    id: "OPS-114",
    patientRef: "PAT-REDACTED-3448",
    program: "Immunology PSP Pilot",
    channel: "Inbound call",
    workType: "Welcome call retry",
    ownerRole: "caseManager",
    createdAt: "2026-04-20 10:42 ET",
    dueAt: "2026-04-20 17:00 ET",
    estimatedEffort: 15,
    patientImpact: "New patient onboarding is waiting",
    impactCategory: "routine",
    slaRisk: "Low",
    status: "Open",
    decisionReason: "Low-risk onboarding retry should wait behind same-day blockers.",
    isRoutine: true,
  },
  {
    id: "OPS-115",
    patientRef: "PAT-REDACTED-3561",
    program: "Immunology PSP Pilot",
    channel: "Nurse queue",
    workType: "Same-day escalation slot",
    ownerRole: "nurse",
    createdAt: "2026-04-20 10:55 ET",
    dueAt: "2026-04-20 12:45 ET",
    therapyStartDate: "2026-04-20",
    estimatedEffort: 30,
    blockerType: "Education",
    dependency: "Nurse callback",
    patientImpact: "First dose support needed today",
    impactCategory: "therapyStart",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Same-day start support should consume protected nurse capacity.",
  },
  {
    id: "OPS-116",
    patientRef: "PAT-REDACTED-3618",
    program: "Immunology PSP Pilot",
    channel: "Payor portal",
    workType: "Coverage document upload",
    ownerRole: "reimbursement",
    createdAt: "2026-04-20 11:05 ET",
    dueAt: "2026-04-20 13:15 ET",
    therapyStartDate: "2026-04-21",
    estimatedEffort: 25,
    blockerType: "Coverage",
    dependency: "Payor portal available",
    patientImpact: "Document upload needed before authorization review",
    impactCategory: "reimbursement",
    slaRisk: "High",
    status: "Blocked",
    decisionReason: "Blocked when the payor portal is delayed; high priority once available.",
    unblockPotential: true,
  },
  {
    id: "OPS-117",
    patientRef: "PAT-REDACTED-3722",
    program: "Immunology PSP Pilot",
    channel: "Specialty pharmacy",
    workType: "Courier release confirmation",
    ownerRole: "pharmacy",
    createdAt: "2026-04-20 11:15 ET",
    dueAt: "2026-04-20 13:50 ET",
    estimatedEffort: 15,
    dependency: "Courier pickup window",
    patientImpact: "Shipment cutoff pressure before 14:00",
    impactCategory: "pharmacy",
    slaRisk: "High",
    status: "Ready",
    decisionReason: "Courier release is short and time-boxed by the shipment cutoff.",
    sameDayCutoff: true,
    unblockPotential: true,
  },
  {
    id: "OPS-118",
    patientRef: "PAT-REDACTED-3845",
    program: "Immunology PSP Pilot",
    channel: "Clinic call",
    workType: "Infusion chair confirmation",
    ownerRole: "clinic",
    createdAt: "2026-04-20 11:20 ET",
    dueAt: "2026-04-20 15:15 ET",
    therapyStartDate: "2026-04-22",
    estimatedEffort: 20,
    dependency: "Clinic schedule confirmation",
    patientImpact: "Chair confirmation needed to keep start window",
    impactCategory: "clinic",
    slaRisk: "Medium",
    status: "Ready",
    decisionReason: "Clinic confirmation reduces schedule slip risk.",
    sameDayCutoff: true,
  },
];

const normalWorkItems = [
  "OPS-101",
  "OPS-102",
  "OPS-103",
  "OPS-104",
  "OPS-105",
  "OPS-106",
  "OPS-107",
  "OPS-108",
  "OPS-109",
  "OPS-110",
  "OPS-111",
  "OPS-112",
];

export const opsScenarios: OpsScenario[] = [
  {
    id: "normalMonday",
    label: "Normal Monday AM",
    note: "A realistic morning huddle for one PSP-style program.",
    activeWorkItems: normalWorkItems,
  },
  {
    id: "callSpike",
    label: "Call volume spike",
    note: "Extra callbacks and onboarding work compete with same-day blockers.",
    activeWorkItems: [...normalWorkItems, "OPS-113", "OPS-114", "OPS-115"],
  },
  {
    id: "nurseUnavailable",
    label: "Nurse sick call",
    note: "Nurse capacity drops, forcing protected callback choices.",
    activeWorkItems: [...normalWorkItems, "OPS-115"],
    capacityAdjustments: { nurse: -2 },
  },
  {
    id: "payerPortalDelay",
    label: "Payor portal delay",
    note: "Coverage tasks with portal dependency cannot be assigned immediately.",
    activeWorkItems: [...normalWorkItems, "OPS-116"],
    delayedDependencies: ["Payor portal available"],
  },
  {
    id: "pharmacyCutoffPressure",
    label: "Pharmacy cutoff pressure",
    note: "Additional shipment work tightens the 14:00 coordination window.",
    activeWorkItems: [...normalWorkItems, "OPS-117", "OPS-118"],
    capacityAdjustments: { pharmacy: -1 },
  },
];
