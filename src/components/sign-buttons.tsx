'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
export function SignButtons() {
  const { data: session, status } = useSession();

  return status === 'authenticated' ? (
    <button className="btn" type="button" onClick={() => signOut()}>
      sign out
    </button>
  ) : (
    <>
      <Link className="btn" href="/signin">
        sign in
      </Link>
      <Link className="btn btn-primary" href="/signup">
        sign up
      </Link>
    </>
  );
}
