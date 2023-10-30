// @ts-expect-error: untyped.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import type { Nodes as HastNodes } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { intrinsicElements } from './intrinsic-elements';

interface PreviewRendererProps {
  children: HastNodes;
}

export function PreviewRenderer({ children }: PreviewRendererProps) {
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
