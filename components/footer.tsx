import Link from 'next/link';
import { BrandLink } from '@/components/brand/brand-link';
import { PageRoot } from './page-root';
import { ModeToggle } from './mode-toggle';

export function Footer() {
  return (
    <footer className="flex justify-center w-full">
      <PageRoot onlyHorizontalBoundary>
        <div className="flex flex-col gap-4 items-center py-8 w-full lg:gap-8">
          <div className="flex flex-wrap gap-4 items-center md:gap-8">
            <BrandLink />
            <Link href="site-policy">Privacy Policy</Link>
            <Link href="site-policy#terms">Terms of Service</Link>
            <ModeToggle />
          </div>
          <div>© 2023 PostPaper. All rights reserved.</div>
        </div>
      </PageRoot>
    </footer>
  );
}
