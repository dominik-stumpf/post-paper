import type { ReactNode } from 'react';

interface PageRootProps {
  children: ReactNode;
  fullPage?: boolean;
  onlyHorizontalBoundary?: boolean;
}

export function PageRoot({
  children,
  fullPage = false,
  onlyHorizontalBoundary = false,
}: PageRootProps) {
  return (
    <div
      className={`w-full max-w-screen-lg px-3 md:px-6 ${
        !onlyHorizontalBoundary
          ? 'mx-auto min-h-remaining py-4 md:py-8 lg:py-16'
          : ''
      } ${fullPage ? 'h-auto md:h-remaining' : ''}`}
    >
      {children}
    </div>
  );
}
