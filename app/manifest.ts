import type { MetadataRoute } from 'next';
import { iconSizes } from './icon';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PostPaper',
    short_name: 'PostPaper',
    description: 'Productivity-oriented posting platform',
    theme_color: '#fff',
    background_color: '#000',
    display: 'standalone',
    start_url: '/',
    // @ts-expect-error - reason: maskable any is not an option
    icons: iconSizes.map((size) => ({
      src: `/icon/${size}`,
      sizes: `${size}x${size}`,
      type: 'image/png',
      purpose: 'maskable any',
    })),
  };
}
