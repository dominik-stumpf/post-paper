import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link
      className="text-xl uppercase leading-none text-left tracking-tight font-medium text-primary flex pl-4"
      href="/"
    >
      <Image
        src="/assets/svg/feather-transparent-black.svg"
        alt={'logo'}
        width={48}
        height={48}
        className="invert"
      />
      {/* <div className="-ml-4">postpaper</div> */}
    </Link>
  );
}
