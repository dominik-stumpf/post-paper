'use client';

import { PageMargin } from '@/components/page-margin';
import { Editor } from '../editor';
import { Preview } from '../preview';
import { useEditorStore } from '../editor-store';
import { useEffect } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EditorActions } from '../editor-actions';
import { SettingsPane } from '../settings-pane';
import { ArticleStats } from '../article-stats';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import reactHooksPost from '@/public/markdown/react-hooks-post-validate.md';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const isEditorFocused = useEditorStore((state) => state.isEditorFocused);
  const isPreviewEnabled = useEditorStore((state) => state.isPreviewEnabled);
  const isMouseModeActive = useEditorStore((state) => state.isMouseModeActive);
  const setInitialEditorContent = useEditorStore(
    (state) => state.setInitialEditorContent,
  );
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const postId = params.slug?.at(0);
    if (!postId) {
      setInitialEditorContent(reactHooksPost);
      return;
    }

    (async () => {
      const {
        error: authError,
        data: { session },
      } = await supabase.auth.getSession();

      if (authError || session === null) {
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*, profiles(id, name, avatar_url)')
        .eq('id', postId)
        .limit(1)
        .single();

      if (error || !data.profiles) {
        console.error('Failed to load article');
        return;
      }

      if (data.profiles.id !== session.user.id) {
        console.error('Unauthorized access');
        router.back();
        return;
      }

      setInitialEditorContent(data.paper_data);
    })();
  }, [supabase, setInitialEditorContent, params, router]);

  useEffect(() => {
    if (isEditorFocused) {
      document.documentElement.style.setProperty('--header-offset', '-100%');
    } else {
      document.documentElement.style.setProperty('--header-offset', '0');
    }
  }, [isEditorFocused]);

  return (
    <div className="relative mb-[50dvh] min-h-[120dvh] w-full">
      {isPreviewEnabled && (
        <output className="w-full">
          <PageMargin verticalMargin className="relative mb-[35dvh]">
            <div className="relative left-1/2 max-w-prose -translate-x-1/2">
              <Preview />
            </div>
          </PageMargin>
        </output>
      )}
      <Drawer>
        <TooltipProvider>
          <main className="fixed bottom-0 left-1/2 z-20 h-[66dvh] w-full max-w-screen-2xl -translate-x-1/2 translate-y-3/4 overflow-hidden rounded border bg-background/90 px-2 py-4 ring-ring ring-offset-2 ring-offset-background transition-transform ease-in-out focus-within:translate-y-0 focus-within:ring-2 hover:border-muted-foreground focus-visible:outline-none md:bottom-4 md:bg-background/50 md:px-12 md:backdrop-blur md:backdrop-saturate-150">
            <Editor />
            <ArticleStats />
            {isMouseModeActive && <EditorActions />}
            <SettingsPane />
          </main>
        </TooltipProvider>
      </Drawer>
    </div>
  );
}
