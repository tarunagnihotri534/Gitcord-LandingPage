import React from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { SmoothScrollProvider } from './context/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SkipToContent } from './components/common/SkipToContent';
import { Hero } from './components/sections/Hero';
import { PipelineSection } from './components/sections/PipelineSection';
import { LinkingSection } from './components/sections/LinkingSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { QuickStartSection } from './components/sections/QuickStartSection';

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <div className="min-h-screen bg-gitcord-dark text-gitcord-text flex flex-col font-sans selection:bg-gitcord-blurple selection:text-white transition-colors duration-200">
          <SkipToContent />
          <Navbar />

          <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
            <Hero />
            <PipelineSection />
            <LinkingSection />
            <FeaturesSection />
            <QuickStartSection />
          </main>

          <Footer />
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
