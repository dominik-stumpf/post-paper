import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import { visit, EXIT, CONTINUE, BuildVisitor } from 'unist-util-visit';

type HastVisitor = BuildVisitor<HastRoot>;

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
      node.properties.id = 'caret-active-node';
      console.log(node);
      return EXIT;
    }
  }

  return hast;
}
