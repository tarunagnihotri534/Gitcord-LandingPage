import { useContext } from 'react';
import { SmoothScrollContext } from './smoothScrollContext';
import type { SmoothScrollContextType } from './smoothScrollContext';

export const useSmoothScroll = (): SmoothScrollContextType => {
  return useContext(SmoothScrollContext);
};
