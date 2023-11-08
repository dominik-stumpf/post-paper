import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BrandLogo } from './brand-logo';

export function BrandLink() {
  return (
    <Button asChild variant={'ghost'} className="p-0 hover:bg-transparent">
      <Link href="/" className="flex gap-2 items-center">
        <div className="w-7 h-7">
          <BrandLogo />
        </div>
        <span className="text-xl font-bold tracking-tighter text-foreground">
          PostPaper
        </span>
      </Link>
    </Button>
  );
}
