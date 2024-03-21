import init, { md_to_hast } from '@/markdown-parser-rs/pkg';
import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import { type BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';
import { WorkerMessage, activeElementId } from './constants';

type HastVisitor = BuildVisitor<HastRoot>;
export interface MarkdownParserWorkerResponse {
  hast: HastNodes;
  frontmatter?: Record<string, string>;
}

self.addEventListener('message', async ({ data }) => {
  const { type } = data;
  if (type === WorkerMessage.Parse) {
    try {
      const parsedData = await parseMarkdown(data);
      self.postMessage(parsedData);
    } catch {
      console.error('Failed to parse markdown');
    }
  }
});

async function parseMarkdown({
  source,
  offset,
}: {
  source: string;
  offset: number;
}) {
  await init();
  const { hast, frontmatter } = JSON.parse(md_to_hast(source));
  const newHast = rehypeMarkPositionOffset(hast, offset);

  let parsedFrontmatter: undefined | Record<string, string>;
  if (typeof frontmatter === 'string') {
    parsedFrontmatter = Object.fromEntries(
      frontmatter
        .trim()
        .split(/\n+/g)
        .map((entry) => {
          const substr = ': ';
          const index = entry.indexOf(substr);
          if (index === -1) {
            return [false, false];
          }
          return [entry.slice(0, index), entry.slice(index + substr.length)];
        })
        .filter(([key, value]) => Boolean(key) && Boolean(value)),
    );
  }

  return {
    hast: rehypeMarkPositionOffset(newHast, offset),
    frontmatter: parsedFrontmatter,
  };
}

export function rehypeMarkPositionOffset(hast: HastNodes, offset: number) {
  function transform(...[node, _index, _parent]: Parameters<HastVisitor>) {
    if (node.type !== 'element') return CONTINUE;

    const startOffset = node.position?.start.offset;
    const endOffset = node.position?.end.offset;

    if (typeof startOffset !== 'number' || typeof endOffset !== 'number') {
      return SKIP;
    }
    node.properties = {};

    if (startOffset <= offset && offset <= endOffset) {
      node.properties.id = activeElementId;
      return SKIP;
    }

    if (endOffset + 1 === offset) {
      node.properties.id = activeElementId;
    }

    return SKIP;
  }

  visit(hast, transform);
  return hast;
}
