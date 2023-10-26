import { ReactNode } from 'react';

export function PageRoot({ children }: { children: ReactNode }) {
  return (
    <div className="py-16 px-3 min-h-remaining flex flex-col items-center">
      {children}
    </div>
  );
}
