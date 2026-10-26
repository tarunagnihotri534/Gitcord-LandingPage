import React, { useState } from 'react';
import { Check, Sparkles, Terminal, Bell, Hash, Maximize2, X } from 'lucide-react';
import { DiscordIcon } from '../common/Icons';

interface ShowcaseItem {
  readonly id: string;
  readonly badge: string;
  readonly category: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly command?: string;
  readonly icon: React.FC<{ className?: string }>;
  readonly highlights: readonly string[];
  readonly technicalDetail: string;
}

const SHOWCASE_ITEMS: readonly ShowcaseItem[] = [
  {
    id: 'slash-linking',
    badge: '01 · Onboarding & Auth',
    category: 'Slash Command Integration',
    title: 'Interactive /link Command in Discord',
    subtitle: 'Zero-friction account linking right from your server',
    description:
      'Contributors link their GitHub identity directly within Discord using the native /link slash command. Gitcord immediately displays autocomplete parameters and issues a private, ephemeral verification challenge without requiring third-party OAuth access or passwords.',
    imageSrc: `${import.meta.env.BASE_URL}screenshots/link-command.png`,
    imageAlt: 'Discord slash command /link autocomplete dropdown showing Gitcord integration',
    imageWidth: 1126,
    imageHeight: 792,
    command: '/link github_username:<username>',
    icon: Terminal,
    highlights: [
      'Native Discord slash command autocomplete',
      'Zero OAuth token or password permissions needed',
      'Ephemeral verification challenge delivered privately',
      'Instant bi-directional binding stored in SQLite',
    ],
    technicalDetail:
      'Gitcord generates a time-bounded cryptographically random code (e.g., gitcord-verify-xxxx) which the user pastes into their GitHub bio or a public gist. The bot then verifies ownership via GitHub REST API before creating an immutable mapping.',
  },
  {
    id: 'identity-feed',
    badge: '02 · Community Feeds & Tagging',
    title: 'Dual-Identity Resolution & Activity Feeds',
    category: 'Automated Channel Feeds',
    subtitle: 'GitHub activity streamed into Discord with automatic handle resolution',
    description:
      'When an issue, pull request, or review is submitted on GitHub, Gitcord posts an enriched embed directly to configured Discord channels. It automatically cross-references the GitHub author with their verified Discord account and pings their Discord handle (@mention) directly in the embed.',
    imageSrc: `${import.meta.env.BASE_URL}screenshots/activity-feed.png`,
    imageAlt:
      'Discord channel embed of GitHub Issue 167 showing automatic contributor Discord mention',
    imageWidth: 889,
    imageHeight: 285,
    command: 'Issue #167: Created by @tarunagnihotri534 (@TARUN AGNIHO3III)',
    icon: Hash,
    highlights: [
      'Resolves GitHub login to Discord @mention in real time',
      'Displays issue status, timestamps, and real-time labels (e.g. bug)',
      'Rich Discord color-coded embed with direct GitHub issue link',
      'Configurable channel routing via /pr-channel commands',
    ],
    technicalDetail:
      'The engine catches incoming webhook / sync events, queries the local SQLite account registry for the author, and resolves their Discord Snowflake ID so the community receives an actionable, clickable @mention instead of a disconnected username.',
  },
  {
    id: 'issue-assignment',
    badge: '03 · Task Alerts & Mentions',
    title: 'Direct Issue Assignment Notifications',
    category: 'Personal Task Alerts',
    subtitle: 'Instant Discord notifications when issues are assigned to you',
    description:
      'Never miss an assigned task in repository notifications or email spam. The moment a maintainer assigns an issue to a contributor on GitHub, Gitcord dispatches a dedicated notification in Discord highlighting the issue title, repository, assigning maintainer, and direct issue URL.',
    imageSrc: `${import.meta.env.BASE_URL}screenshots/issue-assignment.png`,
    imageAlt:
      'Gitcord Discord notification for Issue Assigned to You with repository details and link',
    imageWidth: 974,
    imageHeight: 399,
    command: '📌 Issue Assigned to You! #122 - [FEATURE]',
    icon: Bell,
    highlights: [
      'Instant real-time push notification upon assignment',
      'Displays assigning maintainer attribution (e.g. shubham5080)',
      'Direct one-click link to the GitHub issue thread',
      'Eliminates missed assignments lost in email inboxes',
    ],
    technicalDetail:
      'Listens for GitHub issues.assigned events. If the assignee has verified their Discord account, Gitcord triggers a high-priority Discord alert with complete repository and issue metadata, keeping contributors accountable and engaged.',
  },
] as const;

export const ShowcaseSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ShowcaseItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredItems =
    filterCategory === 'all'
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.id === filterCategory);

  return (
    <section
      id="showcase"
      className="py-20 border-b border-gitcord-border bg-gitcord-dark/40"
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-gitcord-surface border border-gitcord-border text-gitcord-muted text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gitcord-blurple" aria-hidden="true" />
            <span>LIVE IN ACTION</span>
          </div>
          <h2
            id="showcase-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-gitcord-heading mb-3"
          >
            Real-world Discord &amp; GitHub workflows
          </h2>
          <p className="text-base text-gitcord-muted leading-relaxed">
            See how Gitcord operates inside live Discord servers. From zero-OAuth slash command
            linking to real-time issue assignments and cross-platform @mentions.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                filterCategory === 'all'
                  ? 'bg-gitcord-blurple text-white border-gitcord-blurple'
                  : 'bg-gitcord-surface text-gitcord-muted border-gitcord-border hover:text-gitcord-heading'
              }`}
            >
              All Functionalities (3)
            </button>
            {SHOWCASE_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilterCategory(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                  filterCategory === item.id
                    ? 'bg-gitcord-blurple text-white border-gitcord-blurple'
                    : 'bg-gitcord-surface text-gitcord-muted border-gitcord-border hover:text-gitcord-heading'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Showcase Feature Rows */}
        <div className="space-y-16">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 1;

            return (
              <article
                key={item.id}
                className="rounded-xl border border-gitcord-border bg-gitcord-surface overflow-hidden shadow-clean-sm hover:border-gitcord-muted/40 transition-all duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Screenshot Visual Column */}
                  <div
                    className={`p-4 sm:p-6 lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="rounded-lg border border-gitcord-border bg-[#18191c] overflow-hidden shadow-md group relative">
                      {/* Discord Mock Window Titlebar */}
                      <div className="flex items-center justify-between px-3 py-2 bg-[#202225] border-b border-gitcord-border/50 text-[11px] font-mono text-zinc-400">
                        <div className="flex items-center gap-2">
                          <DiscordIcon className="w-3.5 h-3.5 text-gitcord-blurple" />
                          <span className="text-zinc-300 font-sans font-medium text-xs">
                            Discord App Feed
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                            Live Screenshot
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedImage(item)}
                            className="p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                            aria-label={`Enlarge ${item.title} screenshot`}
                            title="Click to view full screenshot"
                          >
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Actual Screenshot */}
                      <div
                        className="cursor-pointer overflow-hidden bg-[#2f3136] flex items-center justify-center p-2 sm:p-4"
                        onClick={() => setSelectedImage(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedImage(item);
                          }
                        }}
                        aria-label={`Expand ${item.title}`}
                      >
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          width={item.imageWidth}
                          height={item.imageHeight}
                          loading="eager"
                          className="w-full h-auto max-h-[380px] object-contain rounded transition-transform duration-200 group-hover:scale-[1.01]"
                        />
                      </div>

                      {/* Click overlay hint */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm text-white text-[11px] px-2 py-1 rounded flex items-center gap-1.5 pointer-events-none">
                        <Maximize2 className="w-3 h-3" />
                        <span>Click to enlarge</span>
                      </div>
                    </div>
                  </div>

                  {/* Content & Explanation Column */}
                  <div
                    className={`p-6 sm:p-8 lg:col-span-5 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    {/* Badge & Category */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border text-gitcord-blurple font-medium">
                        {item.badge}
                      </span>
                      <span className="text-xs text-gitcord-muted flex items-center gap-1 font-medium">
                        <Icon className="w-3.5 h-3.5 text-gitcord-muted" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gitcord-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gitcord-text font-medium">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Main Explanation */}
                    <p className="text-xs sm:text-sm text-gitcord-muted leading-relaxed">
                      {item.description}
                    </p>

                    {/* Command or Code Snippet */}
                    {item.command && (
                      <div className="p-2.5 rounded bg-gitcord-dark border border-gitcord-border font-mono text-[11px] text-gitcord-text flex items-center gap-2 overflow-x-auto">
                        <Terminal className="w-3.5 h-3.5 text-gitcord-muted shrink-0" />
                        <span className="truncate">{item.command}</span>
                      </div>
                    )}

                    {/* Bullet Highlights */}
                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gitcord-heading">
                        Key Capabilities:
                      </p>
                      <ul className="space-y-1.5 text-xs text-gitcord-muted">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-gitcord-green shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Under-the-Hood note */}
                    <div className="pt-2 border-t border-gitcord-border/60 text-[11px] text-gitcord-muted leading-normal">
                      <span className="font-semibold text-gitcord-text">Under the hood: </span>
                      {item.technicalDetail}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <div
            className="relative max-w-4xl w-full bg-gitcord-surface border border-gitcord-border rounded-xl overflow-hidden shadow-2xl space-y-3 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gitcord-border">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border text-gitcord-blurple font-medium">
                  {selectedImage.badge}
                </span>
                <h4 className="text-sm sm:text-base font-semibold text-gitcord-heading truncate">
                  {selectedImage.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-md bg-gitcord-surface-elev border border-gitcord-border hover:text-gitcord-heading text-gitcord-muted transition-colors cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-res Image Container */}
            <div className="rounded-lg overflow-hidden bg-[#202225] border border-gitcord-border p-2 sm:p-4 flex items-center justify-center">
              <img
                src={selectedImage.imageSrc}
                alt={selectedImage.imageAlt}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded"
              />
            </div>

            {/* Modal Caption */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gitcord-muted pt-1">
              <p>{selectedImage.subtitle}</p>
              <div className="flex items-center gap-2 text-gitcord-heading">
                <Check className="w-3.5 h-3.5 text-gitcord-green" />
                <span>Verified against upstream Gitcord bot</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
