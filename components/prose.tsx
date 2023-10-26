import { ReactNode } from 'react';

export const proseClassName =
  'max-w-prose prose lg:prose-lg w-full prose-fuchsia prose-invert';

export function Prose({ children }: { children: ReactNode }) {
  return <article className={proseClassName}>{children}</article>;
}
