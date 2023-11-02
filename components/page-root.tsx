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
      className={`px-3 max-w-screen-lg w-full
      ${!onlyHorizontalBoundary && 'py-16 min-h-remaining mx-auto'}
      ${fullPage && 'h-remaining'}`}
    >
      {children}
    </div>
  );
}
