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
  Keyboard,
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
      <output className="pointer-events-none w-full select-none">
        <PageMargin verticalMargin className="mb-[-35dvh]">
          <Preview markdown={initialMarkdown} positionOffset={1024} />
        </PageMargin>
      </output>
      <main className="sticky bottom-0 mx-auto h-[75dvh] w-full max-w-screen-2xl translate-y-3/4 overflow-hidden rounded border bg-background/85 px-2 py-4 ring-ring ring-offset-2 ring-offset-background transition-transform ease-in-out focus-within:translate-y-0 focus-within:ring-2 hover:border-muted-foreground focus-visible:outline-none md:bottom-4 md:bg-background/50 md:px-12 md:backdrop-blur md:backdrop-saturate-150">
        <EditorMemo />
        <aside className="absolute bottom-4 right-4 flex max-w-full items-end gap-4 overflow-auto md:flex-col">
          <Button size="icon" variant="outline">
            <HelpCircle />
          </Button>
          <Button size="icon" variant="outline">
            <Keyboard />
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
