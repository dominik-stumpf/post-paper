import { BrandLink } from '@/components/brand/brand-link';
import { Anchor } from '@/components/ui/anchor';
import { Separator } from '@/components/ui/separator';
import { links } from '@/site-config/site-general';
import { PageMargin } from './page-margin';
import { ThemeToggle } from './theme-toggle';

export function Footer() {
  return (
    <footer>
      <PageMargin>
        <div className="grid grid-cols-1 justify-items-center gap-8 py-8">
          <BrandLink />
          <div className="flex items-center gap-6">
            <Anchor variant="loud" href="site-policy">
              Privacy
            </Anchor>
            <Separator orientation="vertical" />
            <Anchor variant="loud" href="site-policy">
              Terms
            </Anchor>
            <Separator orientation="vertical" />
            <Anchor
              external
              href={links.postPaperGithub}
              variant="loud"
              aria-label="github"
            >
              GitHub
            </Anchor>
          </div>
          <ThemeToggle />
        </div>
      </PageMargin>
    </footer>
  );
}
