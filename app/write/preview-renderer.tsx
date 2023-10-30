// @ts-expect-error: untyped.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toHtml } from 'hast-util-to-html';
import type { Nodes as HastNodes, Root as HastRoot } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import React, { memo, useEffect, useMemo } from 'react';
import type { Components } from 'hast-util-to-jsx-runtime';
import { intrinsicElements } from './intrinsic-elements';

interface PreviewRendererProps {
  children: HastNodes;
}

export function PreviewRenderer({ children }: PreviewRendererProps) {
  // useEffect(() => {
  //   console.log('updating renderer', children);
  // }, [children]);

  // const getPreview = useMemo(() => {
  //   console.log('updating renderer', children);
  //   return toJsxRuntime(children, {
  //     Fragment,
  //     jsx,
  //     jsxs,
  //     // components: intrinsicElements,
  //     // ignoreInvalidStyle: true,
  //     // passKeys: true,
  //     passNode: true,
  //   });
  // }, [children]);

  // return getPreview;
  return toJsxRuntime(children, {
    Fragment,
    jsx,
    jsxs,
    components: intrinsicElements,
    ignoreInvalidStyle: true,
    passKeys: true,
    passNode: true,
  });
  // return JSON.stringify(children);
}
