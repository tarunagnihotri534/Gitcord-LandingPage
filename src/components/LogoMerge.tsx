import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Register useGSAP plugin once
gsap.registerPlugin(useGSAP);

export interface LogoMergeProps {
  className?: string;
  align?: 'left' | 'center';
  onReveal?: () => void;
  onEnd?: () => void;
}

export const LogoMerge: React.FC<LogoMergeProps> = ({
  className = '',
  align = 'center',
  onReveal,
  onEnd,
}) => {
  // Container & stage element refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const githubLogoRef = useRef<HTMLDivElement | null>(null);
  const discordLogoRef = useRef<HTMLDivElement | null>(null);
  const gitcordLogoRef = useRef<HTMLDivElement | null>(null);
  const plusRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const githubGlowRef = useRef<HTMLDivElement | null>(null);
  const discordGlowRef = useRef<HTMLDivElement | null>(null);

  // References for master timeline
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const centerPos = align === 'left' ? 'left-12 top-1/2' : 'left-1/2 top-1/2';

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // =========================================================================
      // 1. REDUCED MOTION PREFERENCE (Accessibility)
      // Skips animation and immediately triggers text reveal
      // =========================================================================
      mm.add('(prefers-reduced-motion: reduce)', () => {
        onReveal?.();
        onEnd?.();

        gsap.set(
          [
            githubLogoRef.current,
            discordLogoRef.current,
            gitcordLogoRef.current,
            plusRef.current,
            ringRef.current,
            githubGlowRef.current,
            discordGlowRef.current,
          ],
          { autoAlpha: 0 }
        );
      });

      // =========================================================================
      // 2. STANDARD ANIMATION TIMELINE (Total duration: ~3.2s)
      // Plays in the center of the text area, reveals Gitcord, then fades it out
      // =========================================================================
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Initial hidden state set instantly before paint
        gsap.set(
          [
            githubLogoRef.current,
            discordLogoRef.current,
            gitcordLogoRef.current,
            plusRef.current,
            ringRef.current,
            githubGlowRef.current,
            discordGlowRef.current,
          ],
          {
            xPercent: -50,
            yPercent: -50,
            autoAlpha: 0,
          }
        );

        // Master animation timeline
        const tl = gsap.timeline({
          paused: false,
          onComplete: () => {
            onEnd?.();
          },
        });

        tlRef.current = tl;

        // -----------------------------------------------------------------------
        // PHASE 1: Intro (0s -> 0.6s)
        // GitHub slides in from left, Discord from right (scaled 0.65, rotated ±12deg)
        // -----------------------------------------------------------------------
        tl.fromTo(
          githubLogoRef.current,
          {
            x: -140,
            y: 0,
            scale: 0.45,
            rotation: -24,
            autoAlpha: 0,
          },
          {
            x: -75,
            y: -4,
            scale: 0.7,
            rotation: -12,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          0
        );

        tl.fromTo(
          discordLogoRef.current,
          {
            x: 140,
            y: 0,
            scale: 0.45,
            rotation: 24,
            autoAlpha: 0,
          },
          {
            x: 75,
            y: 4,
            scale: 0.7,
            rotation: 12,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          0
        );

        // -----------------------------------------------------------------------
        // PHASE 2: Approach & Plus Pulse (0.6s -> 1.6s)
        // Both logos float toward center on a gentle curve with trailing glow
        // -----------------------------------------------------------------------
        tl.to(
          githubLogoRef.current,
          {
            x: -30,
            y: 2,
            scale: 0.9,
            rotation: -4,
            duration: 1.0,
            ease: 'sine.inOut',
          },
          0.6
        );

        tl.to(
          discordLogoRef.current,
          {
            x: 30,
            y: -2,
            scale: 0.9,
            rotation: 4,
            duration: 1.0,
            ease: 'sine.inOut',
          },
          0.6
        );

        // GitHub neutral glow
        tl.fromTo(
          githubGlowRef.current,
          {
            x: -75,
            y: -4,
            scale: 0.5,
            autoAlpha: 0,
          },
          {
            x: -30,
            y: 2,
            scale: 1.1,
            autoAlpha: 0.7,
            duration: 1.0,
            ease: 'sine.inOut',
          },
          0.6
        );

        // Discord blurple glow
        tl.fromTo(
          discordGlowRef.current,
          {
            x: 75,
            y: 4,
            scale: 0.5,
            autoAlpha: 0,
          },
          {
            x: 30,
            y: -2,
            scale: 1.1,
            autoAlpha: 0.8,
            duration: 1.0,
            ease: 'sine.inOut',
          },
          0.6
        );

        // Plus symbol appears between logos
        tl.fromTo(
          plusRef.current,
          {
            x: 0,
            y: 0,
            scale: 0.3,
            autoAlpha: 0,
          },
          {
            scale: 1.1,
            autoAlpha: 0.9,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          0.7
        );

        // Plus symbol subtle pulse
        tl.to(
          plusRef.current,
          {
            scale: 1.35,
            duration: 0.25,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
          },
          1.1
        );

        // -----------------------------------------------------------------------
        // PHASE 3: Merge & Radial Ring Flash (1.6s -> 2.1s)
        // Meet at center (scale to 1.15), shrink/fade out, expanding ring flash
        // -----------------------------------------------------------------------
        // Plus symbol fades out prior to impact
        tl.to(
          plusRef.current,
          {
            scale: 0.3,
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          1.6
        );

        // Logos converge at center and swell (1.6s -> 1.9s)
        tl.to(
          githubLogoRef.current,
          {
            x: 0,
            y: 0,
            scale: 1.15,
            rotation: 0,
            duration: 0.3,
            ease: 'power4.in',
          },
          1.6
        );

        tl.to(
          discordLogoRef.current,
          {
            x: 0,
            y: 0,
            scale: 1.15,
            rotation: 0,
            duration: 0.3,
            ease: 'power4.in',
          },
          1.6
        );

        // Glows converge into single flash
        tl.to(
          [githubGlowRef.current, discordGlowRef.current],
          {
            x: 0,
            y: 0,
            scale: 1.5,
            autoAlpha: 0.95,
            duration: 0.3,
            ease: 'power4.in',
          },
          1.6
        );

        // Logos implode / vanish (1.9s -> 2.1s)
        tl.to(
          [githubLogoRef.current, discordLogoRef.current],
          {
            scale: 0.2,
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power4.in',
          },
          1.9
        );

        tl.to(
          [githubGlowRef.current, discordGlowRef.current],
          {
            scale: 0.3,
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power4.in',
          },
          1.9
        );

        // Radial ring flash expands from center (scale 0 -> 1.8, opacity 0.8 -> 0)
        tl.fromTo(
          ringRef.current,
          {
            x: 0,
            y: 0,
            scale: 0,
            autoAlpha: 0.9,
          },
          {
            scale: 1.8,
            autoAlpha: 0,
            duration: 0.55,
            ease: 'expo.out',
          },
          1.92
        );

        // -----------------------------------------------------------------------
        // PHASE 4: Reveal Gitcord Logo (2.1s -> 2.7s)
        // Scale 0.3 -> 1 with elastic overshoot and rotation settle
        // -----------------------------------------------------------------------
        tl.fromTo(
          gitcordLogoRef.current,
          {
            x: 0,
            y: 0,
            scale: 0.3,
            rotation: -15,
            autoAlpha: 0,
          },
          {
            scale: 1.05,
            rotation: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'back.out(2)',
          },
          2.08
        );

        // -----------------------------------------------------------------------
        // PHASE 5: Fade Out Gitcord Logo & Trigger Hero Text Entrance (2.6s -> 3.1s)
        // The Gitcord logo dissolves completely, and then the hero text appears
        // -----------------------------------------------------------------------
        // Fade out Gitcord logo to totally invisible
        tl.to(
          gitcordLogoRef.current,
          {
            scale: 0.9,
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          2.6
        );

        // Trigger the entrance of the hero text as the logo finishes dissolving
        tl.call(
          () => {
            onReveal?.();
          },
          [],
          2.8
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-72 h-44 sm:w-80 sm:h-52 md:w-96 md:h-56 select-none pointer-events-none ${className}`}
      role="region"
      aria-label="Gitcord logo merge animation"
    >
      {/* 1. GitHub Soft Neutral Glow */}
      <div
        ref={githubGlowRef}
        className={`absolute ${centerPos} w-24 h-24 rounded-full blur-2xl pointer-events-none bg-slate-400/25 dark:bg-white/15`}
        aria-hidden="true"
      />

      {/* 2. Discord Blurple Glow */}
      <div
        ref={discordGlowRef}
        className={`absolute ${centerPos} w-24 h-24 rounded-full blur-2xl pointer-events-none bg-[#5865F2]/30`}
        aria-hidden="true"
      />

      {/* 3. Joining Plus Symbol */}
      <span
        ref={plusRef}
        className={`absolute ${centerPos} font-mono text-xl font-bold text-gitcord-muted dark:text-gitcord-muted/80 pointer-events-none`}
        aria-hidden="true"
      >
        +
      </span>

      {/* 4. Radial Expanding Shockwave Ring Flash */}
      <div
        ref={ringRef}
        className={`absolute ${centerPos} w-28 h-28 rounded-full border-2 border-gitcord-blurple pointer-events-none bg-[radial-gradient(circle,_rgba(88,101,242,0.35)_0%,_transparent_70%)] shadow-[0_0_28px_rgba(88,101,242,0.6)]`}
        aria-hidden="true"
      />

      {/* 5. GitHub Logo (Size 16: 64px) */}
      <div
        ref={githubLogoRef}
        className={`absolute ${centerPos} w-16 h-16 pointer-events-none`}
        aria-hidden="true"
      >
        <img
          src={`${import.meta.env.BASE_URL}Githublogoo.png`}
          alt="GitHub logo"
          width={64}
          height={64}
          draggable={false}
          className="w-full h-full object-contain select-none dark:brightness-0 dark:invert"
        />
      </div>

      {/* 6. Discord Logo (Size 16: 64px) */}
      <div
        ref={discordLogoRef}
        className={`absolute ${centerPos} w-16 h-16 pointer-events-none`}
        aria-hidden="true"
      >
        <img
          src={`${import.meta.env.BASE_URL}discordlogoo.png`}
          alt="Discord logo"
          width={64}
          height={64}
          draggable={false}
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* 7. Final Gitcord Logo (Size 24: 96px) - Fades out completely when animation ends */}
      <div
        ref={gitcordLogoRef}
        className={`absolute ${centerPos} w-24 h-24 sm:w-28 sm:h-28 p-1 pointer-events-none`}
        aria-hidden="true"
      >
        <picture className="w-full h-full flex items-center justify-center">
          <source srcSet={`${import.meta.env.BASE_URL}gitcord-logo.webp`} type="image/webp" />
          <img
            src={`${import.meta.env.BASE_URL}GITCORD%20Logo.png`}
            alt="Gitcord logo"
            width={112}
            height={112}
            draggable={false}
            className="w-full h-full object-contain select-none drop-shadow-lg"
          />
        </picture>
      </div>
    </div>
  );
};
