'use client';

import { EditorState, LexicalNode } from 'lexical';
import { useRef, FormEvent } from 'react';
import { Editor } from './editor';
// import { submitPost } from './submit-post-action';
import { PaperParser } from './paper-parser';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Page() {
  const supabase = createClientComponentClient<Database>();

  // if (session === null) {
  //   redirect('/');
  // }

  const editorStateRef = useRef<EditorState | undefined>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (editorStateRef.current === undefined) {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
      return;
    }

    const paperParser = new PaperParser(editorStateRef.current);
    const { fullPaper, truncatedPaper } = paperParser.parse();

    await supabase.from('posts').insert({
      paper_data: fullPaper,
      paper_data_brief: truncatedPaper,
      user_id: session.user.id,
    });
  }

  return (
    <form
      className="w-full flex flex-row justify-center items-start gap-16 py-16"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8 w-full items-center">
        <Editor editorStateRef={editorStateRef} />
        <button type="submit">Post Paper</button>
      </div>
    </form>
  );
}
