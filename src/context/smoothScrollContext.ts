import { createContext } from 'react';
import type Lenis from 'lenis';

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

export interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: ScrollToOptions) => void;
  isReducedMotion: boolean;
}

export const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
  isReducedMotion: false,
});
