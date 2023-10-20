import { proseClassName } from '@/components/prose';
import { JetBrains_Mono } from 'next/font/google';
import Markdown from 'react-markdown';
import placeholder from './placeholder.md';

const jetbrainsMono = JetBrains_Mono({
  variable: '--mono',
  subsets: ['latin'],
});

export function Editor() {
  return (
    <>
      <Markdown
        className={`${proseClassName} min-h-[75vh] outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black ${jetbrainsMono.variable} prose-code:font-[var(--mono)]`}
      >
        {placeholder}
      </Markdown>
    </>
  );
}
