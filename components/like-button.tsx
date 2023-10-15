'use client';

import { useClientUser } from '@/hooks/use-client-user';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useCallback,
} from 'react';

interface LikeButtonProps {
  data: {
    isLikedInitially: boolean;
    post_id: string;
    likes: number;
  };
}

function calculateNextLikeState({
  isLikedInitially,
  likes,
}: { isLikedInitially: boolean; likes: number }) {
  const offsetIfLiked = isLikedInitially ? -1 : 0;
  const offsetIfNotLiked = isLikedInitially ? 0 : 1;
  return (isLiked: boolean) =>
    isLiked ? likes + offsetIfNotLiked : likes + offsetIfLiked;
}

const throttleTimeoutMs = 350;

export function LikeButton({
  data: { likes, post_id, isLikedInitially },
}: LikeButtonProps) {
  const calcNextLikeState = useCallback(
    calculateNextLikeState({ isLikedInitially, likes }),
    [],
  );

  const [isLiked, setIsLiked] = useState(isLikedInitially);
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic({
    isLiked: isLiked,
  });
  const user = useClientUser();
  const hasUserInteracted = useRef(false);
  const supabase = createClientComponentClient<Database>();
  const throttleTimeoutId = useRef<undefined | number>();

  const handleLike = () => {
    if (!user) {
      setIsLiked(false);
      console.log('login to like');
      return;
    }

    const newOptimisticIsLiked = { isLiked: !optimisticIsLiked.isLiked };
    setOptimisticIsLiked(newOptimisticIsLiked);

    if (throttleTimeoutId.current !== null) {
      clearTimeout(throttleTimeoutId.current);
    }

    throttleTimeoutId.current = window.setTimeout(() => {
      setIsLiked(!optimisticIsLiked.isLiked);
      hasUserInteracted.current = true;
    }, throttleTimeoutMs);
  };

  useEffect(() => {
    if (!(hasUserInteracted.current && user)) {
      return;
    }

    const abortController = new AbortController();
    (async () => {
      if (isLiked) {
        const response = await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: post_id })
          .abortSignal(abortController.signal);
        console.log('insert', response.status);
      } else {
        const response = await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: post_id })
          .abortSignal(abortController.signal);
        console.log('delete', response.status);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [isLiked, supabase, post_id, user]);

  return (
    <button
      type="button"
      onClick={handleLike}
      className={`${optimisticIsLiked.isLiked && 'text-cyan-300'}`}
    >
      Like {calcNextLikeState(optimisticIsLiked.isLiked)}
    </button>
  );
}
