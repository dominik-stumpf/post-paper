'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { minimalSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { placeholder, EditorView } from '@codemirror/view';
import { memo, useEffect, useRef } from 'react';
import { languages } from '@codemirror/language-data';
import '@/styles/editor.css';
import {
  gruvboxDarkInit,
  gruvboxLightInit,
} from '@uiw/codemirror-theme-gruvbox-dark';
import markdownDocument from '@/public/markdown/react-hooks-post.md';
import { useTheme } from 'next-themes';

const lightTheme = gruvboxLightInit({
  settings: {
    background: 'var(--background)',
    fontFamily: 'var(--font-geist-mono)',
  },
});

const darkTheme = gruvboxDarkInit({
  settings: {
    background: 'var(--background)',
    fontFamily: 'var(--font-geist-mono)',
  },
});

function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (editorRef.current === null || resolvedTheme === undefined) {
      return;
    }

    const state = EditorState.create({
      doc: markdownDocument,
      extensions: [
        vim({ status: true }),
        minimalSetup,
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        placeholder('Enter some markdown...'),
        EditorView.lineWrapping,
        resolvedTheme === 'dark' ? darkTheme : lightTheme,
      ],
    });

    const editor = new EditorView({
      parent: editorRef.current,
      state,
    });

    return () => {
      editor.destroy();
    };
  }, [resolvedTheme]);

  return <div ref={editorRef} id="editor" />;
}

export const EditorMemo = memo(Editor);
