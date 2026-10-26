# Gitcord Technical Overview & Documentation Reference

This document provides a plain-language, fact-checked reference for anyone working on the Gitcord marketing landing page or documentation. Every detail here is sourced directly from the upstream repository ([AOSSIE-Org/Gitcord-GithubDiscordBot](https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot)).

---

## 1. What Gitcord Is

Gitcord is a local-first, offline-first automation engine that reads GitHub organization activity and Discord state, then plans role changes and issue assignments in a deterministic, reviewable way.

### Problem Context

Open-source organizations managing community Discord servers often need to assign roles based on verified GitHub contributions (such as merged pull requests or activity scoring) and route PR/issue notifications to dedicated project channels. Traditional bots either require broad, dangerous Discord Administrator permissions or continuous cloud daemons with opaque, non-reviewable mutations.

Gitcord operates locally on demand, runs in a dry-run mode by default, and writes human-readable Markdown and machine-readable JSON audit reports before anything is changed.

_Source: `README.md` (Overview), `TECHNICAL_DOCUMENTATION.md` (Section 1.1 & 1.2)_

---

## 2. Architecture & The Three Strict Boundaries

Gitcord strictly separates ingestion, deterministic calculation, and execution:

```text
Read ➔ Plan ➔ Report ➔ Apply
```

### The Three Boundaries

1. **Readers are Read-Only:**
   Readers ingest GitHub organization events and Discord guild state without mutating anything.
   - GitHub Adapter: `src/ghdcbot/adapters/github/rest.py`
   - Discord Ingestion: `src/ghdcbot/adapters/discord/api.py`
   - Permission-aware: Readers degrade safely if permissions are missing.

2. **Planners are Pure & Deterministic:**
   Planners calculate scoring and role/assignment plans using pure logic. Identical inputs always produce identical plans.
   - Planner Engine: `src/ghdcbot/engine/planner.py`
   - Orchestrator: `src/ghdcbot/engine/orchestrator.py`

3. **Writers are Thin Executors Gated by MutationPolicy:**
   Writers never execute calculations. They only apply mutations when explicitly enabled by configuration and verified permissions.
   - Policy Enforcement: `src/ghdcbot/engine/policy.py` (`MutationPolicy`)
   - CLI Entrypoint: `src/ghdcbot/cli.py`
   - Discord Bot Entrypoint: `src/ghdcbot/bot.py`

_Source: `README.md` (Architecture Diagram), `TECHNICAL_DOCUMENTATION.md` (Sections 1.2, 2.1, 2.2)_

---

## 3. Data Storage & Local State

Gitcord uses a local-first SQLite database stored under `<data_dir>/gitcord.db`. It does not require an external database server.

### SQLite Schema (`src/ghdcbot/adapters/storage/sqlite.py`)

- `identity_links`: Maps Discord user IDs to verified GitHub logins, including verification timestamps and status.
- `contributions`: Normalized GitHub events (commits, PRs, reviews, issues).
- `scores`: Calculated scoring metrics used for score-based role assignments.
- `cursors`: Ingest cursors tracking the latest ingested GitHub event timestamp per repository to avoid duplicate processing.
- `notifications_sent`: Deduplication history of PR/issue alerts delivered to Discord channels or DMs.
- `issue_requests`: Assignment requests and mappings between Discord members and GitHub issues.

### Audit Reports

Every `run-once` execution generates reviewable audit artifacts in `<data_dir>/reports/`:

- `audit.md`: Human-readable Markdown summary detailing planned role additions, role removals, and assignments.
- `audit.json`: Structured machine-readable plan.

_Source: `TECHNICAL_DOCUMENTATION.md` (Section 3.1 & 4.7), `INSTALLATION.md` (Step 7.1)_

---

## 4. Runtime Modes & Write Gates

Gitcord supports three execution modes:

1. **`dry-run` (Default):**
   Validates GitHub and Discord access, ingests activity, and writes `audit.md` and `audit.json`. No roles or issues are modified in Discord or GitHub.
2. **`observer`:**
   Operates strictly read-only without write credentials, producing audit reports for reviewers.
3. **`active`:**
   Executes live mutations (assigning/removing Discord roles and GitHub issue assignments).

### Configuration Keys Required for Live Mutations

To enable live role modifications in Discord, all three settings must be explicitly configured in `config/config.yaml`:

```yaml
runtime:
  mode: 'active'
  enable_discord_role_updates: true
discord:
  permissions:
    write: true
```

For GitHub issue assignments:

```yaml
github:
  permissions:
    write: true
```

_Source: `README.md` (Enable Active Mode), `TECHNICAL_DOCUMENTATION.md` (Section 1.4 & 5.2), `INSTALLATION.md` (Step 8)_

---

## 5. Identity Linking Flow

Before Gitcord can assign roles or calculate individual contributor summaries, members link their accounts:

1. **Initiate (`/link`):**
   The user runs `/link github_username:<login>` in Discord. Gitcord generates a short-lived random verification code and replies with an ephemeral message containing the code and a "Verify" button.
2. **Prove Ownership:**
   The contributor places the code into their public GitHub profile bio or creates a public GitHub gist containing the code.
3. **Confirm (`/verify-link`):**
   The user clicks the "Verify" button or runs `/verify-link github_username:<login>`. Gitcord queries the GitHub API, matches the code, records the verified link in SQLite, and confirms the link. The user may then remove the code from their bio or gist.
4. **Join Welcome DM (Optional):**
   When `discord.welcome_dm_on_join: true` is configured, new server members automatically receive a direct message with a "Start linking" button opening a modal with a username input field.
5. **Auxiliary Linking Commands:**
   - `/help-link @member`: Any member can invoke this to send linking instructions to a tagged peer.
   - `/who-is <github_username>`: Looks up a GitHub username to find the verified Discord account and report link freshness.
   - `/unlink`: Clears the verified link from SQLite.
   - `/connect-social` & `/disconnect-social`: Attach or detach an X or LinkedIn profile URL.

_Source: `QUICK_START_GUIDE.txt` (Section 1), `README.md` (Identity Linking), `INSTALLATION.md` (Step 7.2)_

---

## 6. Complete Slash Command Reference

### Identity Management

- `/link github_username:<login>` — Link your Discord account to GitHub (creates a verification code). _Available to all server members._
- `/verify-link github_username:<login>` — Verify your GitHub link after adding the code to bio/gist. _Available to all server members._
- `/help-link @member` — Help a tagged Discord member start the linking flow. _Available to all server members._
- `/profile [member]` — Show contributor profile (GitHub account, verification status, connected socials, Discord roles). _Available to all server members._
- `/who-is <github_username>` — Look up a GitHub username to find their verified Discord account and check link freshness. _Available to all server members._
- `/unlink` — Remove your linked GitHub identity from SQLite. _Available to all server members._
- `/connect-social <username_or_url>` — Connect an X or LinkedIn profile. _Available to all server members._
- `/disconnect-social` — Remove social links from your profile. _Available to all server members._

### Contribution & Metrics

- `/summary [member]` — Show contribution metrics for the last 7 and 30 days. _Available to all server members._
- `/open-prs` — List a contributor's currently open pull requests across configured repositories. _Available to all server members._
- `/pr <count> [skip]` — List a contributor's recent PRs grouped by closed / merged / open. _Available to all server members._
- `/issue [repo] [limit]` — List recent open issues in the project channel or specified repository (excluding PRs). _Available to all server members._
- `/create-issue <title> <body> [repo]` — Create a GitHub issue directly from Discord (requires verified link and `github.permissions.write: true`). _Available to verified members._
- `/assign-issue <issue_url> @user1 [@user2] [@user3]` — Assign a GitHub issue to up to 3 verified Discord users (requires permissions configured via `discord.command_permissions.assign-issue`).
- `/pr-status [repo]` — Interactive dashboard showing PR health (CI check runs, CodeRabbit review threads, merge conflicts, approvals) via menu options. _Available to all members by default; 5-second cooldown per user._

### Sync (Mentor-Only)

- `/sync` — Manually trigger GitHub event ingestion and notification dispatch. _Requires a role configured in `discord.command_permissions.sync`._
- `/pr-channel set|remove|list [repo] [#channel]` — Connect or disconnect a repository to a Discord channel or thread for new PR and issue notifications directly from Discord. _Requires mentor permissions._

_Source: `README.md` (Discord Bot Commands), `QUICK_START_GUIDE.txt` (Sections 2 & 3)_

---

## 7. Notifications & Scheduling

- **Channel Routing:** Mentors map repositories to channels using `/pr-channel set repo:owner/name channel:#channel`. Only PRs and issues opened after routing is established are posted.
- **Passive Link Previews:** When enabled, Gitcord detects GitHub PR URLs pasted into configured channels and automatically posts preview embeds.
- **Scheduled Sync:** When running with `--profile scheduler`, a sync container executes periodically (every 6 hours by default; customizable via `GITCORD_SYNC_INTERVAL_SECONDS`).

_Source: `README.md` (Sync & Scheduled Sync), `docs/DOCKER.md` (Section: Connect repos to channels)_

---

## 8. Role Automation & Security Hierarchy

Gitcord assigns Discord roles through two rule models configured in `config.yaml`:

1. **Merge-Based Roles (`merge_role_rules`):** Grants server roles when a contributor has a pull request merged into a specific repository.
2. **Activity-Based Roles (`role_mappings`):** Grants server roles based on activity scoring thresholds.

### Role Hierarchy Rule

Discord's permission architecture requires that the bot's highest assigned role in **Server Settings ➔ Roles** sits strictly **above** any roles it is expected to assign or manage.

### The Administrator Prohibition

Gitcord's documentation repeatedly warns: **Never grant the bot Discord Administrator permission.** Gitcord requires only fine-grained, minimal permissions.

_Source: `INSTALLATION.md` (Step 3.3 & Step 8), `README.md` (Enable Active Mode)_

---

## 9. Deployment Pathways

### 1. Docker Compose (Recommended for Mentors)

```bash
git clone https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot.git
cd Gitcord-GithubDiscordBot
cp .env.example .env
cp config/docker-example.yaml config/config.yaml
docker compose up -d
```

State persists in the named Docker volume `gitcord_data`. A one-off dry-run sync is executed with:

```bash
docker compose run --rm bot --config /app/config/config.yaml run-once
```

### 2. Always-On Linux VPS

Runs the bot and scheduled sync background container:

```bash
docker compose run --rm bot --config /app/config/config.yaml validate
docker compose --profile scheduler up -d --build
```

### 3. Local Python Install

Requires Python 3.11+:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
ghdcbot --config config/config.yaml run-once
ghdcbot --config config/config.yaml bot
```

### Environment Variables

- `GITHUB_TOKEN` — Fine-grained GitHub Personal Access Token.
- `DISCORD_TOKEN` — Discord Bot Token.
- `GITCORD_SYNC_INTERVAL_SECONDS` — Optional scheduler interval (default: 21600 seconds / 6 hours).

_Source: `README.md` (Getting Started), `docs/DOCKER.md`, `INSTALLATION.md` (Steps 4–7)_

---

## 10. Required Permissions & Scopes (With Source Discrepancy Note)

### GitHub Token Scope Documentation Discrepancy

There is a minor discrepancy between `README.md` and `INSTALLATION.md` regarding the `Contents` permission:

- **`README.md` (Quick Setup Overview Step 1):** Lists `Contents (Read & Write)`, `Issues (Read & Write)`, and `Pull requests (Read & Write)`.
- **`INSTALLATION.md` (Section 1.3):** Lists `Contents` as **`Read`** only (explaining it is needed for repo metadata and remote `.github/gitcord.yaml`), while `Issues` and `Pull requests` require `Read & Write` for active mode assignments.
- _Best practice noted in INSTALLATION.md:_ Start dry-run with Read-only on Contents, Issues, and PRs; only enable Write on Issues/PRs before active mode.

### Discord Permissions & Intents

- **OAuth2 Scopes:** `bot`, `applications.commands`.
- **Bot Permissions:** `Manage Roles`, `View Channels`, `Send Messages`, `Embed Links`, `Read Message History`.
- **Privileged Gateway Intents:** **Server Members Intent** (required in Developer Portal for reading guild members and welcome DMs).

_Source: `README.md` (Quick Setup), `INSTALLATION.md` (Steps 1.3, 2.4, 3.2, 3.3)_

---

## 11. Glossary & "Facts We Must NOT Claim on the Site"

### Technical Glossary

- **Dry-Run:** Execution mode where all read and planning logic runs, generating audit reports without issuing write API calls.
- **MutationPolicy:** Code policy boundary that rejects write operations unless the active mode flag is confirmed.
- **Cursor:** Ingestion timestamp tracker in SQLite ensuring GitHub events are not re-processed.

### Facts Stated in the Repo Docs NOT to Exist

These items are explicitly documented as absent or not applicable:

1. **Screenshots / GUI:** Explicitly stated in `README.md`: _"📱 App Screenshots: Not applicable (CLI automation engine)."_
2. **GitHub Snapshots Persistence:** Explicitly documented as removed in `TECHNICAL_DOCUMENTATION.md` Section 3.2: _"3.2 GitHub Snapshots (removed)"_.
3. **Inbound Web Traffic / Open Ports:** Explicitly stated in `README.md`: _"Gitcord does not accept inbound web traffic, so the VM only needs outbound HTTPS access plus SSH for administration."_
4. **Fly.io One-Command Deploy:** Explicitly noted in `README.md`: _"The repository is not currently a one-command Fly deployment... Use a Linux VPS for the supported copy-and-run path."_
5. **Discord Administrator Rights:** Explicitly forbidden in `INSTALLATION.md`: _"Not needed: Administrator, Manage Server, Kick/Ban Members, Manage Channels, Voice permissions."_

### Facts NOT Mentioned Anywhere in the Documentation

These features must NEVER be claimed on the landing page:

1. **No Web Dashboard or SaaS Portal:** Gitcord has no web dashboard. It is controlled via the CLI and Discord slash commands.
2. **No Public Leaderboards:** There are no competitive user rank tables or gamified point systems mentioned.
3. **No Fabricated Metrics:** There are no user counts, server counts, or star statistics mentioned in the documentation.
4. **No Automated Moderation:** Gitcord does not ban, kick, or timeout Discord members.

_Source: `README.md`, `TECHNICAL_DOCUMENTATION.md`, `INSTALLATION.md`_
