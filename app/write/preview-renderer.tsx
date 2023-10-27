// @ts-expect-error: untyped.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { memo } from 'react';

interface PreviewRendererProps {
  children: HastNodes;
}

function PreviewRendererComponent({ children }: PreviewRendererProps) {
  return toJsxRuntime(children, {
    Fragment,
    jsx,
    jsxs,
    // ignoreInvalidStyle: true,
    // passKeys: true,
    // passNode: true,
  });
}

export const PreviewRenderer = memo(PreviewRendererComponent);
