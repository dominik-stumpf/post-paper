import { ReactNode } from 'react';

export function Prose({ children }: { children: ReactNode }) {
  return (
    <article className="prose w-full lg:prose-lg prose-fuchsia prose-invert prose-code:bg-fuchsia-500/20 prose-code:text-fuchsia-500 py-16">
      {children}
    </article>
  );
}
