'use client';

import { proseClassName } from '@/components/prose';
import Markdown from 'react-markdown';
import placeholder from './placeholder.md';
import { useEffect, useRef, useState } from 'react';
import { vim } from '@replit/codemirror-vim';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import './editor.css';
import * as themes from '@uiw/codemirror-themes-all';

const customTheme = themes.gruvboxDarkInit({
  settings: {
    fontFamily: 'var(--mono)',
    background: 'black',
    lineHighlight: '#ffffff11',
    selection: '#ffffff22',
  },
});

export function Editor() {
  const [editorContent, setEditorContent] = useState(placeholder);
  return (
    <>
      <CodeMirror
        theme={customTheme}
        value={placeholder}
        onChange={(editorOutput) => {
          setEditorContent(editorOutput);
        }}
        placeholder={'Enter some Markdown...'}
        className="text-lg"
        id="editor"
        basicSetup={{
          foldGutter: false,
          lineNumbers: false,
          allowMultipleSelections: false,
          autocompletion: false,
        }}
        height="80vh"
        minWidth="50vw"
        maxWidth="50vw"
        extensions={[
          vim(),
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          EditorView.lineWrapping,
        ]}
      />
      <Preview markdownString={editorContent} />
    </>
  );
}

export function Preview({ markdownString }: { markdownString: string }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient &&
    markdownString && (
      <Markdown
        className={`${proseClassName} min-h-[75vh] outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black prose-code:font-[var(--mono)]`}
      >
        {markdownString}
      </Markdown>
    )
  );
}
