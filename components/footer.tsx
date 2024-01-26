import { BrandLink } from '@/components/brand/brand-link';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { PageMargin } from './page-margin';

export function Footer() {
  return (
    <footer className="flex w-full justify-center">
      <PageMargin>
        <div className="flex w-full flex-col items-center gap-4 py-8 lg:gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <BrandLink />
            <Link href="site-policy">Privacy Policy</Link>
            <Link href="site-policy#terms">Terms of Service</Link>
            <ModeToggle />
          </div>
          <div className="self-start text-muted-foreground sm:self-auto">
            © 2023 PostPaper. All rights reserved.
          </div>
        </div>
      </PageMargin>
    </footer>
  );
}
