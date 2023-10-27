import Markdown from 'react-markdown';
import {
  rehypePlugins,
  remarkPlugins,
  className,
} from '@/components/render-paper/render-paper';
// @ts-expect-error: untyped.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { memo } from 'react';

interface PreviewRendererProps {
  children: HastNodes;
}

function PreviewRendererComponent({ children }: PreviewRendererProps) {
  console.log('rendering new markdown');

  return toJsxRuntime(children, {
    Fragment,
    ignoreInvalidStyle: true,
    jsx,
    jsxs,
    passKeys: true,
    passNode: true,
  });

  // return (

  //   // <Markdown
  //   //   className={className}
  //   //   rehypePlugins={rehypePlugins}
  //   //   remarkPlugins={remarkPlugins}
  //   // >
  //   //   {children}
  //   // </Markdown>
  // );
}

export const PreviewRenderer = memo(PreviewRendererComponent);
