import { useEffect, useRef, useState } from 'react';
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
import { visit, EXIT, CONTINUE, SKIP, BuildVisitor } from 'unist-util-visit';

type HastVisitor = BuildVisitor<HastRoot>;

export const offsetId = 'offset-position-active';

export function markHastOffset(offset: number, hast: HastNodes) {
  visit(hast, transform);

  function transform(
    ...[node, index, parent]: Parameters<HastVisitor>
  ): ReturnType<HastVisitor> {
    if (node.type !== 'element') return CONTINUE;

    const startOffset = node.position?.start.offset;
    const endOffset = node.position?.end.offset;

    if (
      typeof startOffset === 'number' &&
      typeof endOffset === 'number' &&
      startOffset <= offset &&
      offset <= endOffset
    ) {
      node.properties.id = offsetId;
      // console.log(node);
      // return EXIT;
    } else {
      node.properties = {};
    }

    return SKIP;
  }

  return hast;
}

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
  const [hast, setHast] = useState<HastNodes>();

  useEffect(() => {
    setHast(markHastOffset(positionOffset, processMdToHast(markdown)));
  }, [markdown, positionOffset]);

  return (
    <div className={`overflow-y-scroll h-full ${className}`}>
      {hast && <PreviewRenderer>{hast}</PreviewRenderer>}
    </div>
  );
}
