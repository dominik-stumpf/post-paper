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
        <div className="flex flex-col justify-center items-center h-full">
          {children}
          <div className="w-full h-header" />
        </div>
      </PageRoot>
      <Footer />
    </>
  );
}
