'use client';
import { api, seedUserData } from '@/server-data';
import { signIn } from 'next-auth/react';
import PocketBase from 'pocketbase';

import { FormEvent } from 'react';

// import { signIn, useSession } from 'next-auth/react';
// import { useEffect } from 'react';

export default function Page() {
  // const { data: session, status } = useSession();
  // console.log('session response', session, status);

  // useEffect(() => {
  //   (async () => {
  //     const data = await signIn();

  //     console.log('signin response', data);
  //   })();
  // }, []);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { password, email } = Object.fromEntries(formData.entries());
    // const pb = new PocketBase(api);
    // const data = {
    //   // username: 'test_username',
    //   email: email,
    //   // emailVisibility: false,
    //   password: password,
    //   passwordConfirm: password,
    //   // name: 'test',
    // };
    // const resp = await pb
    //   .collection('users')
    //   .authWithPassword(seedUserData.email, seedUserData.password);
    // console.log(resp);
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
              <label className="label">
                <a href="#1" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign in
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
