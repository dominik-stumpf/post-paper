'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  console.log('session response', session, status);

  useEffect(() => {
    (async () => {
      const data = await signIn();

      console.log('signin response', data);
    })();
  }, []);

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
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {/* <label className="label">
                  <a href="#1" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
