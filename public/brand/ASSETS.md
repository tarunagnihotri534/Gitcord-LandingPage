# Gitcord & AOSSIE Brand Assets Catalog

This catalog documents the official brand assets, logos, and logomarks imported from the upstream repository ([AOSSIE-Org/Gitcord-GithubDiscordBot](https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot)).

---

## Ownership & Licensing Notice

> **Important:** The logos, logomarks, and brand graphics in this directory are the proprietary intellectual property of **AOSSIE** and the **Gitcord project**.  
> **These brand assets are NOT covered by this repository's software license (GPL-3.0)** and remain under their respective owners' terms and guidelines.  
> You must request permission from the AOSSIE and Gitcord maintainers before using these marks for external, public, or commercial distribution.

---

## Brand Usage Rules (Quoted from `brand/Brand.md`)

From the upstream repository specification:

- Prefer SVG for web and docs; use PNG icons for Discord/GitHub portals (size requirements).
- Keep aspect ratio; do not stretch.
- On dark UIs, prefer the primary SVG or dark GitHub App asset.
- Do not place the mark on busy photos without a solid backing plate.
- Tone: clear, trustworthy, mentor-friendly — open-source tooling, not consumer social.

---

## Asset Inventory

### 1. AOSSIE Brand Assets (`public/brand/aossie/` & `public/`)

| File Name         | Description                                                            | Original Repo / Source Path                      | Format / Size                   | Landing Page Location                                                                   |
| :---------------- | :--------------------------------------------------------------------- | :----------------------------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------- |
| `AOSSIE Logo.png` | Official AOSSIE master emblem (Australia map + binary 01 + typography) | Provided Master Asset (`public/AOSSIE Logo.png`) | PNG 2612x1632 (5,951,919 bytes) | Navbar parent org badge, Hero supertitle tag, Footer organization card & Community link |
| `aossie-logo.svg` | Official AOSSIE organization emblem (vector)                           | `public/aossie-logo.svg`                         | SVG (218,602 bytes)             | Vector archive & Brand docs                                                             |
| `aossie-logo.png` | Official AOSSIE organization emblem (raster)                           | `public/aossie-logo.png`                         | PNG (124,837 bytes)             | High-resolution print/raster fallback                                                   |

### 2. Gitcord Brand Assets (`public/brand/gitcord/` & `public/`)

| File Name                             | Description                                                                  | Original Repo / Source Path                                                  | Format / Size                   | Landing Page Location                                                                                             |
| :------------------------------------ | :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| `GITCORD Logo.png`                    | Official Gitcord master mascot logomark (Discord + GitHub dual-color emblem) | Provided Master Asset (`public/GITCORD Logo.png`)                            | PNG 2612x1632 (5,590,809 bytes) | Navbar brand mark, Hero bridge mark, LinkingSection Discord bot avatar, Footer header, and browser high-res icons |
| `gitcord.svg`                         | Canonical primary Gitcord logo (Discord + GitHub fusion)                     | `public/gitcord.svg` & `brand/logo.svg`                                      | SVG (793,428 bytes)             | Primary vector archive                                                                                            |
| `gitcord.png`                         | Canonical primary Gitcord logo (raster)                                      | `public/gitcord.png`                                                         | PNG (594,883 bytes)             | High-res fallback asset                                                                                           |
| `favicon.svg`                         | Official Gitcord browser tab icon / pure vector logomark                     | `brand/favicon.svg`                                                          | SVG (305 bytes)                 | Browser favicon vector fallback                                                                                   |
| `gitcord-discord-icon-large.png`      | Official Discord App / Bot icon (1024x1024)                                  | `public/gitcord-discord-icon-large.png` & `brand/icons/discord-app-icon.png` | PNG (466,094 bytes)             | Discord Bot reference                                                                                             |
| `gitcord-github-app-logo.png`         | Official GitHub App icon                                                     | `public/gitcord-github-app-logo.png` & `brand/icons/github-app-icon.png`     | PNG (778,339 bytes)             | GitHub App reference & marketplace link                                                                           |
| `gitcord-github-app-logo-dark.png`    | Official GitHub App icon (dark background variant)                           | `public/gitcord-github-app-logo-dark.png`                                    | PNG (672,663 bytes)             | Dark UI integration reference                                                                                     |
| `gitcord-github-app-logo-preview.png` | GitHub App logo preview card                                                 | `public/gitcord-github-app-logo-preview.png`                                 | PNG (560,592 bytes)             | Marketplace preview reference                                                                                     |
| `gitcord-white-bg.png`                | Gitcord logo on solid white background plate                                 | `public/gitcord-white-bg.png` & `brand/icons/logo-white-bg.png`              | PNG (358,129 bytes)             | Light mode reference / slides                                                                                     |

### 3. Open Graph & Social Sharing (`public/brand/`)

| File Name        | Description                          | Dimensions    | Size          | Landing Page Location                   |
| :--------------- | :----------------------------------- | :------------ | :------------ | :-------------------------------------- |
| `gitcord-og.png` | High-contrast Open Graph social card | 1200 x 630 px | 102,893 bytes | `og:image` and `twitter:image` metadata |

---

## Performance & Optimization Matrix

To maintain high Lighthouse scores and avoid payload bloat on mobile connections, the original files are preserved untouched in `public/brand/`, while lightweight pure-vector copies are used for UI rendering:

| Asset                | Original File & Size                                     | Optimized File & Size                                       | Optimization Method                                | Size Reduction   |
| :------------------- | :------------------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------------- | :--------------- |
| **Gitcord Logomark** | `public/brand/gitcord/gitcord.svg`<br/>**793,428 bytes** | `public/brand/optimized/gitcord-mark.svg`<br/>**305 bytes** | Pure SVG geometric primitives (no embedded raster) | **99.96%**       |
| **Favicon**          | `brand/favicon.svg`<br/>**305 bytes**                    | `public/brand/gitcord/favicon.svg`<br/>**305 bytes**        | Verified clean vector SVG                          | **0% (optimal)** |
| **Open Graph Card**  | `public/brand/gitcord/gitcord.png`<br/>**594,883 bytes** | `public/brand/gitcord-og.png`<br/>**102,893 bytes**         | Tailored 1200x630 card with compressed palette     | **82.70%**       |
