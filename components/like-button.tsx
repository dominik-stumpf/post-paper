'use client';

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
    isPending: false,
  });
  const hasUserInteracted = useRef(false);
  const throttleTimeoutId = useRef<number | null>(null);
  const supabase = createClientComponentClient<Database>();

  async function handleLikes() {
    const newOptimisticIsLiked = {
      isLiked: !optimisticIsLiked.isLiked,
      isPending: true,
    };

    setOptimisticIsLiked(newOptimisticIsLiked);

    if (throttleTimeoutId.current !== null) {
      clearTimeout(throttleTimeoutId.current);
    }

    throttleTimeoutId.current = window.setTimeout(() => {
      setIsLiked(!optimisticIsLiked.isLiked);
      hasUserInteracted.current = true;
    }, 350);
  }

  useEffect(() => {
    if (!hasUserInteracted.current) {
      return;
    }
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setIsLiked(false);
        return;
      }

      if (!user) {
        setIsLiked(false);
        return;
      }

      if (isLiked) {
        console.log('inserting new row');
        await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: post_id });
      } else {
        console.log('deleting current row');
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: post_id });
      }
    })();
  }, [isLiked, post_id, supabase]);

  return (
    <button
      type="button"
      onClick={handleLikes}
      className={`${optimisticIsLiked.isLiked && 'text-cyan-300'} ${
        optimisticIsLiked.isPending && 'opacity-50'
      }`}
    >
      Like {calcNextLikeState(optimisticIsLiked.isLiked)}
    </button>
  );
}
