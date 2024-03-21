import type { Nodes as HastNodes } from 'hast';
import { type Components, toJsxRuntime } from 'hast-util-to-jsx-runtime';
// @ts-expect-error: the react types are missing.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

const defaultComponents: Partial<Components> = {};

const production = { Fragment, jsx, jsxs, components: {} };

export function HastToJsx(
  hast: HastNodes,
  customComponents = defaultComponents,
) {
  production.components = customComponents;
  return toJsxRuntime(hast, production);
}
