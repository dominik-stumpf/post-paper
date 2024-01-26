import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BrandLogo } from './brand-logo';

export function BrandLink() {
  return (
    <Button asChild variant={'ghost'} className="p-0 hover:bg-transparent">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-7 w-7">
          <BrandLogo />
        </div>
        <span className="text-xl font-bold tracking-tighter text-foreground">
          PostPaper
        </span>
      </Link>
    </Button>
  );
}
