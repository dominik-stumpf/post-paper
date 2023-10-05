'use client';

import { api } from '@/server-data';
import { getProviders, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import { FormEvent, useEffect } from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  async function signInGithub() {
    await signIn('github');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { password, email, name } = Object.fromEntries(formData.entries());
    const pb = new PocketBase(api);
    const data = {
      emailVisibility: false,
      email: email,
      name: name,
      password: password,
      passwordConfirm: password,
    };
    const resp = await pb.collection('users').create(data);
    form.reset();
    signIn('credentials', { username: email, password });
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold uppercase whitespace-nowrap">
              post-paper
            </h1>
            <p className="py-6 text-lg max-w-xl">
              Fugiat incididunt do fugiat est magna id quis dolor. Cupidatat
              tempor irure fugiat et aliquip magna eiusmod elit eu consequat
              commodo cupidatat exercitation.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  name="name"
                  id="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
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
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  id="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6 gap-3 text-center">
                <button className="btn btn-primary" type="submit">
                  Sign up
                </button>
                <div>OR</div>
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
                  github
                </button>
              </div>
              <div>
                Already have an account?{' '}
                <Link href="/signin" className="link-info">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
