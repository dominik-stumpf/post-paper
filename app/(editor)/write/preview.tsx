'use-client';

import { useEditorStore } from './editor-store';
import type { Nodes as HastNodes } from 'hast';
import {
  type ReactElement,
  useEffect,
  useState,
  useRef,
  type RefObject,
} from 'react';
import type { Components } from 'hast-util-to-jsx-runtime';
import { WorkerMessage, activeElementId } from './constants';
import type { MarkdownParserWorkerResponse } from './markdown-parser.worker';
import { HastToJsx } from '@/lib/hast-to-jsx';
import { ProseArticle } from '@/components/prose-article/prose-article';
import type { z } from 'zod';
import type { articleMetadataSchema } from '@/lib/validators/article';

const components = {
  a: (props) => <a tabIndex={-1} {...props} />,
} satisfies Partial<Components>;

const activeElementStyle = 'animate-pulse'.split(' ');

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
      target.current.classList.add(...activeElementStyle);

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
      target.current.classList.remove(...activeElementStyle);
    };
  }, [articleRef, jsx]);
}

export function Preview() {
  const articleRef = useRef<HTMLElement>(null);
  const { jsx, frontmatter } = useMarkdownParserWorker();
  useScrollHandler(articleRef, jsx);
  const [metadata, setMetadata] =
    useState<Partial<z.infer<typeof articleMetadataSchema>>>();

  useEffect(() => {
    setMetadata(frontmatter ?? {});
  }, [frontmatter]);

  return (
    <ProseArticle ref={articleRef} metadata={metadata}>
      {jsx}
    </ProseArticle>
  );
}

function useMarkdownParserWorker() {
  const editorContent = useEditorStore((state) => state.editorContent);
  const [hast, setHast] = useState<HastNodes>();
  const [frontmatter, setFrontmatter] = useState<Record<string, string>>();
  const [jsx, setJsx] = useState<JSX.Element>();
  const positionOffset = useEditorStore((state) => state.positionOffset);
  const worker = useRef<Worker>();

  useEffect(() => {
    const onWorkerMessage = (event: { data: MarkdownParserWorkerResponse }) => {
      setHast(event.data.hast);
      setFrontmatter(event.data.frontmatter);
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
    setJsx(HastToJsx(hast, components));
  }, [hast]);

  return { jsx, frontmatter };
}
