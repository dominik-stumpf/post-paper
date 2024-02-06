import { className } from '@/components/render-paper/render-paper';
import { cn } from '@/lib/utils';
import { useEditorStore } from './editor-store';

import type { Nodes as HastNodes } from 'hast';
import {
  type ReactElement,
  useEffect,
  useState,
  useRef,
  type RefObject,
  useMemo,
} from 'react';

// import remarkParse from 'remark-parse';
// import remarkToRehype from 'remark-rehype';
// import { unified } from 'unified';
// import rehypeHighlight from 'rehype-highlight';
// import remarkFrontMatter from 'remark-frontmatter';
// import remarkGfm from 'remark-gfm';
// @ts-expect-error: the react types are missing.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime, type Components } from 'hast-util-to-jsx-runtime';

const components: Partial<Components> = {
  a: (props) => <a tabIndex={-1} {...props} />,
};

const production = { Fragment, jsx, jsxs, components };

// type HastVisitor = BuildVisitor<HastRoot>;
//
// export const offsetId = 'offset-position-active';

// export function rehypeMarkPositionOffset(offset: number, hast: HastNodes) {
//   function transform(...[node, _index, _parent]: Parameters<HastVisitor>) {
//     if (node.type !== 'element') return CONTINUE;
//
//     const startOffset = node.position?.start.offset;
//     const endOffset = node.position?.end.offset;
//
//     if (typeof startOffset !== 'number' || typeof endOffset !== 'number') {
//       return SKIP;
//     }
//
//     node.properties = {
//       'data-offset-start': startOffset,
//       'data-offset-end': endOffset,
//     };
//
//     return SKIP;
//
//     // node.properties = {};
//     //
//     // if (startOffset <= offset && offset <= endOffset) {
//     //   node.properties.id = offsetId;
//     // }
//     //
//     // if (endOffset + 1 === offset) {
//     //   node.properties.id = offsetId;
//     // }
//     //
//     // return SKIP;
//   }
//
//   // return () => (tree: HastRoot) => visit(tree, transform);
//   visit(hast, transform);
//   return hast;
// }

// export const useMdRenderer = () => {
//   const [reactContent, setReactContent] = useState<ReactElement>();
//   const [hast, setHast] = useState<HastNodes>();
//   const [syncPositionOffset, setSyncPositionOffset] = useState(0);
//   const editorContent = useEditorStore((state) => state.editorContent);
//   const positionOffset = useEditorStore((state) => state.positionOffset);
//   const updateThrottleMs = 0;
//   const isThrottling = useRef(false);
//
//   const parseMarkdown = useCallback(
//     async (source: string) => {
//       const startTime = performance.now();
//       const staticOffset = positionOffset;
//       const processor = unified()
//         .use(remarkParse)
//         .use([remarkFrontMatter, remarkGfm])
//         .use(remarkToRehype);
//       // .use(rehypeHighlight);
//
//       const newMdast = processor.parse(source);
//       const newHast = await processor.run(newMdast, source);
//       setSyncPositionOffset(staticOffset);
//       setHast(newHast);
//       const renderTime = performance.now() - startTime;
//       // console.log('md to hast parsing time:', Math.round(renderTime));
//     },
//     [positionOffset],
//   );
//
//   useEffect(() => {
//     if (hast === undefined) {
//       return;
//     }
//
//     const startTime = performance.now();
//     const staticOffset = syncPositionOffset;
//     const markedHast = rehypeMarkPositionOffset(positionOffset, hast);
//     const newReactContent = toJsxRuntime(markedHast, production);
//     setSyncPositionOffset(staticOffset);
//     setReactContent(newReactContent);
//     const renderTime = performance.now() - startTime;
//     // console.log('mark + hast to jsx parsing time:', Math.round(renderTime));
//   }, [hast, syncPositionOffset]);
//
//   useEffect(() => {
//     let id: number | undefined;
//     if (!isThrottling.current) {
//       isThrottling.current = true;
//       id = window.setTimeout(() => {
//         isThrottling.current = false;
//         parseMarkdown(editorContent);
//       }, updateThrottleMs);
//     }
//
//     return () => {
//       isThrottling.current = false;
//       clearTimeout(id);
//     };
//     // parseMarkdown(editorContent);
//   }, [editorContent, parseMarkdown]);
//
//   return [reactContent, syncPositionOffset] as const;
// };

function useScrollHandler(
  documentRef: RefObject<HTMLElement>,
  positionOffset: number,
  reactContent?: ReactElement,
) {
  // const positionOffset = useEditorStore((state) => state.positionOffset);
  // @ts-expect-error: only chromium based browsers have this property
  const isChrome = useMemo(() => window.chrome, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (documentRef.current === null) {
      return;
    }
    const root = documentRef.current;
    let target: Element | undefined;

    for (let i = root.children.length - 1; i >= 0; i -= 1) {
      const childElement = root.children[i];
      const offsetEnd = Number(childElement.getAttribute('data-offset-end'));
      // if (offsetEnd + 1 !== positionOffset) {
      //   if (offsetEnd < positionOffset) {
      //     continue;
      //   }
      //   const offsetStart = Number(
      //     childElement.getAttribute('data-offset-start'),
      //   );
      //   if (offsetStart > positionOffset) {
      //     continue;
      //   }
      // }
      if (offsetEnd < positionOffset) {
        continue;
      }
      const offsetStart = Number(
        childElement.getAttribute('data-offset-start'),
      );
      if (offsetStart > positionOffset) {
        continue;
      }

      // if (childElement.id !== offsetId) {
      //   continue;
      // }

      target = childElement;
      target.classList.add('bg-emerald-900', 'ring', 'ring-emerald-500');

      window.scrollBy({
        top: target.getBoundingClientRect().top - 64,
        // smooth scroll causes staggering effect on chromium if the event is fired while another is still ongoing
        behavior: isChrome ? 'instant' : 'smooth',
      });

      break;
    }

    return () => {
      if (target === undefined) {
        return;
      }
      target.classList.remove('bg-emerald-900', 'ring', 'ring-emerald-500');
    };
  }, [documentRef, isChrome, reactContent, positionOffset]);
}

export function Preview() {
  const documentRef = useRef<HTMLElement>(null);
  // const [jsx, syncPositionOffset] = useMdRenderer();
  const [jsx, syncPositionOffset] = useMarkdownParserWorker();
  useScrollHandler(documentRef, syncPositionOffset, jsx);

  return (
    <article className={cn('mx-auto break-words', className)} ref={documentRef}>
      {jsx}
    </article>
  );
}

function useMarkdownParserWorker() {
  const editorContent = useEditorStore((state) => state.editorContent);
  const [hast, setHast] = useState<HastNodes>();
  const [jsx, setJsx] = useState<JSX.Element>();
  const positionOffset = useEditorStore((state) => state.positionOffset);
  const [syncPositionOffset, setSyncPositionOffset] = useState(0);
  const positionOffsetBeforeRender = useRef(0);
  const lastEditorContent = useRef(editorContent);

  const onWorkerMessage = (event: { data: HastNodes }) => {
    setHast(event.data);
  };
  const worker = useRef<Worker>();

  useEffect(() => {
    worker.current = new Worker(
      new URL('./markdown-parser.worker', import.meta.url),
    );
    worker.current.addEventListener('message', onWorkerMessage);

    return () => {
      worker.current?.terminate();
    };
  }, [onWorkerMessage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (worker.current === undefined) {
      return;
    }
    positionOffsetBeforeRender.current = positionOffset;
    worker.current.postMessage(editorContent);
    // lastEditorContent.current = editorContent;
  }, [editorContent]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const didContentChangeSinceLastSync =
      lastEditorContent.current !== editorContent;

    lastEditorContent.current = editorContent;
    if (!didContentChangeSinceLastSync) {
      setSyncPositionOffset(positionOffset);
    }
  }, [positionOffset]);

  useEffect(() => {
    if (hast === undefined) {
      return;
    }
    setJsx(toJsxRuntime(hast, production));
    setSyncPositionOffset(positionOffsetBeforeRender.current);
  }, [hast]);

  return [jsx, syncPositionOffset] as const;
}
