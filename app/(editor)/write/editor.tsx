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
import { useTheme } from 'next-themes';
import { useEditorStore } from './editor-store';

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

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const { resolvedTheme } = useTheme();
  const setEditorContent = useEditorStore((state) => state.setEditorContent);
  const setPositionOffset = useEditorStore((state) => state.setPositionOffset);
  const initialEditorContent = useEditorStore(
    (state) => state.initialEditorContent,
  );

  const updateEditorStore = EditorView.updateListener.of((v) => {
    setEditorContent(v.state.doc.toString());
    setPositionOffset(v.view.state.selection.ranges[0].from);
  });

  useEffect(() => {
    if (editorRef.current === null || resolvedTheme === undefined) {
      return;
    }

    const state = EditorState.create({
      doc: initialEditorContent,
      extensions: [
        vim({ status: true }),
        minimalSetup,
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        placeholder('Enter some markdown...'),
        EditorView.lineWrapping,
        resolvedTheme === 'dark' ? darkTheme : lightTheme,
        updateEditorStore,
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
  }, [resolvedTheme, updateEditorStore, initialEditorContent]);

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
