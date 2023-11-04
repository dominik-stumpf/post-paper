'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Github } from 'lucide-react';

export function GithubSignIn() {
  async function handleClick() {
    const requestUrl = document.location;
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      className="flex gap-2 items-center"
      onClick={handleClick}
    >
      <Github /> Sign in with Github
    </button>
  );
}
