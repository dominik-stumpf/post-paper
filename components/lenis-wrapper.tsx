'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import type { ReactNode } from 'react';

export function LenisWrapper({ children }: { children: ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
