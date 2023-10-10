'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

export default function EmailForm() {
  // useEffect(() => {
  //   (async () => {
  //     const authMethods = await pb.collection('users').listAuthMethods();
  //     const provider = authMethods.authProviders[0];

  //     const redirectUrl = `${location.origin}/signup/email`;
  //     const url = provider.authUrl + redirectUrl;
  //     const params = new URL(location.href).searchParams;
  //     const code = params.get('code');

  //     // router.push(url);
  //     // pb.collection
  //     // if (!code) return;

  //     // const authData = await pb.collection('users');
  //     // console.log(authData, redirectUrl, url);

  //     const authData = await pb
  //       .collection('users')
  //       .authWithOAuth2({ provider: 'github' });
  //     console.log(authData);
  //     const cookie = pb.authStore.exportToCookie({ httpOnly: false });
  //     document.cookie = cookie;
  //   })();
  // }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { password, email, name } = Object.fromEntries(formData.entries());
    const _data = {
      emailVisibility: false,
      email: email,
      name: name,
      password: password,
      passwordConfirm: password,
    };
    // const resp = await pb.collection('users').create(data);
    form.reset();
    signIn('credentials', { username: email, password });
  }

  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     router.replace('/');
  //   }
  // }, [status, router]);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8 bg-base-200 px-4">
      <h2 className="card-title">Sign up to POSTPAPER</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="input input-bordered"
            autoComplete="name"
            required
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
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
            name="password"
            id="password"
            className="input input-bordered"
            required
          />
        </div>
        <button className="btn btn-primary mt-4 mb-2" type="submit">
          Sign up
        </button>
        <div className="text-sm text-center">
          By signing up, you agree to POSTPAPER's{' '}
          <Link href="/privacy-policy" className="link-info">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="link-info">
            Privacy Policy
          </Link>
        </div>
      </form>
      <Link href="/signup" className="link-info flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="inline rotate-180"
        >
          <title>arrow</title>
          <path
            fill="currentColor"
            d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
          />
        </svg>
        Other login options
      </Link>
    </div>
  );
}
