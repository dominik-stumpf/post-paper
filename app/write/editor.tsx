'use client';

import { proseClassName } from '@/components/prose';
import { JetBrains_Mono } from 'next/font/google';
import Markdown from 'react-markdown';
import placeholder from './placeholder.md';
import { Fragment, useEffect, useRef, useState } from 'react';
import MonacoEditor, {
  BeforeMount,
  OnChange,
  OnMount,
  OnValidate,
} from '@monaco-editor/react';
import { initVimMode } from 'monaco-vim';

export function Editor() {
  const [markdown, setMarkdown] = useState(placeholder);
  const handleEditorChange: OnChange = (value, event) => {
    setMarkdown(value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);

    // editor.addAction({
    //   // an unique identifier of the contributed action
    //   id: 'some-unique-id',
    //   // a label of the action that will be presented to the user
    //   label: 'Some label!',
    //   keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],

    //   // the method that will be executed when the action is triggered.
    //   run: (editor) => {
    //     alert('we wanna save something => ' + editor.getValue());
    //     return null;
    //   },
    // });

    window.require.config({
      paths: {
        'monaco-vim': 'https://unpkg.com/monaco-vim/dist/monaco-vim',
      },
    });

    window.require(['monaco-vim'], (MonacoVim) => {
      const statusNode = document.querySelector('.status-node');
      MonacoVim.initVimMode(editor, statusNode);
    });
    const vimMode = initVimMode(
      editor,
      document.getElementById('my-statusbar'),
    );
  };

  const handleEditorWillMount: BeforeMount = (monaco) => {
    console.log('beforeMount: the monaco instance:', monaco);
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark', // can also be vs-dark or hc-black
      inherit: true, // can also be false to completely replace the builtin rules
      rules: [],
      colors: {
        'editor.background': '#000000',
      },
    });
  };

  const handleEditorValidation: OnValidate = (markers) => {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  };
  return (
    <>
      <MonacoEditor
        height="unset"
        width="100ch"
        defaultLanguage="markdown"
        defaultValue={placeholder}
        theme="customTheme"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
        options={{
          scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
          minimap: { enabled: false },
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          lineNumbers: 'off',
          wordWrap: 'on',
          fontFamily: 'var(--mono)',
          fontLigatures: true,
          fontSize: 18,
          folding: false,
          bracketPairColorization: { enabled: true },
          // contextmenu: false,
          lineHeight: 1.5,
          renderLineHighlightOnlyWhenFocus: true,
          guides: { indentation: false },
          cursorSmoothCaretAnimation: 'on',
          cursorStyle: 'block',
          cursorWidth: 32,
        }}
      />
      <Preview markdownString={markdown} />
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
