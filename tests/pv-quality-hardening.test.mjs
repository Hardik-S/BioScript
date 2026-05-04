import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const boundaryText =
  "Static front-end demo using synthetic/redacted examples. It does not submit reports, decide validity, assess seriousness, determine reportability, send messages, or handle real patient data. Qualified PV/Quality owners remain responsible for all safety decisions.";

test("shared header supports route-specific brand marks without the boundary banner", () => {
  const header = read("src/components/SiteHeader.astro");
  assert.match(header, /brand:\s*\{/);
  assert.match(header, /brand\.mark/);
  assert.match(header, /brand\.title/);
  assert.match(header, /brand\.subtitle/);
  assert.doesNotMatch(header, /compliance-boundary/);
  assert.doesNotMatch(header, /Demo boundary/);
  assert.ok(!header.includes(boundaryText));
});

test("routes pass distinct header brand metadata", () => {
  const expectations = [
    ["src/pages/index.astro", "SI", "Safety Intake Desk"],
    ["src/pages/Next.astro", "RC", "Safety Case Reconciliation Control"],
    ["src/pages/Ops.astro", "OP", "Care Operations Control Room"],
    ["src/pages/appendix.astro", "AP", "Appendix"],
  ];

  for (const [path, mark, title] of expectations) {
    const page = read(path);
    assert.ok(page.includes(`mark: "${mark}"`), `${path} should pass ${mark} as the header mark`);
    assert.ok(page.includes(`title: "${title}"`), `${path} should pass ${title} as the header title`);
  }
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

  assert.match(appendix, /shortVersionSections/);
  assert.ok(appendix.includes(boundaryText));
  assert.match(appendixPage, /short-version-panel/);
  assert.match(appendixPage, /data-short-version-button/);
  assert.match(appendixPage, /data-short-version-section/);
  assert.match(appendix, /managerQuestions/);
  assert.match(appendixPage, /Manager Questions Answered/);
  assert.match(appendix, /What This Demo Does Not Do/);
  assert.match(appendix, /Pilot Evidence Plan/);

  const shortVersionIndex = appendixPage.indexOf("Short version");
  const demoNotesIndex = appendixPage.indexOf("Demo notes");
  assert.ok(shortVersionIndex > -1, "appendix should render Short version");
  assert.ok(demoNotesIndex > -1, "appendix should render Demo notes");
  assert.ok(shortVersionIndex < demoNotesIndex, "Short version should appear above demo notes");
});

test("built pages use route brands and keep the boundary in the appendix only", () => {
  const pages = {
    "dist/index.html": "SI",
    "dist/Next/index.html": "RC",
    "dist/Ops/index.html": "OP",
    "dist/appendix/index.html": "AP",
  };

  for (const [page, mark] of Object.entries(pages)) {
    assert.match(read(page), new RegExp(`class="brand-mark"[^>]*>${mark}</span>`), `${page} should include ${mark} brand mark`);
  }

  assert.ok(read("dist/appendix/index.html").includes(boundaryText), "appendix should include boundary text");
  for (const page of ["dist/index.html", "dist/Next/index.html", "dist/Ops/index.html"]) {
    assert.ok(!read(page).includes(boundaryText), `${page} should not include global boundary text`);
  }

  const ops = read("dist/Ops/index.html");
  assert.match(ops, /data-queue-body[^>]*>[\s\S]*OPS-101/);
  assert.doesNotMatch(ops, /data-metric="therapyStartRiskBefore">0</);
  assert.match(ops, /This third demo is intentionally adjacent to PV/);
});
