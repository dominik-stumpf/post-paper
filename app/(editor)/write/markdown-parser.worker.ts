import type { Root as HastRoot, Nodes as HastNodes } from 'hast';
import { type BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import { unified } from 'unified';
// import rehypeHighlight from 'rehype-highlight';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

self.addEventListener('message', async (event) => {
  const parsedData = await parseMarkdown(event.data);
  self.postMessage(parsedData);
});

type HastVisitor = BuildVisitor<HastRoot>;
export const offsetId = 'offset-position-active';

async function parseMarkdown(source: string) {
  const startTime = performance.now();
  const processor = unified()
    .use(remarkParse)
    .use([remarkGfm, remarkFrontMatter])
    .use(remarkToRehype);
  // .use(rehypeHighlight, { detect: true });

  const newMdast = processor.parse(source);
  const newHast = await processor.run(newMdast, source);
  const renderTime = performance.now() - startTime;
  console.log('md to hast parsing time:', Math.round(renderTime));

  return rehypeMarkPositionOffset(0, newHast);
}

export function rehypeMarkPositionOffset(offset: number, hast: HastNodes) {
  function transform(...[node, _index, _parent]: Parameters<HastVisitor>) {
    if (node.type !== 'element') return CONTINUE;

    const startOffset = node.position?.start.offset;
    const endOffset = node.position?.end.offset;

    if (typeof startOffset !== 'number' || typeof endOffset !== 'number') {
      return SKIP;
    }

    node.properties = {
      'data-offset-start': startOffset,
      'data-offset-end': endOffset,
    };

    return SKIP;

    // node.properties = {};
    //
    // if (startOffset <= offset && offset <= endOffset) {
    //   node.properties.id = offsetId;
    // }
    //
    // if (endOffset + 1 === offset) {
    //   node.properties.id = offsetId;
    // }
    //
    // return SKIP;
  }

  visit(hast, transform);
  return hast;
}
