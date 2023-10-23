// import { fromMarkdown } from 'mdast-util-from-markdown';
import { Markdown } from './md-parser';

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
    // const mdastTree = fromMarkdown(this.paper);

    // const heading = mdastTree.children[0];
    // let title = '';

    // if (heading.type === 'heading' && heading.depth === 1) {
    //   title = heading.children
    //     .flatMap((context) => {
    //       if (context.type === 'text') {
    //         return context.value;
    //       } else {
    //         console.log('context', context);
    //       }
    //       return '';
    //     })
    //     .join('');
    // }
    Markdown({ children: this.paper });

    return { title: 'title', content: 'content' };
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
