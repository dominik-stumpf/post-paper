'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEvent, useState } from 'react';
import { Editor } from './editor';

import initialMarkdown from './react-hooks-post.md';
import { RenderPaper } from '@/components/render-paper/render-paper';

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const [editorContent, setEditorContent] = useState(initialMarkdown);

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

    // const paperParser = new PaperParser(editorStateRef.current);
    // const parsedPaper = paperParser.parse();

    console.log(`inserting ${editorContent}`);
    // await supabase.from('posts').insert({
    //   paper_data: editorContent,
    //   user_id: session.user.id,
    // });
  }

  return (
    <form
      className="w-full max-w-screen-2xl h-remaining mx-auto overflow-hidden grid grid-cols-2 gap-16"
      onSubmit={handleSubmit}
    >
      <Editor
        initialEditorContent={initialMarkdown}
        setEditorContent={setEditorContent}
      />
      <div className="h-remaining flex flex-col relative">
        <Preview markdown={editorContent} />
        <button type="submit" className="">
          Post Paper
        </button>
      </div>
    </form>
  );
}

function Preview({ markdown }: { markdown: string }) {
  return (
    <div className="overflow-y-scroll h-full">
      <RenderPaper>{markdown}</RenderPaper>
    </div>
  );
}
