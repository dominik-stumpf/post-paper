'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEvent, useState } from 'react';
import { Editor } from './editor';
import initialMarkdown from './react-hooks-post.md';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Preview } from './preview';

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();
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

    const { error } = await supabase.from('posts').insert({
      paper_data: editorContent,
      user_id: session.user.id,
    });

    if (error) {
      toast({
        title: "Paper couldn't be created",
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Created new paper',
      description: "View it in the latest feed, don't forget to refresh page.",
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
