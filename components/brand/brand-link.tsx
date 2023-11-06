import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BrandLogo } from './brand-logo';

export function BrandLink() {
  return (
    <Button asChild variant={'ghost'} className="hover:bg-transparent p-0">
      <Link href="/" className="flex gap-2 items-center">
        <div className="w-7 h-7">
          <BrandLogo />
        </div>
        <span className="font-bold tracking-tighter text-xl">PostPaper</span>
      </Link>
    </Button>
  );
}
