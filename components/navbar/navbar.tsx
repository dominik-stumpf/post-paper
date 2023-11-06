import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PageRoot } from '../page-root';
import { BrandLink } from '@/components/brand/brand-link';
import { Search } from 'lucide-react';
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
        <div className="flex justify-between items-center py-3 w-full h-full text-base">
          <BrandLink />
          <div className="flex gap-6 items-center h-full">
            <Button
              variant={'outline'}
              className="flex gap-2 justify-start w-64 font-normal text-muted-foreground shrink"
              size="sm"
            >
              <Search className="w-4 h-4" />
              Search
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                /
              </kbd>
            </Button>
            <UserActions session={session} />
          </div>
        </div>
      </PageRoot>
    </header>
  );
}
