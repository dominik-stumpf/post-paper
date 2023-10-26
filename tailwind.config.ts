import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--inter)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--mono)', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      height: {
        header: 'var(--header-height)',
      },
      minHeight: {
        remaining: 'calc(100vh - var(--header-height))',
      },
    },
  },
  plugins: [typography],
};

export default config;
