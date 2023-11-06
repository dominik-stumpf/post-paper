'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import '@/styles/classic-dark.css';

export function CodeBlockStyle() {
  const theme = useTheme();
  useEffect(() => {
    if (theme.theme === 'light') {
      // @ts-expect-error
      import('@/styles/classic-light.css');
    } else {
      // @ts-expect-error
      import('@/styles/classic-dark.css');
    }
  }, [theme]);

  return null;
}
