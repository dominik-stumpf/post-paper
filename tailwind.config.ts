import type { Config } from 'tailwindcss';
import { violet, gray } from 'tailwindcss/colors';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

const remaining = 'calc(100vh - var(--header-height))';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: { ...violet, DEFAULT: violet['500'] },
        fg: gray['100'],
        'fg-dim': gray['200'],
        bg: gray['950'],
        surface: gray['800'],
        line: gray['600'],
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
