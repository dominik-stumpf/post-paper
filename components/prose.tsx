import { ReactNode } from 'react';

export const proseClassName =
  'max-w-prose prose w-full lg:prose-lg prose-fuchsia prose-invert';

export function Prose({ children }: { children: ReactNode }) {
  return <article className={proseClassName}>{children}</article>;
}
