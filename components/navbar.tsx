import Link from 'next/link';
import { LogoutButton } from './logout-button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function Navbar() {
  const {
    data: { session },
  } = await createServerComponentClient<Database>({
    cookies,
  }).auth.getSession();

  return (
    <nav className="flex justify-center w-full h-16 sticky top-0 bg-black/50 backdrop-blur-lg backdrop-saturate-200">
      <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
        <Link href="/">POSTPAPER</Link>
        {session?.user ? (
          <>
            <Link href="/write">write</Link>
            <div className="flex items-center gap-4">
              Hey, {session.user.email}!
              <LogoutButton />
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="flex px-3 py-2 ml-auto no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
