import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { NAV_LINKS, BRAND_CONFIG } from '../../data/brand';
import { useSmoothScroll } from '../../context/useSmoothScroll';
import { useTheme } from '../../context/useTheme';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const { theme, setTheme } = useTheme();

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -70 });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gitcord-dark/95 backdrop-blur-md border-b border-gitcord-border transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(document.body, { offset: 0 });
              }}
              className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gitcord-blurple rounded py-1"
              aria-label="Gitcord Home"
            >
              <img
                src={`${import.meta.env.BASE_URL}GITCORD%20Logo.png`}
                alt="Gitcord Logomark"
                className="h-7 w-7 object-contain"
                width={28}
                height={28}
              />
              <span className="text-base font-semibold tracking-tight text-gitcord-heading">
                Gitcord
              </span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-gitcord-surface text-gitcord-muted border border-gitcord-border">
                v1.0
              </span>
            </a>

            {/* AOSSIE Parent Org Badge */}
            <a
              href={BRAND_CONFIG.urls.aossieWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gitcord-surface border border-gitcord-border text-xs text-gitcord-muted hover:text-gitcord-heading transition-colors"
              title="AOSSIE — Australian Open Source Software Innovation and Education"
            >
              <img
                src={`${import.meta.env.BASE_URL}AOSSIE%20Logo.png`}
                alt="AOSSIE Logo"
                className="h-4 w-4 object-contain"
                width={16}
                height={16}
              />
              <span className="font-mono text-[11px] text-gitcord-text font-medium">AOSSIE</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gitcord-muted hover:text-gitcord-heading font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-gitcord-blurple rounded px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Option Switcher & View on GitHub */}
          <div className="flex items-center gap-2.5">
            {/* Segmented Theme Switcher */}
            <div
              className="inline-flex items-center p-0.5 rounded-md bg-gitcord-surface border border-gitcord-border"
              role="group"
              aria-label="Theme switcher"
            >
              <button
                id="theme-toggle-light"
                type="button"
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded transition-colors duration-150 cursor-pointer ${
                  theme === 'light'
                    ? 'bg-gitcord-surface-elev text-amber-500 shadow-clean-sm font-semibold'
                    : 'text-gitcord-muted hover:text-gitcord-heading'
                }`}
                aria-label="Switch to light theme"
                title="Light theme"
                aria-pressed={theme === 'light'}
              >
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                id="theme-toggle-dark"
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded transition-colors duration-150 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-gitcord-surface-elev text-gitcord-blurple shadow-clean-sm font-semibold'
                    : 'text-gitcord-muted hover:text-gitcord-heading'
                }`}
                aria-label="Switch to dark theme"
                title="Dark theme"
                aria-pressed={theme === 'dark'}
              >
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* GitHub Link (Desktop) */}
            <a
              href={BRAND_CONFIG.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-gitcord-text bg-gitcord-surface hover:bg-gitcord-surface-elev border border-gitcord-border hover:border-gitcord-border transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-gitcord-blurple"
            >
              <GithubIcon className="w-3.5 h-3.5 text-gitcord-text" aria-hidden="true" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-gitcord-muted" aria-hidden="true" />
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md text-gitcord-muted hover:text-gitcord-heading bg-gitcord-surface hover:bg-gitcord-surface-elev border border-gitcord-border focus:outline-none focus-visible:ring-2 focus-visible:ring-gitcord-blurple transition-colors duration-150 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-gitcord-border bg-gitcord-dark px-4 py-4 space-y-2 transition-colors duration-200"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gitcord-muted hover:text-gitcord-heading hover:bg-gitcord-surface transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-gitcord-border flex flex-col gap-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-gitcord-text bg-gitcord-surface border border-gitcord-border">
              <span className="text-gitcord-muted">Theme option</span>
              <div className="inline-flex items-center p-0.5 rounded bg-gitcord-surface-elev border border-gitcord-border">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                    theme === 'light'
                      ? 'bg-gitcord-surface text-amber-500 font-semibold'
                      : 'text-gitcord-muted'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                    theme === 'dark'
                      ? 'bg-gitcord-surface text-gitcord-blurple font-semibold'
                      : 'text-gitcord-muted'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            <a
              href={BRAND_CONFIG.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-gitcord-text bg-gitcord-surface border border-gitcord-border"
            >
              <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View Repository on GitHub</span>
              <ExternalLink className="w-3 h-3 text-gitcord-muted" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
