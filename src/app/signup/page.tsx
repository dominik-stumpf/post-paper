'use client';

import { api } from '@/server-data';
import { getProviders, signIn, useSession } from 'next-auth/react';
import PocketBase from 'pocketbase';
import { FormEvent, useEffect } from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  console.log('session response', session, status);

  async function signInGithub() {
    await signIn('github');
  }

  useEffect(() => {
    (async () => {
      console.log(await getProviders());
    })();
  }, []);

  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { password, email } = Object.fromEntries(formData.entries());
    const pb = new PocketBase(api);
    const data = {
      // username: 'test_username',
      email: email,
      // emailVisibility: false,
      password: password,
      passwordConfirm: password,
      // name: 'test',
    };
    const resp = await pb.collection('users').create(data);
    // .authWithPassword(email.toString(), password.toString());
    console.log(resp);
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
            <form className="card-body" onSubmit={signUp}>
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
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign up
                </button>
                <button
                  className="btn btn-primary mt-4"
                  type="button"
                  onClick={signInGithub}
                >
                  github
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
