import Link from 'next/link';
import { BrandLink } from '@/components/brand/brand-link';
import { PageRoot } from './page-root';
import { ModeToggle } from './mode-toggle';

export function Footer() {
  return (
    <footer className="w-full flex justify-center">
      <PageRoot onlyHorizontalBoundary>
        <div className="w-full flex flex-col items-center gap-8 py-8">
          <div className="flex gap-8 items-center">
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
