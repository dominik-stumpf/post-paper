import { auth } from '@/app/lib/auth';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Avatar } from './avatar';
import { SignOut } from './sign-out';

type States = Record<
  'authenticated' | 'loading' | 'unauthenticated',
  ReactNode
>;

export async function SignButtons() {
  const session = await auth();

  console.log(session);

  const states: States = {
    loading: null,
    unauthenticated: (
      <>
        <Link className="btn" href="/signin">
          sign in
        </Link>
        <Link className="btn btn-primary" href="/signup">
          sign up
        </Link>
      </>
    ),
    authenticated: session?.user?.name && (
      <>
        <div className="flex items-center gap-2">
          signed in as {session.user.name}
          <Avatar seed={session.user.name} />
        </div>
        <SignOut />
      </>
    ),
  };

  return session === null ? states.unauthenticated : states.authenticated;
}
