'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { minimalSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { placeholder, EditorView } from '@codemirror/view';
import { memo, useEffect, useRef, useState } from 'react';
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
    background: 'unset',
    fontFamily: 'var(--font-mono)',
  },
});

const darkTheme = gruvboxDarkInit({
  settings: {
    background: 'unset',
    fontFamily: 'var(--font-mono)',
  },
});

function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
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

    setIsEditorLoaded(true);

    return () => {
      editor.destroy();
      setIsEditorLoaded(false);
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (isEditorLoaded === false) {
      return;
    }
    const content = document.querySelector('.cm-content');
    if (content === null) {
      return;
    }
    content.ariaLabel = 'article in markdown';
  }, [isEditorLoaded]);

  return (
    <div
      ref={editorRef}
      id="editor"
      className="h-full max-h-remaining w-full overflow-hidden text-base"
    />
  );
}

export const EditorMemo = memo(Editor);
