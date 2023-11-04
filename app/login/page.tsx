import { GithubSignIn } from '@/components/github-sign-in';
import { PageRoot } from '@/components/page-root';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Messages from './messages';
import { LoginForm } from './form';

export const dynamic = 'force-dynamic';

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <PageRoot fullPage>
      <div className="h-full flex items-center justify-center flex-col">
        <LoginForm />
        <GithubSignIn />
        <div className="h-header w-full" />
      </div>
    </PageRoot>
  );
}
