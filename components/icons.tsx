import { cn } from '@/lib/utils';
import GithubIcon from '@/public/assets/vectors/github.svg';
import GoogleIcon from '@/public/assets/vectors/google.svg';
import Image, { type StaticImageData } from 'next/image';

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
