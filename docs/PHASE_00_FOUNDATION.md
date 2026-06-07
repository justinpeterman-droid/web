# Phase 0 — Foundation

**Goal:** Get your machine and tools ready so nothing later is built on sand.

## Why this phase matters
Every phase after this assumes you can run a project, edit it in Cursor, and undo
mistakes. Skipping the boring setup is the most common reason builds collapse
halfway: a missing tool or an untracked project means a small error becomes
unrecoverable. This phase makes the rest of the build calm.

## Prerequisites
- A computer (macOS, Windows, or Linux) and an internet connection.
- About 30–45 minutes.

## Decisions / inputs you provide
- None yet. This is pure setup.

## Steps

### 1. Install Node.js
Install the current **LTS** version of Node.js from nodejs.org. LTS = "long-term
support" = the stable line. Verify in a terminal:
```bash
node --version
npm --version
```

### 2. Install pnpm (the package manager we chose)
```bash
npm install -g pnpm
pnpm --version
```

### 3. Install Git and set your identity
Install Git from git-scm.com if you don't have it, then:
```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 4. Install Cursor and add the project rules
- Download and install Cursor (cursor.com).
- You'll create the rules file in Phase 1 once the project folder exists. For now
  just confirm Cursor opens and you can sign in.

### 5. Create accounts you'll need later (free tiers are fine)
You don't have to configure these yet — just create logins so they're ready:
- **GitHub** (stores your code, connects to Vercel)
- **Vercel** (hosting)
- **Sanity** (CMS — Phase 7)
- **Resend** (email — Phase 8)

## Prompts for Cursor
None this phase — it's local setup. Cursor enters in Phase 1.

## Definition of done
- `node`, `pnpm`, and `git` all print version numbers in your terminal.
- Cursor is installed and you're signed in.
- You have logins for GitHub, Vercel, Sanity, and Resend.

## Common pitfalls
- **Node installed but terminal can't find it:** close and reopen the terminal so
  it picks up the new PATH.
- **Permission errors on `npm install -g`:** on macOS/Linux this usually means a
  Node install owned by root; reinstalling Node via the official installer (not
  sudo) fixes it.

## Bring back to Claude
- Any version command that errors instead of printing a number — paste the exact
  error.
