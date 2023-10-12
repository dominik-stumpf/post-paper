export const envKeys = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_JWT_SECRET',
  'AUTH_GITHUB_ID',
  'AUTH_GITHUB_SECRET',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  // 'NEXTAUTH_SECRET',
  // 'NEXTAUTH_URL',
] as const;

for (const envKey of envKeys) {
  if (typeof process.env[envKey] !== 'string') {
    throw new Error(`environment variable ${envKey} couldn't be read`);
  }
}

type EnvKeys = Record<typeof envKeys[number], string>;

declare global {
  namespace NodeJS {
    // biome-ignore lint/suspicious/noEmptyInterface: <explanation>
    export interface ProcessEnv extends EnvKeys {}
  }
}
