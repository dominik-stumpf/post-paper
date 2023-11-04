import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PageRoot } from './page-root';
import { BrandLogo } from './brand-logo';
import { Menu, PenSquare } from 'lucide-react';
import { Avatar } from './avatar';
import { ReactNode } from 'react';
import { UserActions } from './user-actions';
import { ModeToggle } from './ui/mode-toggle';

export const dynamic = 'force-dynamic';

function NavbarActions({ children }: { children: ReactNode }) {
  return <div className="md:flex gap-8 items-center hidden">{children}</div>;
}

function MenuActions({ children }: { children: ReactNode }) {
  return <div className="md:hidden">{children}</div>;
}

export async function Navbar() {
  const {
    data: { session },
  } = await createServerComponentClient<Database>({
    cookies,
  }).auth.getSession();

  return (
    <header
      className="isolate flex justify-center w-full h-header sticky top-0 bg-background/25 backdrop-blur-lg backdrop-saturate-150 z-30"
      style={{ boxShadow: 'inset 0 -1px hsl(var(--border))' }}
    >
      <PageRoot onlyHorizontalBoundary>
        <div className="flex items-center justify-between w-full h-full py-3 text-base">
          <BrandLogo />
          <NavbarActions>
            {session?.user ? (
              <>
                <Link href="/write" className="flex gap-2">
                  <PenSquare />
                  Write
                </Link>
                <UserActions>
                  <Avatar
                    imageSrc={session.user.user_metadata.avatar_url}
                    size="base"
                  />
                </UserActions>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex px-3 py-2 ml-auto no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
                >
                  Login
                </Link>
                <Link href="/signup">Signup</Link>
              </>
            )}
            <ModeToggle />
          </NavbarActions>
          <MenuActions>
            <Menu className="pointer" />
          </MenuActions>
        </div>
      </PageRoot>
    </header>
  );
}
