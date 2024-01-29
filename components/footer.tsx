import { ThemeToggle } from './theme-toggle';
import { PageMargin } from './page-margin';
import { Separator } from '@/components/ui/separator';
import { links } from '@/app/site-data';
import { Github } from 'lucide-react';
import { Anchor } from '@/components/ui/anchor';
import { BrandLogo } from '@/components/brand/brand-logo';

export function Footer() {
  return (
    <footer>
      <PageMargin>
        <div className="grid gap-10 pb-16 pt-24 md:grid-cols-2">
          <Anchor
            href="/"
            className="col-span-2 flex items-center gap-3 justify-self-center no-underline hover:text-foreground"
          >
            <div className="size-10">
              <BrandLogo />
            </div>
            <span className="text-3xl font-bold tracking-tight">PostPaper</span>
          </Anchor>
          <div className="col-span-2 flex gap-6 justify-self-center">
            <Anchor variant="loud" href="site-policy">
              Privacy
            </Anchor>
            <Separator orientation="vertical" />
            <Anchor variant="loud" href="site-policy">
              Terms
            </Anchor>
          </div>
          <Separator className="col-span-2 mt-4" />
          <div className="col-span-2 flex items-center gap-4 justify-self-center md:col-span-1 md:col-start-2 md:justify-self-end">
            <Anchor external href={links.postPaperGithub} variant="dim">
              <Github />
            </Anchor>
            <Separator orientation="vertical" />
            <ThemeToggle />
          </div>
          <div className="col-span-2 self-center justify-self-center text-muted-foreground md:col-span-1 md:row-start-4 md:justify-self-start">
            Copyright © 2023 PostPaper. All rights reserved.
          </div>
        </div>
      </PageMargin>
    </footer>
  );
}
