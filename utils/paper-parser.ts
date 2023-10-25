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
    let title = '';
    let content = '';

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

    function transform(
      ...[node, index, parent]: Parameters<Visitor>
    ): ReturnType<Visitor> {
      iterationCount += 1;
      console.log('visiting', node, iterationCount);
      if (iterationCount > 5) {
        return EXIT;
      }
      if (parent?.type === 'root' && index === 0 && node.type === 'heading') {
        // const child = node.children.splice(0, 1)[0];
        const flatChildren = node.children.flat(Infinity);
        for (const child of flatChildren) {
          if ('value' in child) {
            console.log(child.value);
          }
        }
        return [SKIP, index + 1];
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
