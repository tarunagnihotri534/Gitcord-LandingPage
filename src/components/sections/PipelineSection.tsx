import React from 'react';
import { ArrowRight, ShieldAlert, Check } from 'lucide-react';

interface PipelineStep {
  readonly num: string;
  readonly name: string;
  readonly summary: string;
  readonly boundary: string;
  readonly codeNote?: string;
}

const PIPELINE_STEPS: readonly PipelineStep[] = [
  {
    num: '01',
    name: 'Read',
    summary: 'Readers are read-only (GitHub activity and Discord state).',
    boundary: 'Read-only boundary',
  },
  {
    num: '02',
    name: 'Plan',
    summary: 'Planners are deterministic, the same input gives the same plan.',
    boundary: 'Pure calculation',
  },
  {
    num: '03',
    name: 'Report',
    summary:
      'The plan is written as JSON and Markdown audit reports (data/reports/audit.md) for review.',
    boundary: 'Reviewable artifact',
    codeNote: 'data/reports/audit.md',
  },
  {
    num: '04',
    name: 'Apply',
    summary:
      'Writers are thin executors gated by MutationPolicy. Role updates need runtime.mode "active", runtime.enable_discord_role_updates true and discord.permissions.write true.',
    boundary: 'Gated mutation',
  },
] as const;

export const PipelineSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 border-b border-gitcord-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-gitcord-muted mb-2">
            Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Deterministic 4-step pipeline
          </h2>
          <p className="text-base text-gitcord-muted leading-relaxed">
            Gitcord separates ingestion, deterministic scoring, and execution into strict
            boundaries:
          </p>
        </div>

        {/* 4-Step Sequential Pipeline Block */}
        <div className="rounded-md border border-gitcord-border bg-gitcord-surface overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gitcord-border">
            {PIPELINE_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:bg-gitcord-surface-elev transition-colors duration-150"
              >
                <div>
                  {/* Step Number + Title */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold text-gitcord-blurple px-1.5 py-0.5 rounded bg-gitcord-dark border border-gitcord-border">
                      {step.num}
                    </span>
                    {idx < PIPELINE_STEPS.length - 1 && (
                      <ArrowRight
                        className="hidden md:block w-3.5 h-3.5 text-gitcord-muted"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                    {step.name}
                  </h3>
                  <p className="text-xs text-gitcord-muted leading-relaxed font-sans">
                    {step.summary}
                  </p>
                </div>

                {/* Boundary Tag */}
                <div className="pt-3 border-t border-gitcord-border">
                  <span className="text-[11px] font-mono text-gitcord-text flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-gitcord-green shrink-0" aria-hidden="true" />
                    <span>{step.boundary}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Callout Notice from README */}
        <div className="mt-6 p-4 rounded-md border border-gitcord-border bg-gitcord-surface flex items-start gap-3 text-xs">
          <ShieldAlert className="w-4 h-4 text-aossie-gold shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-0.5">
            <p className="font-medium text-white">Execution boundary policy</p>
            <p className="text-gitcord-muted leading-relaxed">
              Dry-run is the default. Readers degrade safely when permissions are missing. Writers
              never execute without explicit active mode and verified permissions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
