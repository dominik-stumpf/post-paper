// @ts-expect-error: untyped.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toHtml } from 'hast-util-to-html';

import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { memo } from 'react';

interface PreviewRendererProps {
  children: HastNodes;
}

function PreviewRendererComponent({ children }: PreviewRendererProps) {
  console.log(children);
  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: html is not shared between clients
      dangerouslySetInnerHTML={{
        __html: toHtml(children, { allowDangerousHtml: true }),
      }}
    />
  );
  // return toJsxRuntime(children, {
  //   Fragment,
  //   jsx,
  //   jsxs,
  //   ignoreInvalidStyle: true,
  //   passKeys: true,
  //   passNode: true,
  // });
}

export const PreviewRenderer = memo(PreviewRendererComponent);
