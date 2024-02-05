import { className } from '@/components/render-paper/render-paper';
import { cn } from '@/lib/utils';
import { useEditorStore } from './editor-store';

import type { Root as HastRoot, Nodes as HastNodes } from 'hast';
import { type BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';
import {
  type ReactElement,
  useCallback,
  useEffect,
  useState,
  useRef,
  type RefObject,
  useMemo,
} from 'react';

import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypeHighlight from 'rehype-highlight';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
// @ts-expect-error: the react types are missing.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime, type Components } from 'hast-util-to-jsx-runtime';

const components: Partial<Components> = {
  a: (props) => <a tabIndex={-1} {...props} />,
};

const production = { Fragment, jsx, jsxs, components };

type HastVisitor = BuildVisitor<HastRoot>;

export const offsetId = 'offset-position-active';

export function rehypeMarkPositionOffset(offset: number, hast: HastNodes) {
  function transform(...[node, _index, _parent]: Parameters<HastVisitor>) {
    if (node.type !== 'element') return CONTINUE;

    const startOffset = node.position?.start.offset;
    const endOffset = node.position?.end.offset;

    if (typeof startOffset !== 'number' || typeof endOffset !== 'number') {
      return SKIP;
    }

    node.properties = {};

    if (startOffset <= offset && offset <= endOffset) {
      node.properties.id = offsetId;
    }

    if (endOffset + 1 === offset) {
      node.properties.id = offsetId;
    }

    return SKIP;
  }

  // return () => (tree: HastRoot) => visit(tree, transform);
  visit(hast, transform);
  return hast;
}

export const useMdRenderer = () => {
  const [reactContent, setReactContent] = useState<ReactElement>();
  const [hast, setHast] = useState<HastNodes>();
  const editorContent = useEditorStore((state) => state.editorContent);
  const positionOffset = useEditorStore((state) => state.positionOffset);
  const updateThrottleMs = 0;
  const isThrottling = useRef(false);

  const parseMarkdown = useCallback(async (source: string) => {
    const startTime = performance.now();
    const processor = unified()
      .use(remarkParse)
      .use([remarkGfm, remarkFrontMatter])
      .use(remarkToRehype)
      .use(rehypeHighlight);

    const newMdast = processor.parse(source);
    const newHast = await processor.run(newMdast, source);
    setHast(newHast);
    const renderTime = performance.now() - startTime;
    console.log('md to hast parsing time:', Math.round(renderTime));
  }, []);

  useEffect(() => {
    if (hast === undefined) {
      return;
    }

    const startTime = performance.now();
    const markedHast = rehypeMarkPositionOffset(positionOffset, hast);
    const newReactContent = toJsxRuntime(markedHast, production);
    setReactContent(newReactContent);
    const renderTime = performance.now() - startTime;
    console.log('mark + hast to jsx parsing time:', Math.round(renderTime));
  }, [hast, positionOffset]);

  useEffect(() => {
    let id: number | undefined;
    if (!isThrottling.current) {
      isThrottling.current = true;
      id = window.setTimeout(() => {
        isThrottling.current = false;
        parseMarkdown(editorContent);
      }, updateThrottleMs);
    }

    return () => {
      isThrottling.current = false;
      clearTimeout(id);
    };
  }, [editorContent, parseMarkdown]);

  return reactContent;
};

function useScrollHandler(
  documentRef: RefObject<HTMLElement>,
  reactContent?: ReactElement,
) {
  const positionOffset = useEditorStore((state) => state.positionOffset);
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
      if (childElement.id !== offsetId) {
        continue;
      }

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
  const reactContent = useMdRenderer();
  const documentRef = useRef<HTMLElement>(null);
  useScrollHandler(documentRef, reactContent);

  return (
    <article className={cn('mx-auto break-words', className)} ref={documentRef}>
      {reactContent}
    </article>
  );
}

// function useMarkdownWorker() {
//   const editorContent = useEditorStore((state) => state.editorContent);
//
// const onWorkerMessage = (event: { data: string }) =>
//   console.log('host received:', event.data);
//   const worker = useRef<Worker>();
//
//   useEffect(() => {
//     worker.current = new Worker(
//       new URL('./md-to-html.worker', import.meta.url),
//     );
//     worker.current.addEventListener('message', onWorkerMessage);
//
//     return () => {
//       worker.current?.terminate();
//     };
//   }, []);
//
//   useEffect(() => {
//     if (worker.current === undefined) {
//       return;
//     }
//     worker.current.postMessage(editorContent);
//   }, [editorContent]);
// }
