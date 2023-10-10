import { auth } from '@/app/api/auth/auth';
import { useSession } from 'next-auth/react';
import { cookies } from 'next/headers';

export default async function Page() {
  const session = await auth();
  console.log('loaded root', session?.user);
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary" type="button">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
