'use client';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
      // console.log(session);
    }
  }, [status, router]);

  async function signInGithub() {
    await signIn('github');
  }

  return (
    <div className="flex items-center justify-center flex-col gap-8 h-full bg-base-200">
      <h2 className="card-title">Sign up to POSTPAPER</h2>
      <div className="flex flex-col gap-4">
        <button
          className="btn btn-outline group"
          type="button"
          onClick={signInGithub}
        >
          <Image
            src="/assets/github.svg"
            alt="github"
            width={24}
            height={24}
            className="invert group-hover:invert-0"
          />
          sign up with github
        </button>
        <Link
          className="btn btn-outline group"
          type="button"
          href="/signup/email"
        >
          <Image
            src="/assets/email.svg"
            alt="email"
            width={24}
            height={24}
            className="invert group-hover:invert-0"
          />
          Sign up with email
        </Link>
        <div className="text-center mt-2">
          Already have an account?{' '}
          <Link href="/signin" className="link-info">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
