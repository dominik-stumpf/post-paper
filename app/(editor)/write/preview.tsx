import { className } from '@/components/render-paper/render-paper';
import { cn } from '@/lib/utils';
import { useEditorStore } from './editor-store';
// import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
// import { useEffect, useRef, useState } from 'react';
// import remarkFrontMatter from 'remark-frontmatter';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import { unified } from 'unified';
// import { type BuildVisitor, CONTINUE, SKIP, visit } from 'unist-util-visit';
// import { Remark } from 'react-remark';
//
// type HastVisitor = BuildVisitor<HastRoot>;
// export const offsetId = 'offset-position-active';
// export function markHastOffset(offset: number, hast: HastNodes) {
//   visit(hast, transform);
//
//   function transform(
//     ...[node, _index, _parent]: Parameters<HastVisitor>
//   ): ReturnType<HastVisitor> {
//     if (node.type !== 'element') return CONTINUE;
//
//     const startOffset = node.position?.start.offset;
//     const endOffset = node.position?.end.offset;
//
//     node.properties = {};
//     if (
//       typeof startOffset === 'number' &&
//       typeof endOffset === 'number' &&
//       startOffset <= offset &&
//       offset <= endOffset
//     ) {
//       node.properties.id = offsetId;
//       // console.log(node);
//       // return EXIT;
//     }
//
//     return SKIP;
//   }
//
//   return hast;
// }
// export const rehypePlugins = [rehypeHighlight];
// export const remarkPlugins = [remarkGfm];

// function processMdToHast(md: string) {
//   const processor = unified()
//     // @ts-ignore
//     .use(remarkParse)
//     .use([])
//     .use(remarkFrontMatter, ['yaml'])
//     // .use(() => (tree) => {
//     //   console.dir(tree);
//     // })
//     .use(remarkRehype)
//     .use([]);
//
//   const mdastTree = processor.parse(md);
//   // @ts-ignore
//   const hastTree: HastNodes = processor.runSync(mdastTree, md);
//
//   return hastTree;
// }

import {
  Fragment,
  type ReactElement,
  createElement,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';

import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkToRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypeHighlight from 'rehype-highlight';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

export const useRemark = () => {
  const [reactContent, setReactContent] = useState<ReactElement | null>(null);
  const editorContent = useEditorStore((state) => state.editorContent);
  const positionOffset = useEditorStore((state) => state.positionOffset);
  const updateThrottleMs = 32;
  // const maxRenderFrequencyMs = 1000;
  const isThrottling = useRef(false);

  const setMarkdownSource = useCallback((source: string) => {
    const startTime = performance.now();
    unified()
      .use(remarkParse, {})
      .use([remarkGfm, remarkFrontMatter])
      .use(remarkToRehype, {})
      .use(rehypeHighlight)
      .use(rehypeReact, {
        createElement,
        Fragment,
      } as RehypeReactOptions<typeof createElement>)
      .process(source)
      .then((vfile) => {
        const renderTime = performance.now() - startTime;
        console.log('parsing time:', Math.round(renderTime));
        setReactContent(vfile.result as ReactElement);
      })
      .catch(() => {
        console.error('failed to parse markdown');
      });
  }, []);

  useEffect(() => {
    // setMarkdownSource(editorContent);
    const truncatedContent = editorContent.slice(
      Math.max(0, positionOffset - 2048),
      positionOffset + 2048,
    );

    let id: number | undefined;
    if (!isThrottling.current) {
      id = window.setTimeout(() => {
        isThrottling.current = false;
        setMarkdownSource(truncatedContent);
      }, updateThrottleMs);
    }

    isThrottling.current = true;

    return () => {
      isThrottling.current = false;
      clearTimeout(id);
    };
  }, [editorContent, positionOffset, setMarkdownSource]);

  return reactContent;
};

export function Preview() {
  const positionOffset = useEditorStore((state) => state.positionOffset);
  const reactContent = useRemark();

  return <article className={cn('mx-auto', className)}>{reactContent}</article>;
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
