import { Footer } from '@/components/footer';
import { PageRoot } from '@/components/page-root';
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
      <PageRoot>
        <div className="flex h-full flex-col items-center justify-center">
          {children}
          <div className="h-header w-full" />
        </div>
      </PageRoot>
      <Footer />
    </>
  );
}
