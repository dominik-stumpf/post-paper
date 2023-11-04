import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PageRoot } from '../page-root';
import { BrandLogo } from '../brand-logo';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { UserActions } from './user-actions';

export const dynamic = 'force-dynamic';

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
          <div className="flex items-center h-full gap-6">
            <Button size="icon" variant={'ghost'}>
              <Search />
            </Button>
            <Separator orientation="vertical" />
            <UserActions session={session} />
          </div>
        </div>
      </PageRoot>
    </header>
  );
}
