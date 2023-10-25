import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit, EXIT, SKIP } from 'unist-util-visit';
// import { Markdown } from './md-parser';
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
    // const processor = unified().use(remarkParse);
    // const mdastTree = processor.parse(this.paper);

    const mdastTree = fromMarkdown(this.paper);

    // const heading = mdastTree.children[0];

    // if (heading?.type === 'heading' && heading.depth === 1) {
    //   title = heading.children
    //     .flatMap((context) => {
    //       if (Object.hasOwn(context, 'value')) {
    //         return context.value;
    //       }
    //       // if (context.type === 'text') {
    //       //   return context.value;
    //       // } else {
    //       //   // console.log('context', context);
    //       // }
    //       return '';
    //     })
    //     .join('');
    // }

    // Markdown({ children: this.paper });
    let iterationCount = 0;
    let title = '';
    let content = '';
    let isIteratingHeader = false;

    function transform(
      ...[node, index, parent]: Parameters<Visitor>
    ): ReturnType<Visitor> {
      iterationCount += 1;
      console.log('visiting', node, iterationCount);
      if (iterationCount > 8) {
        return EXIT;
      }
      const isRootChild = parent?.type === 'root';

      if (isRootChild && index === 0 && node.type === 'heading') {
        isIteratingHeader = true;
      }
      if (
        !isIteratingHeader &&
        isRootChild &&
        index !== undefined &&
        index > 0
      ) {
        isIteratingHeader = false;
      }
      if (isIteratingHeader) {
        // console.log('iterating header', node);
        if ('value' in node) {
          title += node.value;
        }
      }
    }

    visit(mdastTree, transform);

    return { title: title, content: content };
  }

  truncateRecursively(
    element: simplifiedTextNode[] | undefined,
    truncateCharCount: number,
  ) {
    if (truncateCharCount <= 0 || element === undefined) return;

    let tracker = truncateCharCount;

    function truncate(elem: simplifiedTextNode[]) {
      for (let i = elem.length - 1; i >= 0; i -= 1) {
        if (tracker === 0) {
          return;
        }

        const { text, children } = elem[i];

        if (children) {
          truncate(children);
          if (children[0] === undefined) {
            delete elem[i];
          }
        }

        if (text) {
          if (tracker >= text.length) {
            tracker -= text.length;
            delete elem[i];
          } else {
            elem[i].text = text.slice(0, Math.abs(tracker - text.length));
            tracker = 0;
          }
        }
      }
    }

    truncate(element);
  }
}

interface simplifiedTextNode {
  text?: string;
  children?: simplifiedTextNode[];
}
