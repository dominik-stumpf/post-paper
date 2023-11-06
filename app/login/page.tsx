import { PageRoot } from '@/components/page-root';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from './login-form';

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
      <div className="flex flex-col justify-center items-center h-full">
        <LoginForm />
        <div className="w-full h-header" />
      </div>
    </PageRoot>
  );
}
