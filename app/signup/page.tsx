import { PageRoot } from '@/components/page-root';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignupForm } from './signup-form';

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
        <SignupForm />
        <div className="h-header w-full" />
      </div>
    </PageRoot>
  );
}
