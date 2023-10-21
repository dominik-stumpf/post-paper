'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEvent, useRef } from 'react';
import { Editor } from './editor';
import { PaperParser } from './paper-parser';
import placeholder from './placeholder.md';

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const editorContentRef = useRef(placeholder);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (editorContentRef.current === '') {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
      return;
    }

    // const paperParser = new PaperParser(editorStateRef.current);
    // const parsedPaper = paperParser.parse();

    console.log(`inserting ${editorContentRef.current}`);
    await supabase.from('posts').insert({
      paper_data: editorContentRef.current,
      user_id: session.user.id,
    });
  }

  return (
    <form
      className="w-full h-[80vh] max-h-[80vh] mt-16 px-16 overflow-hidden grid grid-cols-2 gap-16 grid-rows-[1fr_auto]"
      onSubmit={handleSubmit}
    >
      <Editor editorContentRef={editorContentRef} />
      <button type="submit" className="col-span-2">
        Post Paper
      </button>
    </form>
  );
}
