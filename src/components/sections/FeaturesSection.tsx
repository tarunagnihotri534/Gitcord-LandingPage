import React from 'react';

interface FeatureItem {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly tags?: readonly string[];
}

const FEATURES: readonly FeatureItem[] = [
  {
    title: 'Offline-first execution',
    category: 'Architecture',
    description: 'Run locally on demand via CLI; no continuous background daemon required for one-off syncs.',
    tags: ['ghdcbot run-once'],
  },
  {
    title: 'Audit-first workflow',
    category: 'Safety',
    description: 'Generates human-readable Markdown and structured JSON audit reports before mutating any roles or issues.',
    tags: ['data/reports/audit.md'],
  },
  {
    title: 'Deterministic planning',
    category: 'Engine',
    description: 'Identical inputs produce identical plans. Planners use pure logic with no random or opaque cloud side-effects.',
    tags: ['src/ghdcbot/engine/planner.py'],
  },
  {
    title: 'Permission-aware IO',
    category: 'Security',
    description: 'Readers degrade safely when permissions are missing. Writes are gated by MutationPolicy and config switches.',
    tags: ['discord.permissions.write: false'],
  },
  {
    title: 'Identity linking',
    category: 'Contributor Flow',
    description: 'Verified linking via ephemeral Discord code placed in GitHub bio or gist. Includes welcome DMs and /unlink.',
    tags: ['/link', '/verify-link', '/unlink'],
  },
  {
    title: 'Profiles and metrics',
    category: 'Contributor Flow',
    description: 'Shows linked GitHub accounts, verification status, and assigned Discord roles. Summary command reports 7d/30d activity.',
    tags: ['/profile', '/summary', '/who-is'],
  },
  {
    title: 'PR and issue tools',
    category: 'Productivity',
    description: 'Query open pull requests, browse open repository issues, assign issues to verified users, and check PR review health.',
    tags: ['/open-prs', '/pr', '/issue', '/pr-status'],
  },
  {
    title: 'Notifications and channel routing',
    category: 'Integration',
    description: 'Connect repositories to Discord channels or threads directly from Discord without server restarts or YAML edits.',
    tags: ['/pr-channel set', 'remove', 'list'],
  },
  {
    title: 'Role automation',
    category: 'Discord Ops',
    description: 'Assigns Discord roles based on merged PRs in specific repos or contribution scoring thresholds.',
    tags: ['merge_role_rules', 'role_mappings'],
  },
  {
    title: 'Docker and scheduled sync',
    category: 'Deployment',
    description: 'Mentor-friendly container setup with named Docker volume for SQLite data persistence and optional scheduler container.',
    tags: ['docker compose --profile scheduler'],
  },
] as const;

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 border-b border-gitcord-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-gitcord-muted mb-2 font-medium">
            Engine Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gitcord-heading mb-3">
            Core features from the repository
          </h2>
          <p className="text-base text-gitcord-muted leading-relaxed">
            Every feature listed below is verified against the upstream documentation and implemented in the current codebase.
          </p>
        </div>

        {/* Two-Column Clean Reference Grid */}
        <div className="rounded-lg border border-gitcord-border bg-gitcord-surface overflow-hidden shadow-clean-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gitcord-border">
            {/* Left Column (Items 0-4) */}
            <div className="divide-y divide-gitcord-border">
              {FEATURES.slice(0, 5).map((f) => (
                <div key={f.title} className="p-5 space-y-2 hover:bg-gitcord-surface-elev transition-colors duration-150">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gitcord-heading tracking-tight">{f.title}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border text-gitcord-muted font-medium">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-xs text-gitcord-muted leading-relaxed">
                    {f.description}
                  </p>
                  {f.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {f.tags.map((tag) => (
                        <code key={tag} className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-gitcord-dark border border-gitcord-border text-gitcord-text">
                          {tag}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column (Items 5-9) */}
            <div className="divide-y divide-gitcord-border">
              {FEATURES.slice(5).map((f) => (
                <div key={f.title} className="p-5 space-y-2 hover:bg-gitcord-surface-elev transition-colors duration-150">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gitcord-heading tracking-tight">{f.title}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border text-gitcord-muted font-medium">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-xs text-gitcord-muted leading-relaxed">
                    {f.description}
                  </p>
                  {f.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {f.tags.map((tag) => (
                        <code key={tag} className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-gitcord-dark border border-gitcord-border text-gitcord-text">
                          {tag}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
