import { className } from '@/components/render-paper/render-paper';
import { cn } from '@/lib/utils';
import { useEditorStore } from './editor-store';

import type { Root as HastRoot } from 'hast';
import {
  type BuildVisitor,
  CONTINUE,
  EXIT,
  SKIP,
  visit,
} from 'unist-util-visit';
import {
  type ReactElement,
  useCallback,
  useEffect,
  useState,
  useRef,
  type RefObject,
  useMemo,
} from 'react';

import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypeHighlight from 'rehype-highlight';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import * as prod from 'react/jsx-runtime';

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };
type HastVisitor = BuildVisitor<HastRoot>;

export const offsetId = 'offset-position-active';

export function rehypeMarkPositionOffset(offset: number) {
  function transform(...[node, _index, _parent]: Parameters<HastVisitor>) {
    if (node.type !== 'element') return CONTINUE;

    const startOffset = node.position?.start.offset;
    const endOffset = node.position?.end.offset;

    if (typeof startOffset !== 'number' || typeof endOffset !== 'number') {
      return SKIP;
    }

    node.properties = {};

    if (endOffset + 1 === offset) {
      node.properties.id = offsetId;
      return EXIT;
    }

    if (startOffset <= offset && offset <= endOffset) {
      node.properties.id = offsetId;
      return EXIT;
    }

    return SKIP;
  }

  return () => (tree: HastRoot) => visit(tree, transform);
}

export const useMdRenderer = () => {
  const [reactContent, setReactContent] = useState<ReactElement | null>(null);
  const editorContent = useEditorStore((state) => state.editorContent);
  const positionOffset = useEditorStore((state) => state.positionOffset);
  const updateThrottleMs = 32;
  const isThrottling = useRef(false);

  const setMarkdownSource = useCallback(
    (source: string) => {
      const startTime = performance.now();
      unified()
        .use(remarkParse)
        .use([remarkGfm, remarkFrontMatter])
        .use(remarkToRehype)
        .use(rehypeHighlight)
        .use(rehypeMarkPositionOffset(positionOffset))
        .use(rehypeReact, production)
        .process(source)
        .then((vfile) => {
          const renderTime = performance.now() - startTime;
          console.log('parsing time:', Math.round(renderTime));
          setReactContent(vfile.result as ReactElement);
        })
        .catch(() => {
          console.error('failed to parse markdown');
        });
    },
    [positionOffset],
  );

  useEffect(() => {
    let id: number | undefined;
    if (!isThrottling.current) {
      isThrottling.current = true;
      id = window.setTimeout(() => {
        isThrottling.current = false;
        setMarkdownSource(editorContent);
      }, updateThrottleMs);
    }

    return () => {
      isThrottling.current = false;
      clearTimeout(id);
    };
  }, [editorContent, setMarkdownSource]);

  return reactContent;
};

function useScrollHandler(
  documentRef: RefObject<HTMLElement>,
  reactContent: ReactElement | null,
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
    <article className={cn('mx-auto', className)} ref={documentRef}>
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
