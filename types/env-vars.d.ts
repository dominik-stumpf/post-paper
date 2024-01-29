import type { envKeys } from '@/validate-env-vars.mjs';

type EnvKeys = Record<(typeof envKeys)[number], string>;

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends EnvKeys {}
  }
}
