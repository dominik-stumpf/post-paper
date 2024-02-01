'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { minimalSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { placeholder, EditorView } from '@codemirror/view';
import { useEffect, useRef } from 'react';
import { languages } from '@codemirror/language-data';

const markdownDocument = `
# your **starter** markdown file

about the *italics* and **bold**

\`\`\`rust
fn main() {
    println!("Hello, world!");
}
\`\`\`

\`\`\`tsx
export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current === null) {
      return;
    }

    const state = EditorState.create({
      doc: markdownDocument,
      extensions: [
        vim({ status: true }),
        minimalSetup,
        markdown(),
        placeholder('Enter some markdown...'),
        EditorView.lineWrapping,
        EditorView.theme({}, { dark: true }),
      ],
    });

    const editor = new EditorView({
      parent: editorRef.current,
      state,
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div
      ref={editorRef}
      id="editor"
      className="selection:bg-[unset] selection:text-[unset]"
    />
  );
}
\`\`\`

[link](https://example.com)

pararaphs

- unordered
- lists

1. ordered
2. lists
`.trim();

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current === null) {
      return;
    }

    const state = EditorState.create({
      doc: markdownDocument,
      extensions: [
        vim({ status: true }),
        minimalSetup,
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        placeholder('Enter some markdown...'),
        EditorView.lineWrapping,
        EditorView.theme({}, { dark: true }),
      ],
    });

    const editor = new EditorView({
      parent: editorRef.current,
      state,
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div
      ref={editorRef}
      id="editor"
      className="selection:bg-[inherit] selection:text-[inherit]"
    />
  );
}
