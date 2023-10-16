// You can use this code in a separate component that's imported in your pages.
'use client';
import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic';

export const MDXEditor = dynamic(
  // preferred way
  () => import('@mdxeditor/editor/MDXEditor').then((mod) => mod.MDXEditor),
  // legacy, larger bundle
  // () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
  { ssr: false },
);