# SUBAGENTS

## Purpose

Use subagents for bounded, non-overlapping slices. The main agent owns final integration, visual consistency, and verification.

## Ownership

- Content worker:
  - Owns cleaned narrative and structured case-study content modules
  - Must not edit layout, styles, or deployment files
- Prototype worker:
  - Owns the interactive static prototype component and its local data definitions
  - Must not edit top-level page composition or deployment files
- QA/deploy reviewer:
  - Reviews responsive behavior, pathing, and GitHub Pages assumptions
  - Should prefer findings over broad rewrites

## Review Checklist

- Does each change stay within its assigned files?
- Is the output static-hosting friendly?
- Are copy and UI aligned with the product-led narrative?
- Are there any broken assumptions around the GitHub Pages base path?
- Is the prototype believable without implying unsupported backend behavior?
