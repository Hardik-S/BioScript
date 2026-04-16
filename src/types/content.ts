export interface NavLink {
  href: string;
  label: string;
}

export interface Metric {
  label: string;
  value: string;
  note: string;
}

export interface Quote {
  text: string;
  attribution: string;
}

export interface TimelineStep {
  title: string;
  detail: string;
}

export interface Highlight {
  title: string;
  detail: string;
}

export interface StorySection {
  title: string;
  lead: string;
  bullets: string[];
}

export interface RiskItem {
  title: string;
  mitigation: string;
}

export interface AppendixSection {
  title: string;
  intro: string;
  points: string[];
}

export interface ProfileEntry {
  org: string;
  title: string;
  date: string;
  bullets: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  summary: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
  experience: ProfileEntry[];
}

export interface CaseStudyData {
  nav: NavLink[];
  hero: {
    kicker: string;
    title: string;
    summary: string;
    thesis: string;
    ctas: NavLink[];
    facts: Metric[];
  };
  problem: StorySection;
  solution: StorySection;
  workflow: TimelineStep[];
  wedge: Highlight[];
  delivery: {
    summary: string;
    metrics: Metric[];
    phases: TimelineStep[];
  };
  rationale: Quote;
  appendix: AppendixSection[];
}
