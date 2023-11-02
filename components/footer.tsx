import Link from 'next/link';
import { BrandLogo } from './brand-logo';
import { PageRoot } from './page-root';

export function Footer() {
  return (
    <footer className="w-full flex justify-center">
      <PageRoot onlyHorizontalBoundary>
        <div className="w-full flex flex-col items-center gap-8 py-8">
          <div className="flex gap-8 items-center">
            <BrandLogo />
            <Link href="site-policy">Privacy policy</Link>
            <Link href="site-policy#terms">Terms of use</Link>
          </div>
          <div>© 2023 PostPaper. All rights reserved.</div>
        </div>
      </PageRoot>
    </footer>
  );
}
