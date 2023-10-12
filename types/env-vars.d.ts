import { envKeys } from '@/validate-env-vars';

type EnvKeys = Record<typeof envKeys[number], string>;

declare global {
  namespace NodeJS {
    // biome-ignore lint/suspicious/noEmptyInterface: <explanation>
    export interface ProcessEnv extends EnvKeys {}
  }
}
