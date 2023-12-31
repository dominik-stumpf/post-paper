'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorState } from '@codemirror/state';
import { EditorView, placeholder } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { gruvboxDarkInit } from '@uiw/codemirror-theme-gruvbox-dark';
import { minimalSetup } from 'codemirror';
import { memo, useEffect, useRef } from 'react';
import './editor.css';

const customTheme = gruvboxDarkInit({
  settings: {
    background: 'black',
    selection: '#ffffff33',
  },
});

interface EditorProps {
  initialEditorContent: string;
  setEditorContent: (editorContent: string) => void;
  setPositionOffset: (positionOffset: number) => void;
}

function EditorComponent({
  initialEditorContent,
  setEditorContent,
  setPositionOffset,
}: EditorProps) {
  const editor = useRef<HTMLDivElement>(null);

  const onUpdate = EditorView.updateListener.of((v) => {
    setEditorContent(v.state.doc.toString());
    setPositionOffset(v.view.state.selection.ranges[0].from);
  });

  useEffect(() => {
    if (!editor.current) return;

    const startState = EditorState.create({
      doc: initialEditorContent,
      extensions: [
        placeholder('Enter some markdown...'),
        minimalSetup,
        EditorView.lineWrapping,
        customTheme,
        vim({ status: true }),
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        onUpdate,
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editor.current,
    });

    return () => {
      view.destroy();
    };
  }, [initialEditorContent, onUpdate]);

  return (
    <div ref={editor} id="editor" className="w-full text-lg h-remaining" />
  );
}

export const Editor = memo(EditorComponent);
