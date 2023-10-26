'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { vim } from '@replit/codemirror-vim';
import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { Dispatch, SetStateAction } from 'react';
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

export function Editor({ editorContent, setEditorContent }: EditorProps) {
  return (
    <>
      <CodeMirror
        theme={customTheme}
        value={editorContent}
        onChange={(editorOutput) => {
          setEditorContent(editorOutput);
        }}
        placeholder={'Enter some Markdown...'}
        className="text-lg border h-remaining"
        id="editor"
        basicSetup={{
          foldGutter: false,
          lineNumbers: false,
          allowMultipleSelections: false,
          autocompletion: false,
        }}
        maxHeight="100%"
        extensions={[
          vim({ status: true }),
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          EditorView.lineWrapping,
        ]}
      />
    </>
  );
}
