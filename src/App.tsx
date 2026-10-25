import React, { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { SmoothScrollProvider } from './context/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SkipToContent } from './components/common/SkipToContent';
import { Hero } from './components/sections/Hero';

// Dynamically import below-the-fold sections to optimize initial bundle size & LCP
const PipelineSection = React.lazy(() =>
  import('./components/sections/PipelineSection').then((m) => ({ default: m.PipelineSection }))
);
const LinkingSection = React.lazy(() =>
  import('./components/sections/LinkingSection').then((m) => ({ default: m.LinkingSection }))
);
const FeaturesSection = React.lazy(() =>
  import('./components/sections/FeaturesSection').then((m) => ({ default: m.FeaturesSection }))
);
const QuickStartSection = React.lazy(() =>
  import('./components/sections/QuickStartSection').then((m) => ({ default: m.QuickStartSection }))
);

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <div className="min-h-screen bg-gitcord-dark text-gitcord-text flex flex-col font-sans selection:bg-gitcord-blurple selection:text-white transition-colors duration-200">
          <SkipToContent />
          <Navbar />

          <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
            <Hero />
            <Suspense fallback={<div className="py-16 min-h-[350px] border-b border-gitcord-border" aria-hidden="true" />}>
              <PipelineSection />
            </Suspense>
            <Suspense fallback={<div className="py-16 min-h-[500px] border-b border-gitcord-border" aria-hidden="true" />}>
              <LinkingSection />
            </Suspense>
            <Suspense fallback={<div className="py-16 min-h-[400px] border-b border-gitcord-border" aria-hidden="true" />}>
              <FeaturesSection />
            </Suspense>
            <Suspense fallback={<div className="py-16 min-h-[400px] border-b border-gitcord-border" aria-hidden="true" />}>
              <QuickStartSection />
            </Suspense>
          </main>

          <Footer />
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
