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
  const supabase = createClientComponentClient<Database>();
  const abort = useRef<number | null>(null);

  async function handleLikes() {
    const newOptimisticIsLiked = {
      isLiked: !optimisticIsLiked.isLiked,
      isPending: true,
    };

    setOptimisticIsLiked(newOptimisticIsLiked);

    if (abort.current !== null) {
      clearTimeout(abort.current);
    }

    abort.current = window.setTimeout(() => {
      setIsLiked(!optimisticIsLiked.isLiked);
      hasUserInteracted.current = true;
    }, 350);
    // if (hasUserLiked) {
    //   // setLikeCount((prev) => prev + 1);
    //   await supabase
    //     .from('likes')
    //     .delete()
    //     .match({ user_id: user.id, post_id: post_id });
    // } else {
    //   await supabase
    //     .from('likes')
    //     .insert({ user_id: user.id, post_id: post_id });
    // }
  }

  useEffect(() => {
    if (hasUserInteracted.current) {
      console.log(isLiked ? 'inserting new row' : 'deleting current row');
    }
  }, [isLiked]);

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
