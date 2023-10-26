'use client';

import { defaultKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import * as themes from '@uiw/codemirror-themes-all';
import { basicSetup, minimalSetup } from 'codemirror';
import { Dispatch, SetStateAction, memo, useEffect, useRef } from 'react';
import './editor.css';

const customTheme = themes.gruvboxDarkInit({
  settings: {
    fontFamily: 'var(--mono)',
    background: 'black',
    // lineHighlight: '#ffffff11',
    // caret: '#ff0000',
    selection: '#ffffff33',
  },
});

interface EditorProps {
  initialEditorContent: string;
  setEditorContent: Dispatch<SetStateAction<string>>;
}

export const Editor = memo(
  ({ initialEditorContent, setEditorContent }: EditorProps) => {
    const editor = useRef<HTMLDivElement>(null);
    const onUpdate = EditorView.updateListener.of((v) => {
      setEditorContent(v.state.doc.toString());
    });

    useEffect(() => {
      if (!editor.current) return;

      const startState = EditorState.create({
        doc: initialEditorContent,
        extensions: [
          minimalSetup,
          EditorView.lineWrapping,
          keymap.of(defaultKeymap),
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
      <div ref={editor} id="editor" className="text-lg h-remaining w-full" />
    );
  },
);

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
