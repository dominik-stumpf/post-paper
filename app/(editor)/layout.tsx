import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface WriteLayoutProps {
  children: React.ReactNode;
}

export default async function WriteLayout({ children }: WriteLayoutProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  return <>{children}</>;
}
