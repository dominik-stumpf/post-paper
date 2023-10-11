import { SupabaseAdapter } from '@auth/supabase-adapter';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions as NextAuthConfig } from 'next-auth';
import { getServerSession } from 'next-auth';
import jwt from 'jsonwebtoken';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const envKeys = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_JWT_SECRET',
  'AUTH_GITHUB_ID',
  'AUTH_GITHUB_SECRET',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
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

export const config = {
  // adapter: SupabaseAdapter({
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  // }),
  callbacks: {
    session({ session }) {
      // console.log(session, user);
      // session.user = user;
      // const signingSecret = process.env.SUPABASE_JWT_SECRET;
      // if (signingSecret) {
      //   const payload = {
      //     aud: 'authenticated',
      //     exp: Math.floor(new Date(session.expires).getTime() / 1000),
      //     sub: user.id,
      //     email: user.email,
      //     role: 'authenticated',
      //   };
      //   session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      // }
      return session;
    },
  },
  // pages: {
  //   signIn: '/signin',
  //   newUser: '/signup',
  // },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        // console.log('authorizing', credentials);
        return {
          id: '1',
          name: 'J Smith',
          email: 'jsmith@example.com',
        };

        // if (!credentials) {
        //   return null;
        // }

        // const { email, password } = credentials;

        // const supabase = createRouteHandlerClient({ cookies });

        // const { error, data } = await supabase.auth.signInWithPassword({
        //   email,
        //   password,
        // });

        // // const fetch = await supabase.from('users').select('*');
        // // console.log('fetch', fetch);

        // if (error) {
        //   console.error(error);
        //   return null;
        // } else {
        //   console.log('signed in', data.user);
        //   const userData = {
        //     id: data.user.id,
        //     email: data.user.email,
        //     name: data.user.email,
        //   };
        //   return userData;
        // }
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
} satisfies NextAuthConfig;

export function getSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
