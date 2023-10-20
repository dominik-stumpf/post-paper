'use client';

import { proseClassName } from '@/components/prose';
import { JetBrains_Mono } from 'next/font/google';
import Markdown from 'react-markdown';
import placeholder from './placeholder.md';
import { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';

const jetbrainsMono = JetBrains_Mono({
  variable: '--mono',
  subsets: ['latin'],
});

export function Editor() {
  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }
  return (
    <MonacoEditor
      height="200vh"
      width="100ch"
      defaultLanguage="markdown"
      defaultValue={placeholder}
      theme="vs-dark"
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
    />
  );
}

// export const Editor: React.FC = () => {
//   const divEl = useRef<HTMLDivElement>(null);
//   let editor: monaco.editor.IStandaloneCodeEditor;
//   // biome-ignore lint/nursery/useExhaustiveDependencies: <explanation>
//   useEffect(() => {
//     // monaco.editor.defineTheme('myCustomTheme', {
//     //   base: 'vs-dark', // can also be vs-dark or hc-black
//     //   inherit: true, // can also be false to completely replace the builtin rules
//     //   rules: [
//     //     // {
//     //     // 	token: "comment",
//     //     // 	foreground: "ffa500",
//     //     // 	fontStyle: "italic underline",
//     //     // },
//     //     // { token: "comment.js", foreground: "008800", fontStyle: "bold" },
//     //     // { token: "comment.css", foreground: "0000ff" }, // will inherit fontStyle from `comment` above
//     //     // { token: "identifier.ts", foreground: "ff0000", fontStyle: 'italic'}
//     //   ],
//     //   // colors: {}
//     // });

//     if (divEl.current) {
//       editor = monaco.editor.create(divEl.current, {
//         value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
//           '\n',
//         ),
//         language: 'typescript',
//         theme: 'vs-dark',
//       });
//     }

//     console.log(editor.getValue());

//     return () => {
//       editor.dispose();
//     };
//   }, []);
//   return <div className="Editor" ref={divEl} />;
// };

// export function Editor() {
//   return (
//     <>
//       <Markdown
//         className={`${proseClassName} min-h-[75vh] outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black ${jetbrainsMono.variable} prose-code:font-[var(--mono)]`}
//       >
//         {placeholder}
//       </Markdown>
//     </>
//   );
// }
