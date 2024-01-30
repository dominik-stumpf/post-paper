'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Github, Google } from './icons';

type Extends<T, U extends T> = U;
type SupportedProvider = Extends<Provider, 'github' | 'google'>;

const supportedProviderData = {
  github: {
    providerName: 'GitHub',
    Icon: Github,
  },
  google: {
    providerName: 'Google',
    Icon: Google,
  },
} satisfies Record<SupportedProvider, object>;

export function OauthSignIn({ provider }: { provider: SupportedProvider }) {
  const { Icon, providerName } = supportedProviderData[provider];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function signInOauthUser() {
    const requestUrl = document.location;
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    });

    if (error) {
      toast({
        variant: 'destructive',
        description: error.message,
        title: 'Failed to authenticate',
      });
      return;
    }

    router.refresh();
  }

  return (
    <Button
      variant={'outline'}
      className="space-x-3"
      loading={loading}
      onClick={() => {
        setLoading(true);
        signInOauthUser();
      }}
      size="lg"
    >
      {loading || <Icon className="h-5 w-5 dark:invert" />}
      <span>Continue with {providerName}</span>
    </Button>
  );
}
