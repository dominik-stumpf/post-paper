import init, { md_to_hast } from '@/markdown-parser-rs/pkg';
import type { Root as HastRoot, Nodes as HastNodes } from 'hast';
import { type BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';
import { WorkerMessage, activeElementId } from './constants';

type HastVisitor = BuildVisitor<HastRoot>;
const renderTimes: number[] = [];
const renderTimesSize = 8;

function arithmeticMean(numbers: number[]) {
  return (
    numbers.reduce((acc, number) => {
      return acc + number;
    }, 0) / numbers.length
  );
}

self.addEventListener('message', async ({ data }) => {
  const { type } = data;
  if (type === WorkerMessage.Parse) {
    const parsedData = await parseMarkdown(data);
    self.postMessage(parsedData);
  }
});

async function parseMarkdown({
  source,
  offset,
}: {
  source: string;
  offset: number;
}) {
  // const startTime = performance.now();

  await init();
  const newHast = rehypeMarkPositionOffset(
    JSON.parse(md_to_hast(source)),
    offset,
  );

  // const renderTime = performance.now() - startTime;
  // if (renderTimes.length > renderTimesSize) {
  //   renderTimes.shift();
  // }
  // renderTimes.push(renderTime);
  // console.log(
  //   'parsing:',
  //   Math.round(renderTime),
  //   'avg:',
  //   Math.round(arithmeticMean(renderTimes)),
  // );

  return rehypeMarkPositionOffset(newHast, offset);
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
