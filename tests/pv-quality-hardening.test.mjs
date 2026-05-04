import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const boundaryText =
  "Static front-end demo using synthetic/redacted examples. It does not submit reports, decide validity, assess seriousness, determine reportability, send messages, or handle real patient data. Qualified PV/Quality owners remain responsible for all safety decisions.";

test("shared header carries the PV/Quality decision boundary", () => {
  const header = read("src/components/SiteHeader.astro");
  assert.match(header, /compliance-boundary/);
  assert.ok(header.includes(boundaryText));
});

test("source copy avoids risky AI/product-maturity claims", () => {
  const sourceBundle = [
    read("src/content/appendix.ts"),
    read("src/content/caseStudy.ts"),
    read("src/data/prototype.ts"),
    read("src/data/reconciliation.ts"),
    read("src/pages/Next.astro"),
  ].join("\n");

  assert.doesNotMatch(
    sourceBundle,
    /AI-assisted|review-ready|audit-ready|secure transfer|Ghost-Case|\+8%|-11 min|27 min|KISS|YAGNI|DRY|SOLID/,
  );
});

test("intake and reconciliation expose reviewer ownership controls", () => {
  const prototype = read("src/data/prototype.ts");
  const prototypeComponent = read("src/components/PrototypeDemo.astro");
  const reconciliation = read("src/data/reconciliation.ts");
  const reconciliationComponent = read("src/components/ReconciliationDrill.astro");

  assert.match(prototype, /minimumCaseCriteria/);
  assert.match(prototypeComponent, /Minimum Case Criteria/);
  assert.match(prototypeComponent, /PV owner confirms whether minimum criteria are met/);
  assert.match(reconciliation, /Safety Case Reconciliation Control/);
  assert.match(reconciliation, /exceptionDispositions/);
  assert.match(reconciliationComponent, /Exception disposition/);
});

test("appendix answers manager risk questions", () => {
  const appendix = read("src/content/appendix.ts");
  const appendixPage = read("src/pages/appendix.astro");

  assert.match(appendix, /managerQuestions/);
  assert.match(appendixPage, /Manager Questions Answered/);
  assert.match(appendix, /What This Demo Does Not Do/);
  assert.match(appendix, /Pilot Evidence Plan/);
});

test("built pages include the global boundary and server-rendered Ops fallback", () => {
  const pages = [
    "dist/index.html",
    "dist/Next/index.html",
    "dist/Ops/index.html",
    "dist/appendix/index.html",
  ];

  for (const page of pages) {
    assert.ok(read(page).includes(boundaryText), `${page} should include boundary text`);
  }

  const ops = read("dist/Ops/index.html");
  assert.match(ops, /data-queue-body[^>]*>[\s\S]*OPS-101/);
  assert.doesNotMatch(ops, /data-metric="therapyStartRiskBefore">0</);
  assert.match(ops, /This third demo is intentionally adjacent to PV/);
});
