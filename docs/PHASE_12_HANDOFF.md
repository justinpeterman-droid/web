# Phase 12 — Handoff & Maintenance

**Goal:** Set yourself up to update content, make safe changes, and keep the site
healthy over time — so it stays an asset rather than slowly rotting.

## Why this phase matters
Most sites don't die from a dramatic failure; they die from neglect and from one
risky change made without a safety net. This final phase gives you the routines
that keep the site current and the habits that let you change things confidently.
Because you're using this site as an ongoing tool, this phase is what protects all
the work in the previous eleven.

## Prerequisites
- Phase 11 complete (site is live).

## Decisions / inputs you provide
- How often you expect to update content (drives your check-in rhythm).

## The three habits

### 1. Updating content (no code required)
Your day-to-day updates — new projects, edited copy, swapped images — happen in
the Sanity Studio you set up in Phase 7. You edit there, save, and the live site
reflects it within your revalidation window. No deploy, no code.

### 2. Making safe code changes
When you *do* change code, never edit the live site directly. The safe loop:
create a branch, make the change, test locally, push the branch, let Vercel build
a **preview** deployment, check the preview, and only then merge to your main
branch (which deploys to production). Git is your undo button across the whole
history.

### 3. Keeping it healthy
Dependencies get security updates; 3D and animation libraries evolve. Periodically
updating, testing, and redeploying keeps the site secure and prevents a scary
"everything is three years out of date" upgrade later.

## Prompts for Cursor

**Prompt 1 — write the maintenance guide:**
```
Create a MAINTENANCE.md in the repo, written for me (someone who can read code but
isn't doing this daily). Cover: how to edit content in Sanity Studio; the safe
code-change loop (branch -> local test -> push -> Vercel preview -> merge to
production) with the exact git commands; how to add a new project end to end
(including assigning its 3D scene variant); how to roll back a bad deploy in
Vercel; and how to update dependencies safely. Keep it practical and specific to
THIS project's setup.
```

**Prompt 2 — preview-deploy workflow:**
```
Confirm Vercel is configured so that pushing any non-main branch creates a preview
deployment, and merging to main deploys to production. Walk me through doing this
once with a tiny trivial change so I've seen the full safe loop work.
```

**Prompt 3 — dependency update routine:**
```
Show me how to safely check for and apply dependency updates for this project:
how to see what's outdated, how to update in a branch, what to test afterward
(especially the React Three Fiber + drei + three compatibility and the GSAP/Lenis
animation behavior), and how to confirm via a Vercel preview before merging. Note
any libraries that tend to have breaking changes so I'm extra careful with them.
```

**Prompt 4 — a "things to watch" checklist:**
```
Create a short OPERATIONS.md: a periodic checklist (e.g. monthly) — confirm the
contact form still delivers email, check analytics for broken/popular pages,
re-run Lighthouse on key routes, verify no console errors in production, and
confirm SSL/domain are healthy. Keep it to things I can actually do in 15 minutes.
```

## Definition of done
- `MAINTENANCE.md` exists and you understand the safe change loop.
- You've done one full branch -> preview -> merge cycle yourself.
- You know how to add a project entirely through Sanity.
- You know how to roll back a bad deploy in Vercel.
- `OPERATIONS.md` gives you a short periodic health check.

## Common pitfalls
- **Editing production directly / committing straight to main for risky changes:**
  the preview-deploy loop exists precisely so you don't have to gamble.
- **Never updating dependencies:** small regular updates are easy; a giant delayed
  one is painful and risky.
- **Forgetting how something worked:** that's what MAINTENANCE.md is for — future
  you will not remember the details.

## Bring back to Claude
- Any time you're about to make a change you're unsure about — describe it first
  and I'll help you assess the risk and the safest path.
- When a dependency update breaks something — paste the error and I'll help you
  decide whether to fix forward or roll back.

## You're done
At this point you have a live, immersive, multi-page site that's fast, accessible,
content-editable, and maintainable — and a clear routine for keeping it that way.
Commit the docs and celebrate:
```bash
git add -A && git commit -m "phase 12: maintenance + operations docs; handoff complete"
```
