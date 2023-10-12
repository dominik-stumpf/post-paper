import { createClient } from '@supabase/supabase-js';
import { getSession } from '../auth';

export default async function Page() {
  const session = await getSession();
  console.log('loaded root, is user logged in:', Boolean(session?.user));

  if (session) {
    const { supabaseAccessToken } = session;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      },
    );
    // Now you can query with RLS enabled.
    const { data } = await supabase.from('users').select('*');
    console.log('can query from database:', Boolean(data));
  }

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
