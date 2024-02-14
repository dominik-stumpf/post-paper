'use client';

import { PageMargin } from '@/components/page-margin';
import { Editor } from './editor';
import { Preview } from './preview';
import { useEditorStore } from './editor-store';
import { useEffect } from 'react';
import * as Drawer from '@/components/ui/drawer';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import { EditorActions } from './editor-actions';
import { SettingsPane } from './settings-pane';

export function CharacterCount() {
  const editorContent = useEditorStore((state) => state.editorContent);
  // const wordCount = editorContent.match(/\w+/g)?.length ?? 0;

  return (
    <code className="absolute right-4 top-4 flex select-none flex-col items-end text-xs font-bold">
      <div>{editorContent.length}</div>
    </code>
  );
}

export default function Page() {
  // const supabase = createClientComponentClient<Database>();
  // const { toast } = useToast();

  const isEditorFocused = useEditorStore((state) => state.isEditorFocused);

  useEffect(() => {
    if (isEditorFocused) {
      document.documentElement.style.setProperty('--header-offset', '-100%');
    } else {
      document.documentElement.style.setProperty('--header-offset', '0');
    }
  }, [isEditorFocused]);

  return (
    <div className="relative mb-[120dvh] min-h-[120dvh] w-full">
      <output className="w-full">
        <PageMargin verticalMargin className="mb-[35dvh]">
          <Preview />
        </PageMargin>
      </output>
      <Drawer.Drawer>
        <TooltipProvider>
          <main className="fixed bottom-0 left-1/2 z-20 h-[66dvh] w-full max-w-screen-2xl -translate-x-1/2 translate-y-3/4 overflow-hidden rounded border bg-background/85 px-2 py-4 ring-ring ring-offset-2 ring-offset-background transition-transform ease-in-out focus-within:translate-y-0 focus-within:ring-2 hover:border-muted-foreground focus-visible:outline-none md:bottom-4 md:bg-background/50 md:px-12 md:backdrop-blur md:backdrop-saturate-150">
            <Editor />
            <CharacterCount />
            <EditorActions />
            <SettingsPane />
          </main>
        </TooltipProvider>
      </Drawer.Drawer>
    </div>
  );
}

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

// async function handleSubmit(event: FormEvent) {
//   event.preventDefault();
//
//   if (editorContent === '') {
//     return;
//   }
//
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//
//   if (session === null) {
//     return;
//   }
//
//   console.log('creating post:', {
//     paper_data: editorContent,
//     user_id: session.user.id,
//   });
//
//   // const { error } = await supabase.from('posts').insert({
//   //   paper_data: editorContent,
//   //   user_id: session.user.id,
//   // });
// }
