import { GithubSignIn } from '@/components/github-sign-in';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Messages from './messages';
import { PageRoot } from '@/components/page-root';

export const dynamic = 'force-dynamic';

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <PageRoot>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-full">
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="name">
            Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            id="name"
            name="name"
            placeholder="John Doe"
            required
            autoComplete="username"
          />
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          <button
            className="bg-green-700 rounded px-4 py-2 text-white mb-2"
            type="submit"
          >
            Sign In
          </button>
          <button
            type="submit"
            formAction="/auth/sign-up"
            className="border border-gray-700 rounded px-4 py-2 mb-2"
          >
            Sign Up
          </button>
          <GithubSignIn />
          <Messages />
        </form>
      </div>
      <div className="h-header w-full" />
    </PageRoot>
  );
}
