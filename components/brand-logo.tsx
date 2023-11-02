import Feather from '@/public/assets/svg/feather.svg';
import Link from 'next/link';

export function BrandLogo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <span className="w-7 h-7 relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="h-7 w-7 fill-fg-color absolute"
        >
          <title>Brand logo background circle</title>
          <circle cx="50%" cy="50%" r="45%" />
        </svg>
        <Feather className="h-7 w-7 fill-fg-color stroke-bg-color stroke-[0.6rem] absolute invert" />
      </span>
      <span className="font-bold tracking-tighter text-xl">PostPaper</span>
    </Link>
  );
}
