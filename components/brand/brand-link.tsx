import { Anchor } from '@/components/ui/anchor';
import { cn } from '@/lib/utils';
import { BrandLogo } from './brand-logo';

export function BrandLink({ className }: { className?: string }) {
  return (
    <Anchor
      href="/"
      className={cn('flex items-center gap-2 no-underline', className)}
    >
      <div className="h-7 w-7">
        <BrandLogo />
      </div>
      <span className="text-xl font-bold tracking-tighter text-foreground">
        PostPaper
      </span>
    </Anchor>
  );
}
