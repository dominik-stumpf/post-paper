'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEvent, useState } from 'react';
import { Editor } from './editor';
import initialMarkdown from './react-hooks-post.md';

import { Preview } from './preview';
import { Button } from '@/components/ui/button';

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const [editorContent, setEditorContent] = useState(initialMarkdown);
  const [positionOffset, setPositionOffset] = useState(0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (editorContent === '') {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
      return;
    }

    await supabase.from('posts').insert({
      paper_data: editorContent,
      user_id: session.user.id,
    });
  }

  return (
    <form
      className="grid overflow-hidden grid-cols-2 gap-16 mx-auto w-full max-w-screen-2xl h-remaining"
      onSubmit={handleSubmit}
    >
      <Editor
        initialEditorContent={initialMarkdown}
        setEditorContent={setEditorContent}
        setPositionOffset={setPositionOffset}
      />
      <div className="flex relative flex-col h-remaining">
        <Preview markdown={editorContent} positionOffset={positionOffset} />
        <Button type="submit" variant={'outline'} className="mt-4">
          Post Paper
        </Button>
      </div>
    </form>
  );
}
