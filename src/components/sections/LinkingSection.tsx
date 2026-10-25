import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '../../context/useSmoothScroll';
import { DiscordIcon, GithubIcon } from '../common/Icons';
import { Check, ExternalLink, HelpCircle, UserX, MessageSquare } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  readonly id: string;
  readonly letter: string;
  readonly command?: string;
  readonly title: string;
  readonly description: string;
  readonly note?: string;
}

const STEPS: readonly StepItem[] = [
  {
    id: 'step-a',
    letter: 'a',
    command: '/link github_username:<your-github-login>',
    title: 'Run /link in Discord',
    description:
      'Run /link with your GitHub username. Gitcord replies with an ephemeral message containing a temporary verification code and a Verify button.',
    note: 'Code is short-lived; if it expires, run /link again.',
  },
  {
    id: 'step-b',
    letter: 'b',
    title: 'Add code to bio or public gist',
    description:
      'Paste the verification code into your GitHub profile bio or a public gist. Gitcord checks both locations during verification.',
    note: 'You can remove the code from your bio or gist once verified.',
  },
  {
    id: 'step-c',
    letter: 'c',
    command: '/verify-link github_username:<same-login>',
    title: 'Run /verify-link or click Verify',
    description:
      'Click the Verify button in Discord or run /verify-link. Gitcord checks GitHub via API, confirms the code matches, and records the link in SQLite.',
  },
  {
    id: 'step-d',
    letter: 'd',
    command: '/profile',
    title: 'View verified profile and roles',
    description:
      'Run /profile to view your verified GitHub username, verification status, connected socials, and server roles.',
  },
] as const;

export const LinkingSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsColRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useSmoothScroll();

  useEffect(() => {
    if (isReducedMotion || typeof window === 'undefined' || !stepsColRef.current) {
      return;
    }

    const stepElements = stepsColRef.current.querySelectorAll('.step-trigger');
    if (!stepElements.length) return;

    const ctx = gsap.context(() => {
      stepElements.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center+=100',
          end: 'bottom center+=100',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section id="linking" ref={containerRef} className="py-16 border-b border-gitcord-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono uppercase tracking-wider text-gitcord-muted mb-2 font-medium">
            Identity Verification
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gitcord-heading mb-3">
            Link your GitHub account
          </h2>
          <p className="text-base text-gitcord-muted leading-relaxed">
            Most commands need a verified link. Start with <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-gitcord-surface border border-gitcord-border text-gitcord-text">/link</code> to connect your Discord identity to your GitHub account without sharing credentials.
          </p>
        </div>

        {/* 2-Column Walkthrough: Mockup on LEFT (Desktop), Steps on RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Discord Chat Mockup */}
          <div className="hidden lg:block lg:col-span-7 sticky top-20">
            <div className="rounded-lg border border-gitcord-border bg-gitcord-surface overflow-hidden shadow-clean-sm">
              {/* Discord Window Bar */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-gitcord-surface border-b border-gitcord-border text-xs font-mono text-gitcord-muted">
                <div className="flex items-center gap-2 text-gitcord-heading font-medium">
                  <DiscordIcon className="w-3.5 h-3.5 text-gitcord-blurple" aria-hidden="true" />
                  <span>#link-identity (Discord)</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border text-gitcord-muted">
                  Interactive Preview
                </span>
              </div>

              {/* Chat Canvas */}
              <div className="p-4 sm:p-5 font-sans text-xs space-y-4 min-h-[360px] bg-gitcord-surface">
                {/* Active Step Indicator Tabs */}
                <div className="flex items-center gap-1.5 pb-3 border-b border-gitcord-border font-mono text-[11px]">
                  <span className="text-gitcord-muted mr-1">Stage:</span>
                  {STEPS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`px-2.5 py-0.5 rounded border text-[11px] transition-colors duration-150 cursor-pointer ${
                        activeStep === idx
                          ? 'bg-gitcord-blurple text-white border-gitcord-blurple font-medium'
                          : 'bg-gitcord-surface-elev text-gitcord-muted border-gitcord-border hover:text-gitcord-heading'
                      }`}
                    >
                      Step {s.letter}
                    </button>
                  ))}
                </div>

                {/* State 0: Step a -> /link */}
                {activeStep === 0 && (
                  <div className="space-y-3 transition-opacity duration-150">
                    {/* User Command */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded bg-gitcord-surface-elev border border-gitcord-border flex items-center justify-center font-mono text-gitcord-heading text-[10px] font-bold">
                        C
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gitcord-heading">contributor</span>
                          <span className="text-[10px] text-gitcord-muted">Today at 10:14 AM</span>
                        </div>
                        <p className="font-mono text-gitcord-text bg-gitcord-dark px-2.5 py-1 rounded border border-gitcord-border inline-block">
                          /link github_username:contributor
                        </p>
                      </div>
                    </div>

                    {/* Bot Ephemeral Response */}
                    <div className="ml-9 p-3 rounded-md bg-gitcord-dark border border-gitcord-border space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-gitcord-heading flex items-center gap-1.5">
                          <img
                            src={`${import.meta.env.BASE_URL}GITCORD%20Logo.png`}
                            alt="Gitcord Bot"
                            className="w-4 h-4 object-contain"
                            width={16}
                            height={16}
                          />
                          <span>Gitcord Bot</span>
                        </span>
                        <span className="text-[10px] text-gitcord-muted">Only you can see this (ephemeral)</span>
                      </div>
                      <p className="text-gitcord-text text-xs">
                        Add this verification code to your GitHub bio or a public gist:
                      </p>
                      <div className="p-2 rounded bg-gitcord-surface border border-gitcord-border font-mono text-gitcord-heading text-xs select-all">
                        gitcord-verify-8f2a
                      </div>
                      <div className="pt-1 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-gitcord-blurple text-white font-medium text-[11px] inline-flex items-center gap-1">
                          Verify
                        </span>
                        <span className="text-gitcord-muted text-[11px]">
                          or run <code className="font-mono text-gitcord-text">/verify-link</code>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* State 1: Step b -> Bio update check */}
                {activeStep === 1 && (
                  <div className="space-y-3 transition-opacity duration-150">
                    <div className="p-3.5 rounded-md bg-gitcord-dark border border-gitcord-border space-y-2.5">
                      <div className="flex items-center gap-2 text-gitcord-heading font-medium text-xs">
                        <GithubIcon className="w-4 h-4 text-gitcord-heading" aria-hidden="true" />
                        <span>GitHub Profile Inspection</span>
                      </div>
                      <div className="text-[11px] font-mono text-gitcord-muted space-y-1">
                        <p>Target: <span className="text-gitcord-heading">github.com/contributor</span></p>
                        <p>Bio string: <span className="text-gitcord-green font-semibold">"Working on open source | gitcord-verify-8f2a"</span></p>
                      </div>
                      <p className="text-xs text-gitcord-muted pt-1">
                        Code verified in profile bio. You can remove it after verification completes.
                      </p>
                    </div>
                  </div>
                )}

                {/* State 2: Step c -> /verify-link */}
                {activeStep === 2 && (
                  <div className="space-y-3 transition-opacity duration-150">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded bg-gitcord-surface-elev border border-gitcord-border flex items-center justify-center font-mono text-gitcord-heading text-[10px] font-bold">
                        C
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gitcord-heading">contributor</span>
                          <span className="text-[10px] text-gitcord-muted">Today at 10:15 AM</span>
                        </div>
                        <p className="font-mono text-gitcord-text bg-gitcord-dark px-2.5 py-1 rounded border border-gitcord-border inline-block">
                          /verify-link github_username:contributor
                        </p>
                      </div>
                    </div>

                    {/* Bot Success Confirmation */}
                    <div className="ml-9 p-3 rounded-md bg-gitcord-dark border border-gitcord-green/40 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-gitcord-green font-medium text-xs">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Link verified</span>
                      </div>
                      <p className="text-gitcord-text text-xs">
                        Successfully verified <span className="font-mono text-gitcord-heading font-semibold">contributor</span>. Your Discord account is now linked.
                      </p>
                      <p className="text-[11px] font-mono text-gitcord-muted">
                        State recorded in local SQLite database.
                      </p>
                    </div>
                  </div>
                )}

                {/* State 3: Step d -> /profile */}
                {activeStep === 3 && (
                  <div className="space-y-3 transition-opacity duration-150">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded bg-gitcord-surface-elev border border-gitcord-border flex items-center justify-center font-mono text-gitcord-heading text-[10px] font-bold">
                        C
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gitcord-heading">contributor</span>
                          <span className="text-[10px] text-gitcord-muted">Today at 10:16 AM</span>
                        </div>
                        <p className="font-mono text-gitcord-text bg-gitcord-dark px-2.5 py-1 rounded border border-gitcord-border inline-block">
                          /profile
                        </p>
                      </div>
                    </div>

                    {/* Profile Embed */}
                    <div className="ml-9 p-3.5 rounded-md bg-gitcord-dark border-l-2 border-l-gitcord-blurple border border-gitcord-border space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-gitcord-heading">
                        <span>Contributor Profile</span>
                        <span className="text-[10px] font-mono text-gitcord-green px-1.5 py-0.5 rounded bg-gitcord-surface border border-gitcord-border">
                          Verified Link
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="text-gitcord-muted block">GitHub Identity:</span>
                          <span className="font-mono text-gitcord-heading font-medium">@contributor</span>
                        </div>
                        <div>
                          <span className="text-gitcord-muted block">Discord Account:</span>
                          <span className="font-mono text-gitcord-heading font-medium">contributor</span>
                        </div>
                        <div>
                          <span className="text-gitcord-muted block">Assigned Roles:</span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-gitcord-blurple/10 text-gitcord-blurple border border-gitcord-blurple/25 font-semibold inline-block mt-0.5">
                            Contributor
                          </span>
                        </div>
                        <div>
                          <span className="text-gitcord-muted block">Connected Socials:</span>
                          <span className="text-gitcord-muted">None (/connect-social)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mockup Status Bar */}
              <div className="px-3.5 py-2 bg-gitcord-surface border-t border-gitcord-border text-[11px] font-mono text-gitcord-muted flex items-center justify-between">
                <span>Verification Workflow</span>
                <span className="text-gitcord-heading font-medium">Step {STEPS[activeStep].letter} of d</span>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Walkthrough Guide */}
          <div ref={stepsColRef} className="lg:col-span-5 space-y-6">
            <ol className="space-y-4 list-none p-0 m-0">
              {STEPS.map((step, idx) => (
                <li
                  key={step.id}
                  className={`step-trigger p-4 sm:p-5 rounded-lg border transition-all duration-150 ${
                    activeStep === idx
                      ? 'border-gitcord-blurple bg-gitcord-surface shadow-clean-sm'
                      : 'border-gitcord-border bg-gitcord-surface hover:border-gitcord-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-gitcord-blurple px-2 py-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border shrink-0 mt-0.5">
                      {step.letter}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-gitcord-heading tracking-tight">
                        {step.title}
                      </h3>
                      {step.command && (
                        <code className="block font-mono text-xs text-gitcord-text bg-gitcord-dark px-2.5 py-1 rounded border border-gitcord-border overflow-x-auto">
                          {step.command}
                        </code>
                      )}
                      <p className="text-xs text-gitcord-muted leading-relaxed">
                        {step.description}
                      </p>
                      {step.note && (
                        <p className="text-[11px] text-gitcord-muted">
                          Note: {step.note}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* Helper Commands */}
            <div className="p-4 rounded-lg border border-gitcord-border bg-gitcord-surface space-y-2.5 text-xs shadow-clean-sm">
              <p className="font-semibold text-gitcord-heading text-xs uppercase tracking-wider font-mono">
                Related verification options
              </p>
              <ul className="space-y-2 text-xs text-gitcord-muted">
                <li className="flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-gitcord-blurple shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-gitcord-heading">Welcome DM:</strong> When <code className="font-mono text-[11px] text-gitcord-text">discord.welcome_dm_on_join: true</code>, new members receive an automatic DM with a <em>"Start linking"</em> button.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-gitcord-muted shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <code className="font-mono text-[11px] text-gitcord-text">/help-link @member</code>: Help another member start linking.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-gitcord-muted shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <code className="font-mono text-[11px] text-gitcord-text">/who-is &lt;github_username&gt;</code>: Look up a GitHub username to find their verified Discord account.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <UserX className="w-3.5 h-3.5 text-gitcord-muted shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <code className="font-mono text-[11px] text-gitcord-text">/unlink</code>: Unlink your GitHub identity if you need to switch accounts.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
