import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export function useClientUser() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (user !== null) {
      return;
    }

    try {
      (async () => {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        const newUser = session?.user;

        if (error) {
          return;
        }
        if (!newUser) {
          return;
        }

        setUser(newUser);
      })();
    } catch (e) {
      console.error(e);
    }
  }, [supabase, user]);

  return user;
}
