import { ReactNode } from 'react';

interface PageRootProps {
  children: ReactNode;
  fullPage?: boolean;
}

export function PageRoot({ children, fullPage = false }: PageRootProps) {
  return (
    <div
      className={`py-16 px-3 min-h-remaining max-w-screen-lg mx-auto ${
        fullPage && 'h-remaining'
      }`}
    >
      {children}
    </div>
  );
}
