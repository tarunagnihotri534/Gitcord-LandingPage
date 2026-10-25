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
          dark: '#0D1117',
          surface: '#161B22',
          'surface-elev': '#21262D',
          border: '#30363D',
          'border-muted': '#21262D',
          green: '#238636',
          'green-hover': '#2EA043',
          text: '#F0F6FC',
          muted: '#8B949E',
        },
        aossie: {
          green: '#228B22',
          gold: '#FFC517',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
    },
  },
  plugins: [],
};

export default config;
