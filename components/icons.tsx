import GoogleIcon from '@/public/assets/svg/google.svg';
import GithubIcon from '@/public/assets/svg/github.svg';
import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

function IconTemplate({
  image,
  alt,
  className,
}: {
  image: StaticImageData;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={image}
      alt={alt}
      className={cn('size-6 dark:invert', className)}
    />
  );
}

export function Google({ className }: { className?: string }) {
  return (
    <IconTemplate image={GoogleIcon} alt="google logo" className={className} />
  );
}

export function Github({ className }: { className?: string }) {
  return (
    <IconTemplate image={GithubIcon} alt="github logo" className={className} />
  );
}
