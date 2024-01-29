import { BrandLink } from '@/components/brand/brand-link';
import { PageMargin } from '@/components/page-margin';
import { Button } from '@/components/ui/button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Search } from 'lucide-react';
import { cookies } from 'next/headers';
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
      className="sticky top-0 isolate z-30 flex h-header w-full justify-center bg-background/25 backdrop-blur-lg backdrop-saturate-150"
      style={{ boxShadow: 'inset 0 -1px hsl(var(--border))' }}
    >
      <PageMargin className="flex h-full w-full items-center justify-between gap-4 py-3 text-base">
        <BrandLink />
        <div className="flex h-full min-w-0 items-center justify-end gap-4">
          <Button
            variant={'outline'}
            className="flex w-64 min-w-0 justify-start gap-2 truncate font-normal text-muted-foreground"
            size="sm"
            disabled
          >
            <div>
              <Search className="h-4 w-4" />
            </div>
            Search
            <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs font-medium text-foreground lg:inline-flex">
              /
            </kbd>
          </Button>
          <UserActions session={session} />
        </div>
      </PageMargin>
    </header>
  );
}
