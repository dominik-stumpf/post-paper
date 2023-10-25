'use client';

import { proseClassName } from '@/components/prose';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { vim } from '@replit/codemirror-vim';
import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { MutableRefObject, useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import './editor.css';
import { PaperParser } from '@/utils/paper-parser';

const customTheme = themes.gruvboxDarkInit({
  settings: {
    fontFamily: 'var(--mono)',
    background: 'black',
    lineHighlight: '#ffffff11',
    selection: '#ffffff22',
  },
});

export function Editor({
  editorContentRef,
}: { editorContentRef: MutableRefObject<string> }) {
  const [editorContent, setEditorContent] = useState(editorContentRef.current);

  return (
    <>
      <CodeMirror
        theme={customTheme}
        value={editorContent}
        onChange={(editorOutput) => {
          editorContentRef.current = editorOutput;
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
        height="100%"
        width="100%"
        extensions={[
          vim({ status: true }),
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
      <Markdown className={`${proseClassName}`}>{markdownString}</Markdown>
    )
  );
}
