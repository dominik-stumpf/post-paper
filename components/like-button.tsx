'use client';

import { useClientUser } from '@/hooks/use-client-user';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState, useRef } from 'react';

interface LikeButtonProps {
  data: {
    post_id: string;
  };
}

const throttleTimeoutMs = 300;

export function LikeButton({ data: { post_id } }: LikeButtonProps) {
  const [like, setLike] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const initialLikeCount = useRef<number | null>(null);
  const { isLoading, user } = useClientUser();
  const supabase = createClientComponentClient<Database>();
  const throttleTimeoutId = useRef<undefined | number>();
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
    if (initialLikeCount.current === null) return;
    if (!user) {
      console.log('login to like');
      return;
    }

    setLike(initialLikeCount.current + (isLiked ? 1 : 0));
    handleLike();
  }, [isLiked, user]);

  function handleLike() {
    if (throttleTimeoutId.current !== undefined) {
      clearTimeout(throttleTimeoutId.current);
      throttleTimeoutId.current = undefined;
    }

    throttleTimeoutId.current = window.setTimeout(() => {
      if (lastSyncedIsLikedState !== null) {
        setLastSyncedIsLikedState(isLiked);
      }
    }, throttleTimeoutMs);
  }

  useEffect(() => {
    if (!user || lastSyncedIsLikedState === null) return;
    console.log(lastSyncedIsLikedState);

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
    <button
      type="button"
      onClick={() => {
        setIsLiked((prev) => !prev);
        if (lastSyncedIsLikedState === null) {
          setLastSyncedIsLikedState(!isLiked);
        }
      }}
      disabled={like === null}
      className={`${isLiked && 'text-cyan-300'} disabled:opacity-50`}
    >
      Like {like === null ? '~' : like}
    </button>
  );
}
