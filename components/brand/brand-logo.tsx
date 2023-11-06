import Feather from '@/public/assets/svg/feather.svg';

export function BrandLogo() {
  return (
    <div className="w-full h-full relative aspect-square">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="inset-0 fill-foreground absolute"
      >
        <title>Brand logo background circle</title>
        <circle cx="50%" cy="50%" r="48%" />
      </svg>
      <Feather className="inset-0 w-full h-full fill-foreground stroke-background stroke-[0.6rem] absolute invert" />
    </div>
  );
}
