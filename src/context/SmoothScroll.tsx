import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollContext } from './smoothScrollContext';
import type { ScrollToOptions } from './smoothScrollContext';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches);
      if (event.matches && lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    // If reduced motion is preferred, bypass Lenis entirely
    if (mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Ticker driving lenis.raf with standard lagSmoothing to prevent frame-drop stutter
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: ScrollToOptions) => {
      const offset = options?.offset ?? -80; // default offset for sticky header
      const immediate = options?.immediate ?? isReducedMotion;

      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element instanceof HTMLElement) {
          if (lenisRef.current && !isReducedMotion) {
            lenisRef.current.scrollTo(element, {
              offset,
              immediate,
              duration: options?.duration ?? 1.2,
            });
          } else {
            // Native accessible fallback
            const elementPosition = element.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({
              top: elementPosition,
              behavior: immediate ? 'auto' : 'smooth',
            });
          }
          // Set keyboard focus for accessibility without layout jump
          element.setAttribute('tabindex', '-1');
          element.focus({ preventScroll: true });
        }
      } else if (target instanceof HTMLElement) {
        if (lenisRef.current && !isReducedMotion) {
          lenisRef.current.scrollTo(target, {
            offset,
            immediate,
            duration: options?.duration ?? 1.2,
          });
        } else {
          const elementPosition = target.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({
            top: elementPosition,
            behavior: immediate ? 'auto' : 'smooth',
          });
        }
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    },
    [isReducedMotion]
  );

  const contextValue = useMemo(
    () => ({
      getLenis,
      scrollTo,
      isReducedMotion,
    }),
    [getLenis, scrollTo, isReducedMotion]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>{children}</SmoothScrollContext.Provider>
  );
};
