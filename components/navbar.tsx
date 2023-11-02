import Link from 'next/link';
import { LogoutButton } from './logout-button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PageRoot } from './page-root';
import { BrandLogo } from './brand-logo';

export const dynamic = 'force-dynamic';

export async function Navbar() {
  const {
    data: { session },
  } = await createServerComponentClient<Database>({
    cookies,
  }).auth.getSession();

  return (
    <nav className="isolate flex justify-center w-full h-header sticky top-0 bg-black/50 backdrop-blur-lg backdrop-saturate-200 shadow-[inset_rgba(255_255_255_/_0.15)_0_-1px] z-40">
      <PageRoot onlyHorizontalBoundary>
        <div className="flex items-center justify-between w-full p-3 text-sm text-foreground">
          <BrandLogo />
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
      </PageRoot>
    </nav>
  );
}
