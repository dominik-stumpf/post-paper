'use client';

import { proseClassName } from '@/components/prose';
import { useEffect, useRef, useState } from 'react';
import sourceCss from '@wooorm/starry-night/source.css';
import sourceJs from '@wooorm/starry-night/source.js';
import sourceTs from '@wooorm/starry-night/source.ts';
import sourceTsx from '@wooorm/starry-night/source.tsx';
import textHtmlBasic from '@wooorm/starry-night/text.html.basic';
import textMd from '@wooorm/starry-night/text.md';
import { createStarryNight } from '@wooorm/starry-night';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import './starrynight.css';
import { JetBrains_Mono } from 'next/font/google';
import markdown from './placeholder.md';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });

const grammars = [
  sourceCss,
  sourceJs,
  sourceTs,
  sourceTsx,
  textHtmlBasic,
  textMd,
];

export function Editor() {
  const [text, setText] = useState(markdown);
  // const starryNight = useRef<ReturnType<typeof createStarryNight>>();
  const [starryNight, setStarryNight] = useState<Awaited<
    ReturnType<typeof createStarryNight>
  > | null>(null);

  useEffect(() => {
    (async () => {
      setStarryNight(await createStarryNight(grammars));
    })();
  }, []);

  useEffect(() => {
    if (starryNight === null) {
      return;
    }
    const tree = starryNight.highlight(text, 'text.md');
    const doc = renderToStaticMarkup(toJsxRuntime(tree, { Fragment, jsx }));
    console.log(doc);
  }, [starryNight, text]);

  return (
    <div
      className={`w-full flex-col flex items-center relative ${jetbrains.className}`}
    >
      <output
        className={
          'p-4 w-full max-w-prose min-h-[75vh] whitespace-pre-wrap break-words overflow-visible'
        }
      >
        {starryNight &&
          toJsxRuntime(starryNight.highlight(text, 'text.md'), {
            Fragment,
            jsx,
            jsxs,
          })}
        {/\n[ \t]*$/.test(text) ? <br /> : undefined}
      </output>
      <textarea
        className="resize-none bg-black text-white p-4 w-full max-w-prose min-h-[75vh] absolute top-0 text-transparent bg-transparent caret-white outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black"
        spellCheck="false"
        rows={text.split('\n').length + 1}
        onChange={(event) => {
          setText(event.currentTarget.value);
        }}
        value={text}
      />
    </div>
  );
}
