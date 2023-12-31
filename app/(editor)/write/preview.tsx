import {
  className,
  rehypePlugins,
  remarkPlugins,
} from '@/components/render-paper/render-paper';
import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import { useEffect, useState } from 'react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';
import { PreviewRenderer } from './preview-renderer';

type HastVisitor = BuildVisitor<HastRoot>;

export const offsetId = 'offset-position-active';

export function markHastOffset(offset: number, hast: HastNodes) {
  visit(hast, transform);

  function transform(
    ...[node, _index, _parent]: Parameters<HastVisitor>
  ): ReturnType<HastVisitor> {
    if (node.type !== 'element') return CONTINUE;

    const startOffset = node.position?.start.offset;
    const endOffset = node.position?.end.offset;

    node.properties = {};
    if (
      typeof startOffset === 'number' &&
      typeof endOffset === 'number' &&
      startOffset <= offset &&
      offset <= endOffset
    ) {
      node.properties.id = offsetId;
      // console.log(node);
      // return EXIT;
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
