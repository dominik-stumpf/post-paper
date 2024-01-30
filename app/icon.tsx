import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const iconSizes = [48, 72, 96, 128, 144, 192, 384, 512] as const;
export type IconSize = (typeof iconSizes)[number];
export function getValidIconPath(size: IconSize) {
  return `/icon/${size}`;
}
export function generateImageMetadata() {
  return iconSizes.map((size) => ({
    contentType: 'image/png',
    size: { width: size, height: size },
    id: size,
    alt: 'feather on circle',
  }));
}

const featherPath =
  'M125.868 66.6548C147.358 47.9219 144.057 8.75288 140.088 4.79626C137.871 2.58744 132.666 13.1778 118.799 21.6723C118.303 27.6565 117.384 33.2248 116.145 38.4704C115.464 33.9663 114.674 29.355 113.753 24.6089C107.668 27.8771 100.435 30.8058 92.5423 33.4089C89.2363 42.3272 85.1352 50.4515 80.9207 58.4624C80.7594 51.4528 80.5618 44.412 80.2105 37.2135C67.7273 40.8627 55.0337 44.3201 45.4001 48.8948C38.8671 51.9812 33.9028 57.6001 31.6498 64.4383C29.4871 71.0085 27.7866 78.0391 26.7966 85.7765C25.294 78.4073 24.1137 71.3611 23.1812 64.5594C7.00693 81.5512 11.034 109.61 18.7026 120.936C18.9664 128.067 20.3559 133.73 21.3324 136.256C23.5423 143.487 26.0967 149.987 30.9077 157.722C31.4303 158.562 32.3935 158.211 32.2627 157.23C31.3392 150.301 29.2677 134.768 29.2677 134.768C28.8746 132.799 28.6549 129.644 28.6999 125.75C36.0463 123.673 45.569 112.794 62.8869 104.086C55.3661 102.474 48.0938 101.107 41.1406 100.06C49.1052 98.2094 57.965 97.2473 67.3661 96.827C74.6094 96.5061 81.7919 94.7498 88.3514 91.6577C99.5112 86.3415 111.793 79.5583 121.625 70.7691C116.713 69.4677 111.74 68.1161 106.734 66.7199C113.264 66.8497 119.673 66.8598 125.868 66.6548Z';

const BrandLogo = () => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    width="155"
    height="163"
    viewBox="0 0 155 163"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    <rect y="5" width="155" height="155" rx="77.5" fill="black" />
    <mask
      id="path-2-outside-1_55_6"
      maskUnits="userSpaceOnUse"
      x="8"
      y="0.5"
      width="139"
      height="162"
      fill="black"
    >
      <rect fill="white" x="8" y="0.5" width="139" height="162" />
      <path d={featherPath} />
    </mask>
    <path d={featherPath} fill="white" />
    <path
      d={featherPath}
      stroke="black"
      stroke-width="8"
      mask="url(#path-2-outside-1_55_6)"
    />
  </svg>
);

export default function Icon({ id }: { id: IconSize }) {
  const metadata = generateImageMetadata();
  const target = metadata.find((h) => h.id === id);

  return new ImageResponse(
    <div
      tw="relative flex h-full w-full items-center justify-center bg-transparent"
      style={{ padding: '10%' }}
    >
      <BrandLogo />
    </div>,
    { ...target?.size },
  );
}
