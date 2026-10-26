export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Linking', href: '#linking' },
  { label: 'In Action', href: '#showcase' },
  { label: 'Features', href: '#features' },
  { label: 'Quick Start', href: '#quickstart' },
] as const;

export const BRAND_CONFIG = {
  name: 'Gitcord',
  tagline: 'Discord-GitHub Automation Engine',
  org: 'AOSSIE',
  program: 'GSoC 2026',
  license: 'GNU General Public License v3.0 (GPL-3.0)',
  urls: {
    github: 'https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot',
    discordThread: 'https://discord.com/channels/1022871757289422898/1465995983791063140',
    discordInvite: 'https://discord.gg/hjUhu33uAn',
    installation: 'https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot/blob/main/INSTALLATION.md',
    dockerGuide: 'https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot/blob/main/docs/DOCKER.md',
    contributing: 'https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot/blob/main/CONTRIBUTING.md',
    license: 'https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot/blob/main/LICENSE',
    aossieWebsite: 'https://aossie.org/',
    aossieTwitter: 'https://x.com/aossie_org',
    aossieLinkedIn: 'https://www.linkedin.com/company/aossie/',
    aossieGithub: 'https://github.com/AOSSIE-Org',
    aossieDiscord: 'https://discord.com/invite/hjUhu33uAn',
    aossieYouTube: 'https://www.youtube.com/@AOSSIE-Org',
    aossieEmail: 'mailto:aossie.oss@gmail.com',
    aossieSponsors: 'https://github.com/sponsors/AOSSIE-Org',
  },
} as const;
