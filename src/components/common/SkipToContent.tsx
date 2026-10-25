import React from 'react';
import { useSmoothScroll } from '../../context/useSmoothScroll';

export const SkipToContent: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#main-content', { offset: -20 });
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="fixed left-4 -top-40 z-[100] px-4 py-2 bg-gitcord-blurple text-white font-semibold rounded-md shadow-lg transition-all duration-200 focus:top-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gitcord-dark"
    >
      Skip to main content
    </a>
  );
};
