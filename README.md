# BioScript Safety Intake Desk

Product-led case-study site for a hosted MVP of **Safety Intake Desk**.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Demo Surface

The app is organized as a small route set so each demo can stay focused:

- `/` - Safety Intake Desk case-study landing page and guided intake prototype.
- `/Next/` - Ghost-case reconciliation drill for source, transfer, and acknowledgement checks.
- `/Ops/` - Care Operations Control Room simulator for manager-level daily prioritization.
- `/appendix/` - Supporting rationale, workflow notes, delivery assumptions, and risk register.

When running locally, Astro serves these routes from the site root. In GitHub Pages builds, the configured base path makes the same routes available under `/BioScript/`.

## Verification

Before publishing a change, run:

```bash
npm ci
npm run build
```

The deployment workflow uses the same build command before uploading the `dist` artifact to GitHub Pages.

## Deployment

Vercel is the primary deployment target. The site builds as a static Astro app with:

```bash
npm run build
```

GitHub Pages remains configured as an automatic backup deployment and assumes the repository name is `BioScript`.

Backup URL:

`https://hardik-s.github.io/BioScript/`
