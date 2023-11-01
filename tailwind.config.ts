import type { Config } from 'tailwindcss';
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
        accent: 'var(--accent)',
        bg: 'var(--bg)',
        'bg-low': 'var(--bg)',
        fg: 'var(--fg)',
        'fg-low': 'var(--fg-low)',
        separator: 'var(--separator)',
      },
      height: {
        header: 'var(--header-height)',
        remaining,
      },
      minHeight: {
        remaining,
      },
    },
  },
  plugins: [typography],
};

export default config;
