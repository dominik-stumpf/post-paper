import Feather from '@/public/assets/svg/feather.svg';
import Link from 'next/link';

export function BrandLogo() {
  return (
    <Link href="/" className="flex gap-1 items-center">
      <Feather className="h-5 w-5 fill-fg-color stroke-orange-500 stroke-[0.8rem]" />
      POSTPAPER
    </Link>
  );
}
