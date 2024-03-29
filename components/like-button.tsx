'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useClientUser } from '@/hooks/use-client-user';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThumbsUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface LikeButtonProps {
  post_id: string;
}

const throttleTimeoutMs = 300;

export function LikeButton({ post_id }: LikeButtonProps) {
  const { toast } = useToast();
  const [like, setLike] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const initialLikeCount = useRef<number | null>(null);
  const { isLoading, user } = useClientUser();
  const supabase = createClientComponentClient<Database>();
  const [lastSyncedIsLikedState, setLastSyncedIsLikedState] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    if (like !== null || isLoading) return;

    async function setInitialStates() {
      const { data: likes } = await supabase
        .from('likes')
        .select('count')
        .eq('post_id', post_id)
        .limit(1)
        .single();

      const { count } = likes as unknown as { count: number };
      let isLiked = false;
      if (user) {
        const { data } = await supabase
          .from('likes')
          .select()
          .eq('user_id', user.id)
          .eq('post_id', post_id)
          .maybeSingle();

        isLiked = data !== null;
      }
      setIsLiked(isLiked);
      initialLikeCount.current = count - (isLiked ? 1 : 0);
      setLike(initialLikeCount.current);
    }

    setInitialStates();
  }, [supabase, post_id, user, isLoading, like]);

  useEffect(() => {
    if (initialLikeCount.current === null || !user) return;

    setLike(initialLikeCount.current + (isLiked ? 1 : 0));

    const throttleTimeoutId = window.setTimeout(() => {
      setLastSyncedIsLikedState((prev) => (prev === null ? null : isLiked));
    }, throttleTimeoutMs);

    return () => {
      clearTimeout(throttleTimeoutId);
    };
  }, [isLiked, user]);

  useEffect(() => {
    if (!user || lastSyncedIsLikedState === null) return;

    const abortController = new AbortController();

    (async () => {
      if (lastSyncedIsLikedState) {
        await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: post_id })
          .abortSignal(abortController.signal);
      } else {
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: post_id })
          .abortSignal(abortController.signal);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [lastSyncedIsLikedState, user, post_id, supabase]);

  return (
    <Button
      variant={'ghost'}
      onClick={() => {
        if (!user) {
          toast({ title: 'Log in to like this post.' });
          return;
        }
        setIsLiked((prev) => !prev);
        if (lastSyncedIsLikedState === null) {
          setLastSyncedIsLikedState(!isLiked);
        }
      }}
      disabled={like === null}
      className={`${
        isLiked &&
        'font-extrabold text-primary-foreground hover:text-primary-foreground'
      } space-x-2 disabled:opacity-50`}
    >
      <ThumbsUp className="h-4 w-4" /> <span>{like === null ? '~' : like}</span>
    </Button>
  );
}
