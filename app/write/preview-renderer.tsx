import Markdown from 'react-markdown';
import {
  rehypePlugins,
  remarkPlugins,
  className,
} from '@/components/render-paper/render-paper';

interface PreviewRendererProps {
  positionOffset: number;
  children: string;
}

export function PreviewRenderer({
  positionOffset,
  children,
}: PreviewRendererProps) {
  return (
    <Markdown
      className={className}
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins}
    >
      {children}
    </Markdown>
  );
}
