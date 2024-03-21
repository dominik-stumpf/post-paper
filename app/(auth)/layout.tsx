import { PageMargin } from '@/components/page-margin';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <PageMargin className="flex min-h-remaining flex-col items-center">
        {children}
      </PageMargin>
    </>
  );
}
