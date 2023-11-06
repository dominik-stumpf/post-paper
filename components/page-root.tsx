import { ReactNode } from 'react';

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
      className={`px-3 md:px-6 max-w-screen-lg w-full ${
        !onlyHorizontalBoundary
          ? 'py-4 mx-auto md:py-8 lg:py-16 min-h-remaining'
          : ''
      } ${fullPage ? 'h-auto md:h-remaining' : ''}`}
    >
      {children}
    </div>
  );
}
