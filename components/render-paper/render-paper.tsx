import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { PluggableList } from 'unified';
import './black-metal-bathory.css';
import './classic-dark.css';

export function RenderPaper({ children }: { children: string }) {
  const rehypePlugins: PluggableList = [rehypeHighlight];
  const remarkPlugins: PluggableList = [remarkGfm];

  return (
    <Markdown
      className={
        'max-w-prose prose lg:prose-lg w-full prose-fuchsia prose-invert prose-pre:p-0'
      }
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
    >
      {children}
    </Markdown>
  );
}
