import type { Nodes as HastNodes } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
// @ts-expect-error: untyped.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { intrinsicElements } from './intrinsic-elements';
import { memo } from 'react';

interface PreviewRendererProps {
  children: HastNodes;
}

function Component({ children }: PreviewRendererProps) {
  return toJsxRuntime(children, {
    Fragment,
    jsx,
    jsxs,
    components: intrinsicElements,
    ignoreInvalidStyle: true,
    passKeys: true,
    passNode: true,
  });
}

export const PreviewRenderer = memo(Component);
