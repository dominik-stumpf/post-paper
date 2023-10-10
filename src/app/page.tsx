import { createClient } from '@supabase/supabase-js';
import { auth } from '../auth';
import { useSession } from 'next-auth/react';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';

export default async function Page() {
  // const { data: session } = useSession();
  // if (session) {
  //   const { supabaseAccessToken } = session;
  //   const supabase = createClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //     {
  //       global: {
  //         headers: {
  //           Authorization: `Bearer ${supabaseAccessToken}`,
  //         },
  //       },
  //     },
  //   );
  //   // Now you can query with RLS enabled.
  //   const { data, error } = await supabase.from('users').select('*');
  //   console.log(data);
  // }

  // const session = await auth();
  const session = await auth();
  console.log('loaded root', session);

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
