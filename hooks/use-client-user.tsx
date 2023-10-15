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
    (async () => {
      const {
        data: { user: newUser },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        return;
      }
      if (!newUser) {
        return;
      }

      setUser(newUser);
    })();
  }, [supabase, user]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  return user;
}
