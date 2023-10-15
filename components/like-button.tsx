'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  useEffect,
  useState,
  experimental_useOptimistic as useOptimistic,
} from 'react';

interface LikeButtonProps {
  data: {
    hasUserLiked: boolean;
    post_id: string;
    likes: number;
  };
}

export function LikeButton({
  data: { likes, post_id, hasUserLiked },
}: LikeButtonProps) {
  const [likeState, setLikeState] = useState({
    isLiked: hasUserLiked,
    likes: likes + (hasUserLiked ? 1 : 0),
  });
  const [optimisticLikeCount, setOptimisticLikeCount] =
    useOptimistic(likeState);
  const supabase = createClientComponentClient<Database>();

  async function handleLikes() {
    setLikeState((prev) => ({
      likes: likes + (prev.isLiked ? 0 : 1),
      isLiked: !prev.isLiked,
    }));
    // const newOptimisticLikeCount = likeCount === likes ? likeCount - 1 : ;
    // setOptimisticLikeCount(newOptimisticLikeCount);
    // setLikeCount((prev) => (prev === likes ? likes - 1 : likes));
    // setIsLiked((prev) => !prev);
    // const hasUserLiked = likes.some((like) => like.user_id === user.id);
    // console.log(hasUserLiked);
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

  return (
    <button
      type="button"
      onClick={handleLikes}
      className={`${likeState.isLiked && 'text-cyan-300'}`}
    >
      Like {likeState.likes}
    </button>
  );
}
