'use client';

import { api } from '@/server-data';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import { FormEvent } from 'react';

export default function EmailForm() {
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
    <div className="w-full h-full flex items-center justify-center flex-col gap-8 bg-base-200 px-4">
      <h2 className="card-title">Sign up to POSTPAPER</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button className="btn btn-primary mt-4" type="submit">
          Sign up
        </button>
        <div className="text-sm text-center">
          By signing up, I agree to POSTPAPER's{' '}
          <Link href="/privacy-policy" className="link-info">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="link-info">
            Privacy Policy
          </Link>
        </div>
      </form>
      <Link href="/signup" className="link-info">
        Other login options
      </Link>
    </div>
  );
}