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
    <nav className="flex justify-center w-full h-header sticky top-0 bg-black/50 backdrop-blur-lg backdrop-saturate-200 shadow-[inset_rgba(255_255_255_/_0.15)_0_-1px] z-10">
      <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
        <Link href="/">POSTPAPER</Link>
        {session?.user ? (
          <>
            <div className="flex items-center gap-4">
              Hey, {session.user.user_metadata.name}!
              <Link href="/write">write</Link>
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
