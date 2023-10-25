import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit, EXIT, SKIP } from 'unist-util-visit';
type Root = import('mdast').Root;
type Visitor = import('unist-util-visit').BuildVisitor<Root>;

export class PaperParser {
  private readonly minTitleLength = 16;
  private readonly maxTitleLength = 128;
  private readonly minContentLength = 128;
  private readonly conditionStates = {
    isFirstMainTitleFirstElement: false,
    isMainTitleBetweenLengthMargins: false,
    isPaperBetweenLengthMargins: false,
  };

  constructor(private readonly paper: string) {}

  parseCard() {
    const mdastTree = fromMarkdown(this.paper.slice(0, 256));
    let title = '';
    let content = '';
    let isIteratingHeader = false;

    function transform(
      ...[node, index, parent]: Parameters<Visitor>
    ): ReturnType<Visitor> {
      const isRootChild = parent?.type === 'root';

      if (
        isRootChild &&
        index === 0 &&
        node.type === 'heading' &&
        node.depth === 1
      ) {
        isIteratingHeader = true;
      }

      if (
        isIteratingHeader &&
        isRootChild &&
        index !== undefined &&
        index > 0
      ) {
        isIteratingHeader = false;
      }

      if (isIteratingHeader) {
        if ('value' in node) {
          title += node.value;
        }
      } else if ('value' in node) {
        content += node.value;
      }
    }

    visit(mdastTree, transform);

    title = title.replaceAll('\n', ' ');
    content = content.replaceAll('\n', ' ');

    return { title: title, content: content };
  }
}
