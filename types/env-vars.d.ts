import type { envKeys } from '@/types/validate-env-vars';

type EnvKeys = Record<(typeof envKeys)[number], string>;

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends EnvKeys {}
  }
}
