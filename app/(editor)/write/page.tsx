'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type FormEvent, useState } from 'react';
import { EditorMemo } from './editor';
import reactHooksPost from '@/public/markdown/react-hooks-post.md';
import { useToast } from '@/components/ui/use-toast';
import { Preview } from './preview';
import { PageMargin } from '@/components/page-margin';
import {
  Forward,
  HelpCircle,
  Settings,
  SplitSquareVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="relative w-full">
      <output className="pointer-events-none flex select-none flex-col items-center">
        <PageMargin verticalMargin className="mb-[30dvh]">
          <Preview markdown={initialMarkdown} positionOffset={1024} />
        </PageMargin>
      </output>
      <div className="fixed inset-x-0 bottom-0 m-4 h-3/4 select-none">
        <main className="relative bottom-0 left-1/2 h-full w-full max-w-screen-2xl -translate-x-1/2 translate-y-3/4 overflow-hidden rounded border bg-background/60 px-12 py-4 ring-ring ring-offset-2 ring-offset-background backdrop-blur transition-transform ease-in-out focus-within:translate-y-0 focus-within:ring-2 hover:border-muted-foreground focus-visible:outline-none">
          <EditorMemo />
          <aside className="absolute bottom-4 right-4 flex flex-col items-end gap-4">
            <Button size="icon" variant="outline">
              <HelpCircle />
            </Button>
            <Button size="icon" variant="outline">
              <Settings />
            </Button>
            <Button size="icon" variant="outline">
              <SplitSquareVertical />
            </Button>
            <Button size="icon">
              <Forward />
            </Button>
          </aside>
        </main>
      </div>
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
