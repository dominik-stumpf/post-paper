'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { minimalSetup } from 'codemirror';
import { EditorState, type Extension } from '@codemirror/state';
import { placeholder, EditorView } from '@codemirror/view';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
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
  const { resolvedTheme } = useTheme();
  const setEditorContent = useEditorStore((state) => state.setEditorContent);
  const setPositionOffset = useEditorStore((state) => state.setPositionOffset);
  const [editorView, setEditorView] = useState<EditorView>();
  const initialEditorContent = useEditorStore(
    (state) => state.initialEditorContent,
  );
  const isVimModeActive = useEditorStore((state) => state.isVimModeActive);

  const setIsEditorFocused = useEditorStore(
    (state) => state.setIsEditorFocused,
  );

  const updateEditorStore = useCallback(
    () =>
      EditorView.updateListener.of((v) => {
        setEditorContent(v.state.doc.toString());
        setPositionOffset(v.view.state.selection.ranges[0].from);
      }),
    [setEditorContent, setPositionOffset],
  );

  const updateFocus = useCallback(
    () =>
      EditorView.focusChangeEffect.of((_, isFocused) => {
        setIsEditorFocused(isFocused);
        return null;
      }),
    [setIsEditorFocused],
  );

  useEffect(() => {
    if (editorRef.current === null || resolvedTheme === undefined) {
      return;
    }

    const extensions: Extension[] = [
      minimalSetup,
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      placeholder('Enter some markdown...'),
      EditorView.lineWrapping,
      resolvedTheme === 'dark' ? darkTheme : lightTheme,
      updateEditorStore(),
      updateFocus(),
    ];

    if (isVimModeActive) {
      extensions.push(vim({ status: true }));
    }

    const state = EditorState.create({
      doc: initialEditorContent,
      extensions,
    });

    const view = new EditorView({
      parent: editorRef.current,
      state,
    });
    setEditorView(view);

    return () => {
      view.destroy();
      setEditorView(undefined);
    };
  }, [
    resolvedTheme,
    updateEditorStore,
    initialEditorContent,
    updateFocus,
    isVimModeActive,
  ]);

  useEffect(() => {
    if (editorView === undefined) {
      return;
    }
    editorView.focus();
    editorView.contentDOM.ariaLabel = 'editor containing markdown';
  }, [editorView]);

  return (
    <div
      ref={editorRef}
      id="editor"
      className="h-full max-h-remaining w-full overflow-hidden text-base"
    />
  );
}

export const EditorMemo = memo(Editor);
