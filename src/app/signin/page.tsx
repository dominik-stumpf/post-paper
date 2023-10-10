'use client';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

export default function Page() {
  // const { data: session, status } = useSession();
  const _router = useRouter();

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     router.replace('/');
  //   }
  // }, [status, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { password, email } = Object.fromEntries(formData.entries());
    signIn('credentials', { username: email, password });
  }

  async function signInGithub() {
    await signIn('github');
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse lg:gap-16">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text text-primary-content">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  id="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <div className="flex justify-between items-center">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <label className="label">
                    <a href="#1" className="label-text link-info">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  id="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign in
                </button>
                OR
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={signInGithub}
                >
                  <Image
                    src="/assets/github.svg"
                    alt="github"
                    width={24}
                    height={24}
                    className="invert"
                  />
                  github
                </button>
              </div>

              <div>
                New to POSTPAPER?{' '}
                <Link href="/signup" className="link-info">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
