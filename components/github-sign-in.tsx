'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function GithubSignIn() {
  async function handleClick() {
    const requestUrl = document.location;
    const supabase = createClientComponentClient<Database>();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error(error);
    } else {
      console.log('github signin', data);
    }
  }
  return (
    <button
      type="button"
      className="border border-gray-700 rounded px-4 py-2 mb-2"
      onClick={handleClick}
    >
      Sign in with Github
    </button>
  );
}
