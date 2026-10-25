import React from 'react';
import { ArrowRight, ExternalLink, GitPullRequest, Shield, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brand';
import { GithubIcon, DiscordIcon } from '../common/Icons';
import { useSmoothScroll } from '../../context/useSmoothScroll';

export const Hero: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="hero" className="pt-24 pb-16 border-b border-gitcord-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Left-Aligned Factual Text */}
          <div className="lg:col-span-7 space-y-6">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <a
                href={BRAND_CONFIG.urls.aossieWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gitcord-surface border border-gitcord-border text-gitcord-text font-medium hover:border-gitcord-muted hover:text-white transition-colors"
                title="AOSSIE — Australian Open Source Software Innovation and Education"
              >
                <img
                  src={`${import.meta.env.BASE_URL}AOSSIE%20Logo.png`}
                  alt="AOSSIE Logo"
                  className="h-5 w-5 object-contain"
                  width={20}
                  height={20}
                />
                <span>{BRAND_CONFIG.org}</span>
              </a>
              <span className="text-gitcord-muted">•</span>
              <span className="text-gitcord-muted">Discord ↔ GitHub Automation Engine</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Deterministic automation for open-source communities.
            </h1>

            {/* Subline: Plain and specific */}
            <p className="text-base sm:text-lg text-gitcord-muted leading-relaxed max-w-xl">
              Gitcord reads GitHub activity and Discord state, then plans role changes and issue
              assignments you can review before anything is applied.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#quickstart"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#quickstart', { offset: -70 });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-gitcord-blurple hover:bg-gitcord-blurple-hover transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-gitcord-blurple"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={BRAND_CONFIG.urls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gitcord-text bg-gitcord-surface hover:bg-gitcord-surface-elev border border-gitcord-border hover:border-gitcord-muted transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-gitcord-blurple"
              >
                <GithubIcon className="w-4 h-4" aria-hidden="true" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 text-gitcord-muted" aria-hidden="true" />
              </a>
            </div>

            {/* Factual Specification Checklist from README */}
            <div className="pt-4 border-t border-gitcord-border flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gitcord-muted">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gitcord-green" aria-hidden="true" />
                <span>Python 3.11+</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gitcord-green" aria-hidden="true" />
                <span>SQLite local state</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gitcord-green" aria-hidden="true" />
                <span>Audit-first Markdown reports</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gitcord-blurple" aria-hidden="true" />
                <span>GNU GPL-3.0</span>
              </span>
            </div>
          </div>

          {/* Right Column: Stylized Visual of GitHub <-> Discord Connected by Gitcord (Flat, Accurate Mockup) */}
          <div className="lg:col-span-5">
            <div className="rounded-md border border-gitcord-border bg-gitcord-surface overflow-hidden">
              {/* Mockup Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-gitcord-dark border-b border-gitcord-border text-xs font-mono text-gitcord-muted">
                <span className="text-white font-medium">Gitcord Architecture Preview</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gitcord-surface border border-gitcord-border text-gitcord-muted">
                  Illustrative example
                </span>
              </div>

              <div className="p-4 space-y-3">
                {/* 1. GitHub Event Card */}
                <div className="p-3 rounded border border-gitcord-border bg-gitcord-dark">
                  <div className="flex items-center justify-between text-xs font-mono text-gitcord-muted mb-1.5">
                    <div className="flex items-center gap-1.5 text-gitcord-text font-medium">
                      <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>GitHub Activity</span>
                    </div>
                    <span className="text-[11px] text-gitcord-green">Read-only ingest</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <GitPullRequest className="w-4 h-4 text-gitcord-green shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-0.5">
                      <p className="font-mono text-white text-[11px]">
                        PR #84: Deterministic role sync
                      </p>
                      <p className="text-gitcord-muted text-[11px]">
                        Author: <span className="text-gitcord-text">@contributor</span> • 3 commits merged
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Gitcord Central Bridge */}
                <div className="relative py-1 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gitcord-border" />
                  </div>
                  <div className="relative px-3 py-1 rounded bg-gitcord-surface-elev border border-gitcord-border text-[11px] font-mono text-white flex items-center gap-2">
                    <img src={`${import.meta.env.BASE_URL}GITCORD%20Logo.png`} alt="Gitcord Engine Logomark" className="w-4 h-4 object-contain" width={16} height={16} />
                    <span>Gitcord: Read ➔ Plan ➔ Report</span>
                  </div>
                </div>

                {/* 3. Discord Event Card */}
                <div className="p-3 rounded border border-gitcord-border bg-gitcord-dark">
                  <div className="flex items-center justify-between text-xs font-mono text-gitcord-muted mb-1.5">
                    <div className="flex items-center gap-1.5 text-gitcord-text font-medium">
                      <DiscordIcon className="w-3.5 h-3.5 text-gitcord-blurple" aria-hidden="true" />
                      <span>Discord Server State</span>
                    </div>
                    <span className="text-[11px] text-gitcord-blurple">Role Assignment Plan</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gitcord-muted">Verified Identity:</span>
                      <span className="font-mono text-gitcord-text">contributor</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gitcord-muted">Planned Role:</span>
                      <span className="font-mono text-aossie-gold">+ Contributor Role</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gitcord-border text-[11px] font-mono text-gitcord-muted">
                      Audit log: <span className="text-white">data/reports/audit.md</span> (dry-run review)
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup Footer */}
              <div className="px-3 py-2 bg-gitcord-dark border-t border-gitcord-border text-[11px] font-mono text-gitcord-muted flex items-center justify-between">
                <span>MutationPolicy: dry-run default</span>
                <span className="text-gitcord-green font-medium">0 live writes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
