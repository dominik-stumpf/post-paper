'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Provider } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import Github from '/public/assets/svg/github.svg';
import Google from '/public/assets/svg/google.svg';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

type Extends<T, U extends T> = U;
type SupportedProvider = Extends<Provider, 'github' | 'google'>;
interface ProviderData {
  providerName: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const supportedProviderData: Record<SupportedProvider, ProviderData> = {
  github: {
    providerName: 'GitHub',
    Icon: Github,
  },
  google: {
    providerName: 'Google',
    Icon: Google,
  },
};

export function OauthSignIn({ provider }: { provider: SupportedProvider }) {
  const { Icon, providerName } = supportedProviderData[provider];
  const router = useRouter();
  const { toast } = useToast();

  async function signInOauthUser() {
    const requestUrl = document.location;
    const supabase = createClientComponentClient<Database>();
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${requestUrl.origin}/api/auth/callback`,
        queryParams:
          provider === 'google'
            ? {
                access_type: 'offline',
                prompt: 'consent',
              }
            : {},
      },
    });

    if (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: error.message,
        title: 'Failed to authenticate.',
      });
      return;
    }

    router.refresh();
  }

  return (
    <Button
      variant={'outline'}
      className="flex gap-3 w-full"
      onClick={signInOauthUser}
      size="lg"
    >
      <Icon className="w-5 h-5 dark:invert" />
      Continue with {providerName}
    </Button>
  );
}
