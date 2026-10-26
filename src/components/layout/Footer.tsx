import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, DiscordIcon, LinkedinIcon, XIcon, YoutubeIcon } from '../common/Icons';
import { BRAND_CONFIG } from '../../data/brand';
import { useSmoothScroll } from '../../context/useSmoothScroll';

const FOOTER_LINKS = [
  {
    label: 'Documentation',
    href: BRAND_CONFIG.urls.installation,
    isExternal: true,
  },
  {
    label: 'GitHub Repo',
    href: BRAND_CONFIG.urls.github,
    isExternal: true,
  },
  {
    label: 'LinkedIn',
    href: BRAND_CONFIG.urls.aossieLinkedIn,
    isExternal: true,
  },
  {
    label: 'Support Us',
    href: BRAND_CONFIG.urls.aossieSponsors,
    isExternal: true,
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Email',
    href: BRAND_CONFIG.urls.aossieEmail,
    icon: Mail,
    isExternal: false,
  },
  {
    label: 'GitHub',
    href: BRAND_CONFIG.urls.aossieGithub,
    icon: GithubIcon,
    isExternal: true,
  },
  {
    label: 'Discord',
    href: BRAND_CONFIG.urls.aossieDiscord,
    icon: DiscordIcon,
    isExternal: true,
  },
  {
    label: 'LinkedIn',
    href: BRAND_CONFIG.urls.aossieLinkedIn,
    icon: LinkedinIcon,
    isExternal: true,
  },
  {
    label: 'X',
    href: BRAND_CONFIG.urls.aossieTwitter,
    icon: XIcon,
    isExternal: true,
  },
  {
    label: 'YouTube',
    href: BRAND_CONFIG.urls.aossieYouTube,
    icon: YoutubeIcon,
    isExternal: true,
  },
] as const;

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer
      className="site-footer w-full bg-gitcord-surface border-t border-gitcord-border mt-24 py-8 md:py-10 transition-colors duration-200"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
          {/* LEFT SECTION: AOSSIE Brand & Mission */}
          <div className="flex items-center gap-6 sm:gap-8 justify-center lg:justify-start max-w-md w-full lg:w-auto">
            {/* AOSSIE Logo */}
            <a
              href={BRAND_CONFIG.urls.aossieWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-gitcord-blurple rounded"
              aria-label="Visit AOSSIE organization website"
            >
              <picture>
                <source srcSet={`${import.meta.env.BASE_URL}aossie_logo.svg`} type="image/svg+xml" />
                <source srcSet={`${import.meta.env.BASE_URL}AOSSIE-Logo.webp`} type="image/webp" />
                <img
                  src={`${import.meta.env.BASE_URL}aossie_logo.svg`}
                  alt="AOSSIE"
                  className="h-16 w-auto object-contain"
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </picture>
            </a>

            {/* Separator */}
            <div
              className="h-20 w-px bg-gitcord-border shrink-0 hidden sm:block"
              aria-hidden="true"
            />

            {/* Description */}
            <p className="text-xs sm:text-sm text-gitcord-muted leading-relaxed text-center sm:text-left">
              AOSSIE is a non-profit organization dedicated to building impactful open-source software, mentoring contributors, and fostering innovation through global collaboration.
            </p>
          </div>

          {/* MIDDLE SECTION: Navigation & Social Links */}
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Desktop vertical separator */}
            <div
              className="hidden lg:block h-20 w-px bg-gitcord-border shrink-0"
              aria-hidden="true"
            />

            <div className="flex flex-col items-center gap-5">
              {/* Navigation */}
              <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {FOOTER_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="text-sm font-medium text-gitcord-muted hover:text-gitcord-heading transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-5 sm:gap-6 text-gitcord-muted">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={`Visit our ${item.label}`}
                      title={item.label}
                      className="text-gitcord-muted hover:text-gitcord-heading transition-all duration-150 transform hover:scale-110 p-1"
                    >
                      <Icon className="w-4 h-4" size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Meta, Copyright & Made by AOSSIE */}
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Desktop vertical separator */}
            <div
              className="hidden lg:block h-20 w-px bg-gitcord-border shrink-0"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-2 items-center text-center lg:items-end lg:text-right">
              {/* Year & Gitcord Logo */}
              <p className="flex items-center justify-center lg:justify-end text-xs tracking-[0.2em] font-medium text-gitcord-heading">
                <span>© {new Date().getFullYear()}</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(document.body, { offset: 0 });
                  }}
                  aria-label="Go to top of page"
                  className="inline-flex items-center gap-1.5 ml-2 hover:opacity-80 transition-opacity"
                >
                  <picture>
                    <source srcSet={`${import.meta.env.BASE_URL}gitcord-logo.webp`} type="image/webp" />
                    <img
                      src={`${import.meta.env.BASE_URL}GITCORD%20Logo.png`}
                      alt="Gitcord Logo"
                      className="h-6 w-6 object-contain cursor-pointer"
                      width={24}
                      height={24}
                    />
                  </picture>
                </a>
              </p>

              {/* Tagline */}
              <p className="text-xs uppercase tracking-[0.2em] text-gitcord-muted font-medium">
                BUILT FOR OPEN SOURCE COMMUNITIES
              </p>

              {/* Made with love by AOSSIE */}
              <p className="flex items-center justify-center lg:justify-end gap-1.5 text-sm font-normal text-gitcord-muted">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 inline" aria-label="love" />
                <span>
                  by{' '}
                  <a
                    href="https://github.com/AOSSIE-Org"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="AOSSIE GitHub link"
                    className="font-semibold text-gitcord-heading hover:text-gitcord-blurple underline underline-offset-2 transition-colors"
                  >
                    AOSSIE
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Legal & License Note */}
        <div className="mt-8 pt-4 border-t border-gitcord-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gitcord-muted">
          <span>Licensed under GNU General Public License v3.0 (GPL-3.0).</span>
          <div className="flex items-center gap-4">
            <a
              href={BRAND_CONFIG.urls.contributing}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gitcord-heading underline underline-offset-2 transition-colors"
            >
              Contributing Guidelines
            </a>
            <a
              href={BRAND_CONFIG.urls.license}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gitcord-heading underline underline-offset-2 transition-colors"
            >
              License (GPL-3.0)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
