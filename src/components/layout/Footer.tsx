import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '../common/Icons';
import { BRAND_CONFIG, NAV_LINKS } from '../../data/brand';
import { useSmoothScroll } from '../../context/useSmoothScroll';

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="bg-gitcord-dark border-t border-gitcord-border mt-24 py-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gitcord-border text-sm">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src={`${import.meta.env.BASE_URL}GITCORD%20Logo.png`}
                alt="Gitcord Logomark"
                className="h-6 w-6 object-contain"
                width={24}
                height={24}
              />
              <span className="font-semibold text-white">Gitcord</span>
              <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-gitcord-surface border border-gitcord-border text-gitcord-muted">
                v1.0
              </span>
            </div>
            <p className="text-xs text-gitcord-muted leading-relaxed max-w-xs">
              Local-first, offline-first automation engine connecting Discord communities with GitHub repositories.
            </p>
            <div className="pt-1">
              <a
                href={BRAND_CONFIG.urls.aossieWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-2.5 py-1.5 rounded border border-gitcord-border bg-gitcord-surface hover:border-gitcord-muted transition-colors group"
              >
                <img
                  src={`${import.meta.env.BASE_URL}AOSSIE%20Logo.png`}
                  alt="AOSSIE Logo"
                  className="h-7 w-7 object-contain"
                  width={28}
                  height={28}
                />
                <div className="text-[11px] leading-tight">
                  <span className="text-gitcord-muted block text-[10px]">Open source project by</span>
                  <span className="text-white font-medium group-hover:text-gitcord-blurple transition-colors">AOSSIE</span>
                </div>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              On this page
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href, { offset: -70 });
                    }}
                    className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Documentation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Documentation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={BRAND_CONFIG.urls.installation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150 inline-flex items-center gap-1"
                >
                  <span>Installation Guide</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.urls.dockerGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150 inline-flex items-center gap-1"
                >
                  <span>Docker Deployment</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.urls.contributing}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150 inline-flex items-center gap-1"
                >
                  <span>Contributing</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.urls.license}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150 inline-flex items-center gap-1"
                >
                  <span>License (GPL-3.0)</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Community */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Repository &amp; Community
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={BRAND_CONFIG.urls.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150 inline-flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-gitcord-text" aria-hidden="true" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.urls.discordThread}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150 inline-flex items-center gap-1.5"
                >
                  <DiscordIcon className="w-3.5 h-3.5 text-gitcord-blurple" aria-hidden="true" />
                  <span>Discord Project Thread</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.urls.aossieWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gitcord-muted hover:text-gitcord-text transition-colors duration-150 inline-flex items-center gap-1.5"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}AOSSIE%20Logo.png`}
                    alt=""
                    className="h-4 w-4 object-contain inline-block"
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  <span>AOSSIE Organisation</span>
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gitcord-muted">
          <div>
            <span>Licensed under the GNU General Public License v3.0 (GPL-3.0).</span>
            <span className="block text-[11px] text-gitcord-muted pt-0.5">
              Unofficial preview, pending maintainer review.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={BRAND_CONFIG.urls.contributing}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gitcord-muted hover:text-white underline underline-offset-2"
            >
              Contributing Guidelines
            </a>
            <a
              href={BRAND_CONFIG.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gitcord-muted hover:text-white underline underline-offset-2"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
