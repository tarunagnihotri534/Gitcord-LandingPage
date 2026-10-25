# Gitcord Landing Page — MVP Review Document

This document summarizes the Minimum Viable Product (MVP) prepared for review by the Gitcord project maintainers and AOSSIE mentors.

---

## 1. What Is Included in This MVP

The MVP delivers a complete, cohesive, accessible documentation-style landing page structured in the following order:

1. **Header & Navigation (`Navbar`)**:
   - Compact 56px solid header (`#0D1117`) with 1px border (`#30363D`), no blur.
   - Vector Gitcord logomark, anchor links to active MVP sections, GitHub repository link, and fully accessible mobile navigation drawer (with Escape key listener and body scroll lock).
2. **Hero Section (`Hero`)**:
   - Asymmetrical 7:5 split. Left: left-aligned plain copy, factual metadata tags, specifications checklist (`Python 3.11+`, `SQLite local state`, `Audit-first Markdown reports`, `GPL-3.0`), and action buttons. Right: flat, realistic GitHub ↔ Gitcord ➔ Discord architecture card, labelled `Illustrative example`.
3. **Architecture Section (`PipelineSection`)**:
   - Sequential 4-step pipeline block (**01 Read ➔ 02 Plan ➔ 03 Report ➔ 04 Apply**) with strict technical boundary definitions and a callout highlighting dry-run safety and safe permission degradation.
4. **Identity Verification Walkthrough (`LinkingSection`)**:
   - 4-step contributor guide (steps a–d: `/link`, bio/gist code, `/verify-link`, `/profile`).
   - Desktop: Sticky Discord chat canvas on the left cycling through realistic message states.
   - Mobile (<1024px): Responsive vertical cards with inline preview snippets.
   - Accessibility: Plain-text fallback and instant rendering under `prefers-reduced-motion`.
5. **Features Reference (`FeaturesSection`)**:
   - Clean, two-column documentation table/list covering all 10 verified core features. Zero icon-card grids or startup marketing clichés.
6. **Deployment Guide (`QuickStartSection`)**:
   - Tabbed container comparing `Docker Compose (Recommended)` and `Local Python (3.11+)` with copy-to-clipboard terminal code blocks using verified commands from the repository, plus links to `INSTALLATION.md` and `docs/DOCKER.md`.
7. **Footer (`Footer`)**:
   - Semantic footer with docs links, AOSSIE links, `#gitcord` Discord thread, GPL-3.0 note, and the notice: *"Unofficial preview, pending maintainer review."*

---

## 2. What Is Deliberately Left Out of the MVP

To maintain high code quality and focused scope for initial maintainer feedback, the following sections from the original full proposal were postponed:
- **PR Event Timeline (`#pr-flow`)**: Detailed 6-step lifecycle timeline from PR open to Discord notifications and `/pr-status` check.
- **Searchable Commands Table (`#commands`)**: Complete interactive filterable table of all 18 slash commands.
- **Safety Deep-Dive (`#safety`)**: Dedicated diff comparison and configuration matrix for active mode.

*These sections are tracked as post-MVP additions in `README.md`.*

---

## 3. Fact Sources & Verification Mapping

| Content Element | Upstream Source File | Exact Verification |
| :--- | :--- | :--- |
| **Pipeline Definitions** | `README.md` (Architecture Diagram) | Readers are read-only; Planners are deterministic; Writers are thin executors gated by MutationPolicy. |
| **Audit Reports** | `TECHNICAL_DOCUMENTATION.md` (Section 4.7) | Reports generated in `data/reports/audit.json` and `data/reports/audit.md` before writes. |
| **Ephemeral Reply & Verify Button** | `QUICK_START_GUIDE.txt` (Line 16) | *"Bot replies (ephemeral) with a short verification code and a Verify button"*. |
| **Linking Parameters** | `QUICK_START_GUIDE.txt` (Lines 14 & 18) | `/link github_username:<login>` and `/verify-link github_username:<login>`. |
| **`/profile` Scope** | `README.md` (Line 296) | Shows GitHub identity, verification status, connected socials, and Discord roles (7d/30d metrics belong to `/summary`). |
| **Docker Quick Start** | `docs/DOCKER.md` (Quick Start) | `docker compose up -d`, `docker compose logs -f bot`, `docker compose run --rm bot ... run-once`. |
| **Scheduler Interval** | `README.md` (Linux VPS) | Runs every 6 hours by default; customized via `GITCORD_SYNC_INTERVAL_SECONDS`. |
| **Brand Tokens** | `brand/Brand.md` | Blurple (`#5865F2`), Dark (`#0D1117`), Green (`#238636`), Surface (`#161B22`), Border (`#30363D`), Muted (`#8B949E`). |
| **Administrator Warning** | `INSTALLATION.md` (Step 3.3 & Security) | *"Never use Administrator permission. Not needed: Administrator, Manage Server, Kick/Ban, Manage Channels."* |

---

## 4. Unverified Items

1. **GitHub PAT `Contents` Scope Discrepancy**:
   - `README.md` lists `Contents (Read & Write)` under Quick Setup.
   - `INSTALLATION.md` Section 1.3 lists `Contents (Read)` (explaining Write is only needed on Issues/PRs).
   - *Status:* Both perspectives are documented in `docs/GITCORD_OVERVIEW.md` until maintainers clarify.
2. **Stability Nexus Partner Integration**:
   - The upstream repository contains `public/stability.svg` and references Stability Nexus bot stacks in `QUICK_START_GUIDE.txt`.
   - *Status:* Preserved in brand assets, but not featured on the MVP landing page to focus on the core AOSSIE project.

---

## 5. Questions for Maintainers

1. **Brand Asset Distribution**: Does AOSSIE approve the public web hosting of the official Gitcord logomark and AOSSIE vector emblem on the landing page domain?
2. **Deployment Target**: Which hosting provider is preferred for the production deployment (GitHub Pages under the `AOSSIE-Org` organization, Cloudflare Pages, Vercel, or Netlify)?
3. **Repository License**: Does the team confirm licensing this landing page repository under GNU General Public License v3.0 (GPL-3.0) to match the upstream bot engine?
4. **Scope Expansion**: Should post-MVP sections (PR timeline, searchable commands reference table) be added immediately following initial approval?
