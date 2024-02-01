'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type FormEvent, useState } from 'react';
import { EditorMemo } from './editor';
import reactHooksPost from '@/public/markdown/react-hooks-post-validate.md';
import { useToast } from '@/components/ui/use-toast';
import { Preview } from './preview';
import { PageMargin } from '@/components/page-margin';

const initialMarkdown = reactHooksPost;

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
    <div className="relative h-remaining overflow-hidden">
      <output className="pointer-events-none flex select-none flex-col items-center">
        <PageMargin verticalMargin>
          <Preview markdown={initialMarkdown} positionOffset={0} />
        </PageMargin>
      </output>
      <main className="absolute bottom-8 left-1/2 h-3/4 w-full max-w-screen-2xl -translate-x-1/2 overflow-hidden rounded border bg-background/60 px-8 py-4 ring-ring ring-offset-2 ring-offset-background backdrop-blur transition-colors focus-within:ring-2 hover:border-muted-foreground focus-visible:outline-none">
        <EditorMemo />
      </main>
    </div>
  );
  // return (
  //   <form
  //     className="mx-auto grid h-remaining w-full max-w-screen-2xl grid-cols-2 gap-16 overflow-hidden"
  //     onSubmit={handleSubmit}
  //   >
  //     <Editor
  //       initialEditorContent={initialMarkdown}
  //       setEditorContent={setEditorContent}
  //       setPositionOffset={setPositionOffset}
  //     />
  //     <div className="relative flex h-remaining flex-col">
  //       <Preview markdown={editorContent} positionOffset={positionOffset} />
  //       <Button type="submit" variant={'outline'} className="mt-4">
  //         Post Paper
  //       </Button>
  //     </div>
  //   </form>
  // );
}
