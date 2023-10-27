import { useEffect, useState } from 'react';
import { PreviewRenderer } from './preview-renderer';
import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import {
  remarkPlugins,
  rehypePlugins,
  className,
} from '@/components/render-paper/render-paper';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';

function processMdToHast(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype)
    .use(rehypePlugins);

  const mdastTree = processor.parse(md);
  const hastTree: HastNodes = processor.runSync(mdastTree, md);

  return hastTree;
}

export function Preview({
  markdown,
  positionOffset,
}: { markdown: string; positionOffset: number }) {
  // const [ParsedMarkdown, setParsedMarkdown] = useState(markdown);
  const [hast, setHast] = useState<HastNodes>();

  useEffect(() => {
    // setParsedMarkdown(markdown);
    setHast(processMdToHast(markdown));
  }, [markdown]);

  useEffect(() => {
    console.log(positionOffset);
    // document
    //   .querySelector('#caret-active-node')
    //   ?.scrollIntoView({ behavior: 'smooth' });
  }, [positionOffset]);

  return (
    <div className={`overflow-y-scroll h-full ${className}`}>
      {hast && <PreviewRenderer>{hast}</PreviewRenderer>}
    </div>
  );
}
