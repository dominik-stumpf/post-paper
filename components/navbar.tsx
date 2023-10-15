import Link from 'next/link';
import { LogoutButton } from './logout-button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function Navbar() {
  const {
    data: { user },
  } = await createServerComponentClient<Database>({ cookies }).auth.getUser();

  return (
    <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
      <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
        {user ? (
          <>
            <Link href="/write">write</Link>
            <div className="flex items-center gap-4">
              Hey, {user.email}!
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
