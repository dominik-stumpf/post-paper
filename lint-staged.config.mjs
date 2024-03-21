const config = {
  '*.{mjs,js,jsx,ts,tsx}': [
    'prettier --write',
    'biome format --write',
    'biome lint --apply',
  ],
  '*.{css,html,md,mdx,yml,yaml,json}': ['prettier --write'],
};

export default config;
