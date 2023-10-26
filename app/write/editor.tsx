'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { vim } from '@replit/codemirror-vim';
import * as themes from '@uiw/codemirror-themes-all';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { basicSetup } from 'codemirror';
import './editor.css';

const customTheme = themes.gruvboxDarkInit({
  settings: {
    fontFamily: 'var(--mono)',
    background: 'black',
    lineHighlight: '#ffffff11',
    selection: '#ffffff22',
  },
});

interface EditorProps {
  editorContent: string;
  setEditorContent: Dispatch<SetStateAction<string>>;
}

export const Editor = ({ editorContent, setEditorContent }: EditorProps) => {
  const editor = useRef<HTMLDivElement>(null);
  const onUpdate = EditorView.updateListener.of((v) => {
    setEditorContent(v.state.doc.toString());
  });

  useEffect(() => {
    if (!editor.current) return;

    const startState = EditorState.create({
      doc: editorContent,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        keymap.of(defaultKeymap),
        customTheme,
        vim({ status: true }),
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        onUpdate,
      ],
    });

    const view = new EditorView({ state: startState, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, [editorContent, onUpdate]);

  return (
    <div ref={editor} id="editor" className="text-lg border h-remaining" />
  );
};

// export function Editor({ editorContent, setEditorContent }: EditorProps) {
//   return (
//     <>
//       <CodeMirror
//         theme={customTheme}
//         value={editorContent}
//         onChange={(editorOutput) => {
//           setEditorContent(editorOutput);
//         }}
//         placeholder={'Enter some Markdown...'}
//         className="text-lg border h-remaining"
//         id="editor"
//         basicSetup={{
//           foldGutter: false,
//           lineNumbers: false,
//           allowMultipleSelections: false,
//           autocompletion: false,
//         }}
//         maxHeight="100%"
//         extensions={[
//           vim({ status: true }),
//           markdown({ base: markdownLanguage, codeLanguages: languages }),
//           EditorView.lineWrapping,
//         ]}
//       />
//     </>
//   );
// }
