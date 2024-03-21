import {
  type User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import type { AuthError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function useClientUser() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    if (user !== null) {
      return;
    }

    (async () => {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      setIsLoading(false);
      setError(authError);
      const newUser = session?.user;

      if (authError || !newUser) {
        return;
      }

      setUser(newUser);
    })();
  }, [supabase, user]);

  return { user, isLoading, error };
}
