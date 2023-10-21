'use client';

import { EditorState } from 'lexical';
import { useRef, FormEvent } from 'react';
import { Editor } from './editor';
import { PaperParser } from './paper-parser';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Page() {
  const supabase = createClientComponentClient<Database>();
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
    const parsedPaper = paperParser.parse();

    console.log(`inserting ${parsedPaper}`);
    // await supabase.from('posts').insert({
    //   paper_data: fullPaper,
    //   user_id: session.user.id,
    // });
  }

  return (
    <form
      className="w-full flex flex-col items-center gap-16 py-16"
      onSubmit={handleSubmit}
    >
      <div className={'flex flex-row gap-16 w-full justify-center'}>
        <Editor />
      </div>
      <button type="submit">Post Paper</button>
    </form>
  );
}
