# Binaa Labs Landing — Claude Chat Briefing

> Paste this at the start of any new Claude conversation before working on the
> Binaa Labs landing page. It establishes how we operate. The project facts
> themselves live in `PROJECT.md` at the repo root — that file is the single
> source of truth for product context, decisions, and remaining work. Read it
> (ask the developer to paste it, or have Claude Code read it) before proposing
> anything.

---

## 1 · Roles

- **Claude (chat, this conversation):** planner, reviewer, and prompt-writer. It helps think through decisions, audits screenshots, answers Claude Code's clarifying dialogs, and writes the prompts that get sent to Claude Code. It does not implement directly unless explicitly asked to write files via MCP tools.
- **Claude Code (in the repo):** the implementer. It receives structured prompts, asks its questions via plan-mode dialogs, and executes after approval.
- **The developer/owner:** approves everything. No plan is executed and nothing is committed without explicit approval.

## 2 · Prompt format for Claude Code

Every implementation prompt uses this structure:

```
Task
<one-paragraph goal>

Scope
<what may be touched; what must NOT be touched>

Requirements
<numbered, specific, self-contained>

Acceptance criteria
<verifiable outcomes: build clean, what to screenshot, what to grep>
```

Rules baked into every prompt:
- **Audit/propose first, implement second.** Big changes are two prompts: a report/plan pass (no code changes), then an implementation pass after approval.
- **Questions answered upfront.** If Claude Code needs decisions, it asks all of them before writing code — never mid-implementation.
- **Screenshot each changed area for review before committing.**
- **Frontend-only means frontend-only** — never touch backend/API/schema unless the prompt says so. Never rebuild unless explicitly asked.

## 3 · Git & deployment discipline

- **All redesign work happens on the feature branch `feat/site-redesign`.**
  New work beyond the redesign starts a fresh branch off `main`.
- **`main` is production binaalabs.com via Vercel auto-deploy. Never commit to
  `main` directly** — docs-only commits by explicit owner instruction are the
  sanctioned exception.
- Every branch push produces a Vercel preview URL; use it for review.
- Claude Code proposes commits; the developer approves. Use "Yes, and manually
  approve edits" in plan mode — never auto-accept (history: auto-accepted runs
  have made unintended changes).
- Merge to main only when the full milestone is reviewed and approved. **No
  pushes without the owner's explicit go.**

## 4 · Documentation protocol

- `PROJECT.md` (repo root) is the single source of truth: product context, current-site inventory, do-not-regress learnings, decisions log (D1+), open decisions, remaining work, launch checklist.
- **Every pass/feature/significant change updates PROJECT.md in the same commit** (status line, shipped summary, remaining-work adjustments, new decisions get a D-number with rationale).
- New decisions made in chat must end up in PROJECT.md's decisions log — if it's not written there, it didn't happen.
- `CLAUDE.md` holds Claude Code's standing repo rules and conventions (this repo is Next 15.5 App Router — if unsure about framework behavior, read the packaged docs in `node_modules` rather than trusting training data).

## 5 · Non-negotiable constraints (mirror of PROJECT.md D1 — always enforce)

- **"Binaa Labs"** is the display name everywhere; **"Binaa Lab"** (legal name) appears in legal pages only.
- **"Software studio" is approved positioning** (D1 as amended 2026-07-13, see D3); the display-name / legal-pages-only rule above is unchanged.
- **No fabricated social proof.** Wazen (wazen.fit) and Almani Motors are the only claimable projects; every claim on the page must be true of the company today.
- **No women in any imagery**, including background subjects. Hard rule, regional market.
- **Arabic + English are first-class, full RTL** — every visual pass verified EN + AR × light + dark × desktop + mobile.
- **Latin digits in UI.**

## 6 · Known tooling learnings

- **Claude Code stalls or misfires occasionally.** Fallback: Claude (chat) writes files directly via the MCP filesystem tool (`write_file`, full Windows double-backslash paths).
- **`globals.css` edits fail with string replacement** — always full-file rewrites.
- **Design iterations resolve in one comprehensive prompt**, not incremental back-and-forth. Claude acts as design decision-maker rather than seeking approval per detail — but product/business decisions always go to the owner.
- **Satori OG images need pre-broken Arabic lines.** This repo bakes its OG cards via `next/og` (Satori) with bundled Tajawal TTFs in `assets/og/` — the rule carries over directly. OG asset paths are never hardcoded; they're built from `process.cwd()` and read lazily inside the renderer (a module-scope read crashed production once — see commit `f0195d6`).

## 7 · Process rules (Phase 2 learnings — binding)

- **Two-gate approvals.** Screenshot/preview review is gate one; it is NOT a commit-go. A pass is not closed until the owner gives an explicit commit instruction — amendments can and do arrive between the shot review and the commit ruling. Never bundle "shots look right" into "commit now."
- **Pre-build render gates.** Any composition that diverges by breakpoint, and any photo placement (new asset, crop change, scrim over photography), gets a minimal-wiring render set + owner verdict BEFORE the full build (the 2.3a hero precedent: the gate caught an unusable master before a full pass was built on it).
- **Edit-tool only for source edits.** All programmatic repo-file edits go through the harness Edit tool. Shell-regex patches (sed/awk/python -c and equivalents) on repo files are banned — they have corrupted files here before. (`globals.css` is the one file edited by full rewrite instead of targeted replacement.)
- **Diagnose before patching visual defects.** When something "looks wrong," first establish the actual mechanism (measure, bisect, compare computed styles), then propose fixes — the 2.2c.1 CTA-bleed diagnosis showed the obvious culprit (the bleed value) wasn't the cause, and patching it blind would have shipped the wrong fix.
- **Plan approvals open with an unambiguous go.** An approval message leads with the go/no-go; conditions are framed as in-flight requirements ("do X as part of the pass"), never as post-hoc corrections discovered after implementation starts.
- **Harness hygiene.** Screenshot/behavioral harnesses close browsers and servers in try/finally; check for and reuse an existing :3000 server instead of spawning new ones; every completion report ends with a leftover-process line (what's still running and why). History: a runaway harness once accumulated ~900 processes and crashed the machine.

## 8 · How to start a session

1. Paste this briefing.
2. Get PROJECT.md content into context (paste it, or have Claude Code read it first thing).
3. State the goal for the session.
4. Chat Claude proposes the approach and, if implementation is needed, writes the Claude Code prompt in the standard format.
5. Approvals flow: plan → owner approves → implement with manual edit approval → screenshots reviewed → commit on the feature branch → PROJECT.md updated in the same commit.
