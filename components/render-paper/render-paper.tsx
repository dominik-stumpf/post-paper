import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { PluggableList } from 'unified';
import './classic-dark.css';

interface RenderPaperProps {
  children: string;
}

export const className =
  'max-w-prose prose lg:prose-lg w-full prose-invert prose-pre:p-0';
export const rehypePlugins: PluggableList = [rehypeHighlight];
export const remarkPlugins: PluggableList = [remarkGfm];

export function RenderPaper({ children }: RenderPaperProps) {
  return (
    <Markdown
      className={className}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
    >
      {children}
    </Markdown>
  );
}
