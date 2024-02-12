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

const components: Partial<Components> = {
  a: (props) => <a tabIndex={-1} {...props} />,
};

const production = { Fragment, jsx, jsxs, components };

function useScrollHandler(
  documentRef: RefObject<HTMLElement>,
  positionOffset: number,
  reactContent?: ReactElement,
) {
  // const positionOffset = useEditorStore((state) => state.positionOffset);

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
        // @ts-expect-error: only chromium based browsers have this property
        behavior: window.chrome ? 'instant' : 'smooth',
      });

      break;
    }

    return () => {
      if (target === undefined) {
        return;
      }
      target.classList.remove('bg-emerald-900', 'ring', 'ring-emerald-500');
    };
  }, [documentRef, reactContent, positionOffset]);
}

export function Preview() {
  const documentRef = useRef<HTMLElement>(null);
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
