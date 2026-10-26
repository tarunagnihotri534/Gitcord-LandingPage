import React, { useRef } from 'react';
import { ArrowRight, ExternalLink, GitPullRequest, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { BRAND_CONFIG } from '../../data/brand';
import { GithubIcon, DiscordIcon } from '../common/Icons';
import { useSmoothScroll } from '../../context/useSmoothScroll';
import { LogoMerge } from '../LogoMerge';

export const Hero: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const textContentRef = useRef<HTMLDivElement | null>(null);
  const animWrapperRef = useRef<HTMLDivElement | null>(null);
  const hasRevealedRef = useRef<boolean>(false);

  // Called when the logo merge completes its reveal and starts dissolving (~2.8s)
  const handleReveal = () => {
    hasRevealedRef.current = true;
    if (textContentRef.current) {
      gsap.to(textContentRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          // Permanently lock visibility in DOM styles so text never disappears
          if (textContentRef.current) {
            textContentRef.current.style.opacity = '1';
            textContentRef.current.style.visibility = 'visible';
            textContentRef.current.style.transform = 'none';
          }
        },
      });
    }
  };

  // Called when entire animation finishes
  const handleAnimationEnd = () => {
    hasRevealedRef.current = true;
    if (animWrapperRef.current) {
      gsap.set(animWrapperRef.current, { display: 'none' });
    }
    // Fail-safe: ensure text is 100% permanently visible
    if (textContentRef.current) {
      textContentRef.current.style.opacity = '1';
      textContentRef.current.style.visibility = 'visible';
      textContentRef.current.style.transform = 'none';
    }
  };

  useGSAP(
    () => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) {
        hasRevealedRef.current = true;
        if (textContentRef.current) {
          gsap.set(textContentRef.current, { autoAlpha: 1, y: 0 });
          textContentRef.current.style.opacity = '1';
          textContentRef.current.style.visibility = 'visible';
        }
        if (animWrapperRef.current) {
          gsap.set(animWrapperRef.current, { display: 'none' });
        }
      } else {
        // Only set to hidden if animation has not already revealed
        if (textContentRef.current && !hasRevealedRef.current) {
          gsap.set(textContentRef.current, { autoAlpha: 0, y: 16 });
        }
      }
    },
    { scope: textContentRef, dependencies: [] }
  );

  // Safety fallback timer: guarantees text is permanently visible even if animations are delayed
  React.useEffect(() => {
    const safetyTimer = window.setTimeout(() => {
      hasRevealedRef.current = true;
      if (textContentRef.current) {
        textContentRef.current.style.opacity = '1';
        textContentRef.current.style.visibility = 'visible';
        textContentRef.current.style.transform = 'none';
      }
      if (animWrapperRef.current) {
        animWrapperRef.current.style.display = 'none';
      }
    }, 3800);

    return () => window.clearTimeout(safetyTimer);
  }, []);

  return (
    <section id="hero" className="pt-24 pb-16 border-b border-gitcord-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Clean Factual Text with Center Overlay Animation */}
          <div className="lg:col-span-7 relative">
            {/* Proper Exact Text in its Proper Place */}
            <div ref={textContentRef} className="space-y-6">
              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gitcord-heading leading-tight">
                Deterministic automation for open-source communities.
              </h1>

              {/* Subline: Plain and specific */}
              <p className="text-base sm:text-lg text-gitcord-muted leading-relaxed max-w-xl">
                Gitcord reads GitHub activity and Discord state, then plans role changes and issue
                assignments you can review before anything is applied.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#quickstart"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#quickstart', { offset: -70 });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-white bg-gitcord-blurple hover:bg-gitcord-blurple-hover transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-gitcord-blurple shadow-clean-sm"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={BRAND_CONFIG.urls.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-gitcord-text bg-gitcord-surface hover:bg-gitcord-surface-elev border border-gitcord-border hover:border-gitcord-muted transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-gitcord-blurple"
                >
                  <GithubIcon className="w-4 h-4 text-gitcord-text" aria-hidden="true" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gitcord-muted" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Animation Overlay: Centered directly where the text is written */}
            <div
              ref={animWrapperRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              aria-hidden="true"
            >
              <LogoMerge align="center" onReveal={handleReveal} onEnd={handleAnimationEnd} />
            </div>
          </div>

          {/* Right Column: Clean Architectural Diagram Mockup */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-gitcord-border bg-gitcord-surface overflow-hidden shadow-clean-sm">
              {/* Mockup Header */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-gitcord-surface border-b border-gitcord-border text-xs font-mono text-gitcord-muted">
                <span className="text-gitcord-heading font-semibold">Architecture Preview</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border text-gitcord-muted">
                  Dry-Run Default
                </span>
              </div>

              <div className="p-4 space-y-3.5">
                {/* 1. GitHub Event Card */}
                <div className="p-3 rounded-md border border-gitcord-border bg-gitcord-dark">
                  <div className="flex items-center justify-between text-xs font-mono text-gitcord-muted mb-2">
                    <div className="flex items-center gap-1.5 text-gitcord-heading font-medium">
                      <GithubIcon className="w-3.5 h-3.5 text-gitcord-heading" aria-hidden="true" />
                      <span>GitHub Activity</span>
                    </div>
                    <span className="text-[11px] text-gitcord-green font-medium">
                      Read-only Ingest
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <GitPullRequest
                      className="w-4 h-4 text-gitcord-green shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <p className="font-mono text-gitcord-heading text-[11px] font-semibold">
                        PR #84: Deterministic role sync
                      </p>
                      <div className="flex items-center gap-2 text-gitcord-muted text-[11px]">
                        <span>
                          Author: <span className="text-gitcord-text font-mono">@contributor</span>
                        </span>
                        <span
                          className="w-1 h-1 rounded-full bg-gitcord-border"
                          aria-hidden="true"
                        />
                        <span>3 commits merged</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Gitcord Central Bridge */}
                <div className="relative py-1 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gitcord-border" />
                  </div>
                  <div className="relative px-3 py-1 rounded bg-gitcord-surface-elev border border-gitcord-border text-[11px] font-mono text-gitcord-heading flex items-center gap-2 shadow-clean-sm">
                    <picture>
                      <source
                        srcSet={`${import.meta.env.BASE_URL}gitcord-logo.webp`}
                        type="image/webp"
                      />
                      <img
                        src={`${import.meta.env.BASE_URL}GITCORD%20Logo.png`}
                        alt="Gitcord Engine"
                        className="w-4 h-4 object-contain"
                        width={16}
                        height={16}
                      />
                    </picture>
                    <div className="flex items-center gap-1 text-[11px] text-gitcord-muted">
                      <span className="text-gitcord-heading font-medium">Read</span>
                      <ChevronRight className="w-3 h-3 text-gitcord-muted" aria-hidden="true" />
                      <span className="text-gitcord-heading font-medium">Plan</span>
                      <ChevronRight className="w-3 h-3 text-gitcord-muted" aria-hidden="true" />
                      <span className="text-gitcord-heading font-medium">Report</span>
                    </div>
                  </div>
                </div>

                {/* 3. Discord Event Card */}
                <div className="p-3 rounded-md border border-gitcord-border bg-gitcord-dark">
                  <div className="flex items-center justify-between text-xs font-mono text-gitcord-muted mb-2">
                    <div className="flex items-center gap-1.5 text-gitcord-heading font-medium">
                      <DiscordIcon
                        className="w-3.5 h-3.5 text-gitcord-blurple"
                        aria-hidden="true"
                      />
                      <span>Discord Server State</span>
                    </div>
                    <span className="text-[11px] text-gitcord-blurple font-medium">
                      Role Assignment Plan
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gitcord-muted">Verified Identity:</span>
                      <span className="font-mono text-gitcord-text font-medium">contributor</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gitcord-muted">Planned Role:</span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-gitcord-blurple/10 text-gitcord-blurple border border-gitcord-blurple/25 font-semibold">
                        + Contributor Role
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gitcord-border text-[11px] font-mono text-gitcord-muted">
                      Audit log:{' '}
                      <span className="text-gitcord-text font-mono">data/reports/audit.md</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup Footer */}
              <div className="px-3.5 py-2 bg-gitcord-surface border-t border-gitcord-border text-[11px] font-mono text-gitcord-muted flex items-center justify-between">
                <span>MutationPolicy: dry-run</span>
                <span className="text-gitcord-green font-medium">0 live writes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
