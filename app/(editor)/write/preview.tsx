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
import { type BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';
import { PreviewRenderer } from './preview-renderer';
import remarkFrontMatter from 'remark-frontmatter';
import { cn } from '@/lib/utils';
import { useEditorStore } from './editor-store';

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
    // @ts-ignore
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkFrontMatter, ['yaml'])
    // .use(() => (tree) => {
    //   console.dir(tree);
    // })
    .use(remarkRehype)
    .use(rehypePlugins);

  const mdastTree = processor.parse(md);
  // @ts-ignore
  const hastTree: HastNodes = processor.runSync(mdastTree, md);

  return hastTree;
}

export function Preview() {
  const [hast, setHast] = useState<HastNodes>();
  const editorContent = useEditorStore((state) => state.editorContent);
  const positionOffset = useEditorStore((state) => state.positionOffset);

  useEffect(() => {
    setHast(markHastOffset(positionOffset, processMdToHast(editorContent)));
  }, [editorContent, positionOffset]);

  if (hast === undefined) {
    return null;
  }

  return (
    <article className={cn('mx-auto', className)}>
      {<PreviewRenderer>{hast}</PreviewRenderer>}
    </article>
  );
}
