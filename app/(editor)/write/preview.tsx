'use-client';

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
} from 'react';
// @ts-expect-error: the react types are missing.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime, type Components } from 'hast-util-to-jsx-runtime';
import { WorkerMessage, activeElementId } from './constants';

const components: Partial<Components> = {
  a: (props) => <a tabIndex={-1} {...props} />,
};
const production = { Fragment, jsx, jsxs, components };

function useScrollHandler(
  articleRef: RefObject<HTMLElement>,
  jsx?: ReactElement,
) {
  const target = useRef<Element>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (articleRef.current === null) {
      return;
    }
    const root = articleRef.current;

    for (let i = root.children.length - 1; i >= 0; i -= 1) {
      const childElement = root.children[i];

      if (childElement.id !== activeElementId) {
        continue;
      }

      target.current = childElement;
      target.current.classList.add(
        'bg-emerald-900',
        'ring',
        'ring-emerald-500',
      );

      window.scrollBy({
        top: target.current.getBoundingClientRect().top - 32,
        // smooth scroll causes staggering effect on chromium if the event is fired while another is still ongoing
        // @ts-expect-error: only chromium based browsers have this property
        behavior: window.chrome ? 'instant' : 'smooth',
      });

      break;
    }

    return () => {
      if (target.current === undefined) {
        return;
      }
      target.current.classList.remove(
        'bg-emerald-900',
        'ring',
        'ring-emerald-500',
      );
    };
  }, [articleRef, jsx]);
}

export function Preview() {
  const articleRef = useRef<HTMLElement>(null);
  const jsx = useMarkdownParserWorker();
  useScrollHandler(articleRef, jsx);

  return (
    <article className={cn('mx-auto break-words', className)} ref={articleRef}>
      {jsx}
    </article>
  );
}

function useMarkdownParserWorker() {
  const editorContent = useEditorStore((state) => state.editorContent);
  const [hast, setHast] = useState<HastNodes>();
  const [jsx, setJsx] = useState<JSX.Element>();
  const positionOffset = useEditorStore((state) => state.positionOffset);
  const worker = useRef<Worker>();

  useEffect(() => {
    const onWorkerMessage = (event: { data: HastNodes }) => {
      setHast(event.data);
    };

    worker.current = new Worker(
      new URL('./markdown-parser.worker', import.meta.url),
    );
    worker.current.addEventListener('message', onWorkerMessage);

    return () => {
      worker.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (worker.current === undefined) {
      return;
    }
    worker.current.postMessage({
      type: WorkerMessage.Parse,
      source: editorContent,
      offset: positionOffset,
    });
  }, [editorContent, positionOffset]);

  useEffect(() => {
    if (hast === undefined) {
      return;
    }
    setJsx(toJsxRuntime(hast, production));
  }, [hast]);

  return jsx;
}
