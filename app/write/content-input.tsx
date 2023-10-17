'use client';

import { MDXEditor } from '@/components/mdx-editor';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { useEffect, useRef } from 'react';
import { ALL_PLUGINS } from './boilerplate';
import demo from './demo.md';
import styles from './markdown.module.css';
import placeholder from './placeholder.md';

// function PlaceHolder({ className }: { className: string }) {
//   return (
//     <section className={className}>
//       <h1>Hello this is your example post</h1>
//       <p>
//         Sint dolore pariatur consequat Lorem exercitation adipisicing elit.
//         Eiusmod anim voluptate ullamco id nulla fugiat incididunt. Commodo non
//         Lorem non irure sint proident consequat dolore pariatur ipsum aliquip.
//         Qui exercitation mollit Lorem consequat dolor.
//       </p>
//     </section>
//   );
// }

export function ContentInput() {
  const className =
    'prose max-w-full lg:prose-lg prose-fuchsia prose-invert prose-code:bg-fuchsia-500/20 prose-code:text-fuchsia-500 focus:ring-1 ring-white p-8';
  const content = useRef('');

  return (
    <div className="">
      <MDXEditor
        onChange={(e) => {
          content.current = e;
        }}
        contentEditableClassName={`${className} ${styles['strip-default']}`}
        markdown={placeholder}
        plugins={ALL_PLUGINS}
      />
    </div>
  );
}
