'use client';
import { signOut } from 'next-auth/react';
export function SignOut() {
  return (
    <button className="btn" type="button" onClick={() => signOut()}>
      sign out
    </button>
  );
}