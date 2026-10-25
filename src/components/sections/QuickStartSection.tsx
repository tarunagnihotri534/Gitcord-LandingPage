import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Terminal } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brand';

export const QuickStartSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docker' | 'python'>('docker');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const dockerSnippet = `# 1. Clone repository
git clone https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot.git
cd Gitcord-GithubDiscordBot

# 2. Configure environment and settings
cp .env.example .env
cp config/docker-example.yaml config/config.yaml

# 3. Start bot in background
docker compose up -d
docker compose logs -f bot

# 4. Run one-off dry-run sync
docker compose run --rm bot --config /app/config/config.yaml run-once`;

  const pythonSnippet = `# 1. Clone repository
git clone https://github.com/AOSSIE-Org/Gitcord-GithubDiscordBot.git
cd Gitcord-GithubDiscordBot

# 2. Create and activate virtual environment (Python 3.11+)
python3 -m venv .venv
source .venv/bin/activate

# 3. Install dependencies in editable mode
pip install -e .

# 4. Configure environment and settings
cp .env.example .env
cp config/example.yaml config/config.yaml

# 5. Run dry-run sync (review data/reports/audit.md)
ghdcbot --config config/config.yaml run-once

# 6. Start Discord bot
ghdcbot --config config/config.yaml bot`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <section id="quickstart" className="py-16 border-b border-gitcord-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-gitcord-muted mb-2">
            Deployment
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Quick start guide
          </h2>
          <p className="text-base text-gitcord-muted leading-relaxed">
            Run Gitcord locally or on an always-on host. Verified setup commands from the repository documentation:
          </p>
        </div>

        {/* Tabbed Code Container */}
        <div className="rounded-md border border-gitcord-border bg-gitcord-surface overflow-hidden">
          {/* Tab Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-gitcord-border bg-gitcord-dark px-3 py-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('docker')}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors duration-150 ${
                  activeTab === 'docker'
                    ? 'bg-gitcord-surface text-white border border-gitcord-border font-medium'
                    : 'text-gitcord-muted hover:text-white'
                }`}
              >
                Docker Compose (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('python')}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors duration-150 ${
                  activeTab === 'python'
                    ? 'bg-gitcord-surface text-white border border-gitcord-border font-medium'
                    : 'text-gitcord-muted hover:text-white'
                }`}
              >
                Local Python (3.11+)
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                handleCopy(
                  activeTab === 'docker' ? dockerSnippet : pythonSnippet,
                  activeTab
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-gitcord-muted hover:text-white hover:bg-gitcord-surface border border-transparent hover:border-gitcord-border transition-colors duration-150"
              aria-label="Copy commands to clipboard"
            >
              {copiedKey === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-gitcord-green" aria-hidden="true" />
                  <span className="text-gitcord-green font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Code Body */}
          <div className="p-4 sm:p-5 bg-gitcord-surface font-mono text-xs overflow-x-auto text-gitcord-text leading-relaxed">
            <pre tabIndex={0} className="focus:outline-none">
              <code>{activeTab === 'docker' ? dockerSnippet : pythonSnippet}</code>
            </pre>
          </div>

          {/* Footer Guide Links */}
          <div className="p-4 bg-gitcord-dark border-t border-gitcord-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-gitcord-muted font-mono">
              <Terminal className="w-4 h-4 text-gitcord-muted" aria-hidden="true" />
              <span>
                {activeTab === 'docker'
                  ? 'Persistent named volume gitcord_data survives container restarts.'
                  : 'Start in dry-run mode, review audit.md, then enable active mode.'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={BRAND_CONFIG.urls.installation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gitcord-text hover:text-white underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                <span>INSTALLATION.md</span>
                <ExternalLink className="w-3 h-3 text-gitcord-muted" aria-hidden="true" />
              </a>
              <a
                href={BRAND_CONFIG.urls.dockerGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gitcord-text hover:text-white underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                <span>docs/DOCKER.md</span>
                <ExternalLink className="w-3 h-3 text-gitcord-muted" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
