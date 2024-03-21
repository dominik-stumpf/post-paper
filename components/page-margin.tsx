import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function PageMargin({
  children,
  className = '',
  verticalMargin = false,
}: {
  children: ReactNode;
  className?: string;
  verticalMargin?: boolean;
}) {
  return (
    <div
      className={cn(
        'mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8',
        verticalMargin && 'py-8 lg:py-16',
        className,
      )}
    >
      {children}
    </div>
  );
}
