// @ts-expect-error: the react types are missing.
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime, type Components } from 'hast-util-to-jsx-runtime';
import type { Nodes as HastNodes } from 'hast';

const defaultComponents: Partial<Components> = {};

const production = { Fragment, jsx, jsxs, components: {} };

export function HastToJsx(
  hast: HastNodes,
  customComponents = defaultComponents,
) {
  production.components = customComponents;
  return toJsxRuntime(hast, production);
}
