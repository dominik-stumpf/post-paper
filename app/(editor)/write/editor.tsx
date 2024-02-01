'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { minimalSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { placeholder, EditorView } from '@codemirror/view';
import { useEffect, useRef } from 'react';
import { languages } from '@codemirror/language-data';
import '@/styles/editor.css';
import { gruvboxDarkInit } from '@uiw/codemirror-theme-gruvbox-dark';
import markdownDocument from '@/public/markdown/react-hooks-post.md';

const customTheme = gruvboxDarkInit({
  settings: {
    background: 'black',
    selection: '#ffffff33',
    fontFamily: 'var(--font-geist-mono)',
  },
});

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current === null) {
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
        customTheme,
      ],
    });

    const editor = new EditorView({
      parent: editorRef.current,
      state,
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return <div ref={editorRef} id="editor" />;
}
