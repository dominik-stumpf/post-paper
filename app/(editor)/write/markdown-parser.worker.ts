import init, { md_to_hast } from '@/markdown-parser-rs/pkg';
import type { Root as HastRoot, Nodes as HastNodes } from 'hast';
import { type BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';

type HastVisitor = BuildVisitor<HastRoot>;

self.addEventListener('message', async (event) => {
  const parsedData = await parseMarkdown(event.data);
  self.postMessage(parsedData);
});

async function parseMarkdown(source: string) {
  const startTime = performance.now();
  await init();
  const newHast = JSON.parse(md_to_hast(source));
  const renderTime = performance.now() - startTime;
  console.log('md to hast parsing time:', Math.round(renderTime));

  return rehypeMarkPositionOffset(newHast);
}

export function rehypeMarkPositionOffset(hast: HastNodes) {
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
  }

  visit(hast, transform);
  return hast;
}
