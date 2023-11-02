import type { Config } from 'tailwindcss';
import { violet, gray } from 'tailwindcss/colors';
import typography from '@tailwindcss/typography';

const remaining = 'calc(100vh - var(--header-height))';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        'primary-color': { ...violet, DEFAULT: violet['500'] },
        'fg-color': gray['100'],
        'fg-dim-color': gray['300'],
        'bg-color': gray['950'],
        'surface-color': gray['800'],
        'line-color': gray['600'],
      },
      height: {
        header: 'var(--header-height)',
        remaining,
      },
      minHeight: {
        remaining,
      },
      maxHeight: {
        remaining,
      },
    },
  },
  plugins: [typography],
};

export default config;
