import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { BrandLogo } from './brand-logo';

export function BrandLink() {
  return (
    <Button
      asChild
      variant={'ghost'}
      className="p-0 hover:border-transparent hover:bg-transparent"
    >
      <Anchor href="/" className="flex items-center gap-2 no-underline">
        <div className="h-7 w-7">
          <BrandLogo />
        </div>
        <span className="text-xl font-bold tracking-tighter text-foreground">
          PostPaper
        </span>
      </Anchor>
    </Button>
  );
}
