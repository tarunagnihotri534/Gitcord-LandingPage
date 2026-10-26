import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gitcord: {
          blurple: '#5865F2',
          'blurple-hover': '#4752C4',
          'blurple-subtle': 'rgba(88, 101, 242, 0.12)',
          dark: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-elev': 'var(--color-surface-elev)',
          border: 'var(--color-border)',
          'border-muted': 'var(--color-border-muted)',
          green: 'var(--color-green)',
          'green-hover': '#2EA043',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          heading: 'var(--color-heading)',
          'code-bg': 'var(--color-code-bg)',
        },
        aossie: {
          green: '#228B22',
        },
      },
      boxShadow: {
        'clean-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'clean-md': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
    },
  },
  plugins: [],
};

export default config;
