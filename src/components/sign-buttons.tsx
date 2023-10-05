'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Avatar } from './avatar';

type States = Record<
  'authenticated' | 'loading' | 'unauthenticated',
  ReactNode
>;

export function SignButtons() {
  const { data: session, status } = useSession();

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
        <button className="btn" type="button" onClick={() => signOut()}>
          sign out
        </button>
      </>
    ),
  };

  return states[status];
}
