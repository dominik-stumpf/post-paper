// import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEditorStore } from './editor-store';
import type { z } from 'zod';
import type { publishPayloadSchema } from '@/lib/validators/article';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';

export function useArticlePublisher() {
  const supabase = createClientComponentClient<Database>();
  const editorContent = useEditorStore((state) => state.editorContent);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  // const { toast } = useToast();

  async function handlePublish() {
    if (editorContent === '') {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
      console.error('session not found');
      return;
    }

    const pathname = window.location.pathname;
    let articleId: string | undefined = pathname.slice(
      pathname.lastIndexOf('/') + 1,
    );
    articleId = articleId === 'write' ? undefined : articleId;

    const payload: z.infer<typeof publishPayloadSchema> = {
      articleContent: editorContent,
      articleId,
    } as const;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    } satisfies RequestInit;

    setIsLoading(true);
    const response = await fetch('/api/publish', options);
    setIsLoading(false);

    if (response.status === 200) {
      const { redirectUrl } = await response.json();
      window.history.replaceState(null, '', redirectUrl);
      // router.replace(redirectUrl);
    }
  }

  return { handlePublish, isLoading };
}
