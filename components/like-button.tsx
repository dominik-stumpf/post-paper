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

export function LikeButton({
  data: { likes, post_id, isLikedInitially },
}: LikeButtonProps) {
  // const calcNextLikeState = useCallback(
  //   calculateNextLikeState({ isLikedInitially, likes }),
  //   [],
  // );
  // const [isLiked, setIsLiked] = useState(isLikedInitially);
  // const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic({
  //   isLiked: isLiked,
  //   isPending: false,
  // });
  // const hasUserInteracted = useRef(false);
  // const throttleTimeoutId = useRef<number | null>(null);
  // const supabase = createClientComponentClient<Database>();

  // async function handleLikes() {
  //   const newOptimisticIsLiked = {
  //     isLiked: !optimisticIsLiked.isLiked,
  //     isPending: true,
  //   };

  //   setOptimisticIsLiked(newOptimisticIsLiked);

  //   if (throttleTimeoutId.current !== null) {
  //     clearTimeout(throttleTimeoutId.current);
  //   }

  //   throttleTimeoutId.current = window.setTimeout(() => {
  //     setIsLiked(!optimisticIsLiked.isLiked);
  //     hasUserInteracted.current = true;
  //   }, 350);
  // }

  // useEffect(() => {
  //   if (!hasUserInteracted.current) {
  //     return;
  //   }
  //   (async () => {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser();

  //     if (error) {
  //       setIsLiked(false);
  //       return;
  //     }

  //     if (!user) {
  //       setIsLiked(false);
  //       return;
  //     }

  //     const insertController = new AbortController();
  //     const deleteController = new AbortController();

  //     if (isLiked) {
  //       const response = await supabase
  //         .from('likes')
  //         .insert({ user_id: user.id, post_id: post_id })
  //         .abortSignal(insertController.signal);
  //       console.log('inserted new row, status:', response.status);
  //     } else {
  //       const response = await supabase
  //         .from('likes')
  //         .delete()
  //         .match({ user_id: user.id, post_id: post_id })
  //         .abortSignal(deleteController.signal);
  //       console.log('deleted current row, status:', response.status);
  //     }
  //   })();
  // }, [isLiked, post_id, supabase]);

  const calcNextLikeState = useCallback(
    calculateNextLikeState({ isLikedInitially, likes }),
    [],
  );

  const [isLiked, setIsLiked] = useState(isLikedInitially);
  const user = useClientUser();
  const hasUserInteracted = useRef(false);
  const supabase = createClientComponentClient<Database>();

  const handleLike = useCallback(() => {
    if (!user) {
      setIsLiked(false);
      console.log('login to like');
      return;
    }

    setIsLiked((prev) => !prev);
    hasUserInteracted.current = true;
  }, [user]);

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
      className={`${isLiked && 'text-cyan-300'}`}
    >
      Like {calcNextLikeState(isLiked)}
    </button>
  );
}
