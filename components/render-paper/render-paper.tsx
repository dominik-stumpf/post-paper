import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { PluggableList } from 'unified';
import '@/styles/classic-dark.css';
import '@/styles/classic-light.css';

interface RenderPaperProps {
  children: string;
}

export const className =
  'w-full max-w-prose prose lg:prose-lg dark:prose-invert prose-pre:p-0';
export const rehypePlugins = [rehypeHighlight];
export const remarkPlugins = [remarkGfm];

export function RenderPaper({ children }: RenderPaperProps) {
  return (
    <>
      <Markdown
        className={className}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {children}
      </Markdown>
    </>
  );
}
