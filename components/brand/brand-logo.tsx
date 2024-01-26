import Feather from '@/public/assets/svg/feather.svg';

export function BrandLogo() {
  return (
    <div className="relative aspect-square h-full w-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="absolute inset-0 fill-foreground"
      >
        <title>Brand logo background circle</title>
        <circle cx="50%" cy="50%" r="48%" />
      </svg>
      <Feather className="absolute inset-0 h-full w-full fill-background stroke-foreground stroke-[0.6rem]" />
    </div>
  );
}
