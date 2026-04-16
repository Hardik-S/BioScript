# AGENTS

## Goal

Build a product-led, hiring-manager-facing GitHub Pages case-study site for **Safety Intake Desk**. The site should communicate product judgment, operating realism, and execution quality through a polished static experience and a believable front-end-only prototype.

## Stack

- Astro
- TypeScript
- Static export for GitHub Pages
- Minimal client-side JavaScript only where interactivity is necessary

## Standards

- Favor KISS, DRY, SOLID, and YAGNI
- Prefer data-driven content modules over duplicated page copy
- Keep the main page scannable in under two minutes
- Use sample or redacted data only
- Preserve a product-led framing with a secondary credibility layer

## Deployment Model

- Build as a static site with `astro build`
- Deploy through GitHub Actions to GitHub Pages
- Assume repository name `BioScript` for the default Pages base path

## Non-Goals

- No backend
- No authentication
- No real email sending
- No external CMS
- No analytics unless required later
- No attempt to build the real adverse-event workflow system
