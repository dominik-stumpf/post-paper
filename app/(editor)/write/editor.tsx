'use client';

import '@/styles/editor.css';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorState, type Extension } from '@codemirror/state';
import { EditorView, placeholder } from '@codemirror/view';
import { Vim, vim } from '@replit/codemirror-vim';
import {
  gruvboxDarkInit,
  gruvboxLightInit,
} from '@uiw/codemirror-theme-gruvbox-dark';
import { minimalSetup } from 'codemirror';
import { useTheme } from 'next-themes';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useEditorStore } from './editor-store';
import { useArticlePublisher } from './use-article-publisher';

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
  const { handlePublish } = useArticlePublisher();
  const editorRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const setEditorContent = useEditorStore((state) => state.setEditorContent);
  const setPositionOffset = useEditorStore((state) => state.setPositionOffset);
  const [editorView, setEditorView] = useState<EditorView>();
  const initialEditorContent = useEditorStore(
    (state) => state.initialEditorContent,
  );
  const isVimModeActive = useEditorStore((state) => state.isVimModeActive);
  const isEditorScrollbarActive = useEditorStore(
    (state) => state.isEditorScrollbarActive,
  );
  const setIsMouseModeActive = useEditorStore(
    (state) => state.setIsMouseModeActive,
  );

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
    if (
      editorRef.current === null ||
      resolvedTheme === undefined ||
      initialEditorContent === undefined
    ) {
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
      extensions.unshift(vim({ status: true }));
      Vim.defineEx('nomousehelp', 'nomouse', () => {
        setIsMouseModeActive(false);
      });
      Vim.defineEx('mousehelp', 'mouse', () => {
        setIsMouseModeActive(true);
      });
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
    setIsMouseModeActive,
  ]);

  useEffect(() => {
    if (editorView === undefined) {
      return;
    }

    editorView.focus();
    editorView.contentDOM.ariaLabel = 'editor containing markdown';
  }, [editorView]);

  useEffect(() => {
    if (editorRef.current === null) {
      return;
    }
    if (isEditorScrollbarActive) {
      editorRef.current.classList.add('is-scrollbar-active');
      return;
    }
    editorRef.current.classList.remove('is-scrollbar-active');
  }, [isEditorScrollbarActive]);

  return (
    <div
      ref={editorRef}
      id="editor"
      className="h-full max-h-remaining w-full overflow-hidden text-base"
    />
  );
}

export const EditorMemo = memo(Editor);
