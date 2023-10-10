import { config } from '@/app/api/auth/auth';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth/next';

const envKeys = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_JWT_SECRET',
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

const handler = NextAuth({
  ...config,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
