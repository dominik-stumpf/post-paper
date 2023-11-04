import Feather from '@/public/assets/svg/feather.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function BrandLogo() {
  return (
    <Button asChild variant={'ghost'} className="hover:bg-transparent">
      <Link href="/" className="flex gap-2 items-center">
        <span className="w-7 h-7 relative">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="h-7 w-7 fill-foreground absolute"
          >
            <title>Brand logo background circle</title>
            <circle cx="50%" cy="50%" r="48%" />
          </svg>
          <Feather className="h-7 w-7 fill-foreground stroke-background stroke-[0.6rem] absolute invert" />
        </span>
        <span className="font-bold tracking-tighter text-xl">PostPaper</span>
      </Link>
    </Button>
  );
}
