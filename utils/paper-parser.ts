import { fromMarkdown } from 'mdast-util-from-markdown';

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

    const heading = mdastTree.children[0];
    let title = '';

    if (heading.type === 'heading' && heading.depth === 1) {
      title = heading.children
        .flatMap((context) => {
          if (context.type === 'text') {
            return context.value;
          } else {
            console.log('context', context);
          }
          return '';
        })
        .join('');
    }

    return { title: title, content: 'content' };
  }

  parse() {
    // let sliceEnd = 2;
    // let contentLength = 0;

    // this.paper.read(() => {
    //   const nodes = this.paper._nodeMap;

    //   const root = nodes.get('root');
    //   if (!root) return;

    //   const firstNode = nodes.get(root.__first);
    //   if (firstNode === undefined) return;

    //   this.conditionStates.isFirstMainTitleFirstElement =
    //     firstNode.__tag === 'h1';
    //   const firstNodeLength = firstNode.getTextContentSize();

    //   this.conditionStates.isMainTitleBetweenLengthMargins =
    //     firstNodeLength > this.minTitleLength &&
    //     firstNodeLength < this.maxTitleLength;

    //   let nextSibling = firstNode.getNextSibling();

    //   if (nextSibling === null) return;

    //   contentLength = nextSibling.getTextContentSize();

    //   while (contentLength < this.minContentLength) {
    //     nextSibling = nextSibling?.getNextSibling();
    //     if (nextSibling === null) {
    //       this.conditionStates.isMainTitleBetweenLengthMargins = false;
    //       break;
    //     }
    //     sliceEnd += 1;
    //     contentLength += nextSibling.getTextContentSize();
    //   }

    //   this.conditionStates.isPaperBetweenLengthMargins =
    //     contentLength > this.minContentLength;
    // });

    // console.log(this.conditionStates);

    // const truncatedPaper = this.paper.toJSON();
    // const _fullPaper = this.paper.toJSON();

    // truncatedPaper.root.children = truncatedPaper.root.children.slice(
    //   0,
    //   sliceEnd,
    // );

    // const remainingCharTruncation = contentLength - this.minContentLength;

    // const lastChild = (
    //   truncatedPaper.root.children.at(-1) as simplifiedTextNode
    // ).children;

    // this.truncateRecursively(lastChild, remainingCharTruncation);

    const markdown = '';
    // this.paper.read(() => {
    //   markdown = $convertToMarkdownString();
    // });
    // return { fullPaper: markdown };
    return markdown;
    // return { fullPaper: $convertToMarkdownString(TRANSFORMERS, this.paper) };
    // return {
    //   fullPaper: JSON.stringify(fullPaper),
    //   truncatedPaper: JSON.stringify(truncatedPaper),
    // };
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
