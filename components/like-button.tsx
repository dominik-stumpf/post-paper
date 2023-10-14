'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

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
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(hasUserLiked);
  const supabase = createClientComponentClient<Database>();
  useEffect(() => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // if (user === null) return;
  }, []);

  useEffect(() => {
    setLikeCount(likes + (isLiked ? 1 : 0));
  }, [isLiked, likes]);

  async function handleLikes() {
    setIsLiked((prev) => !prev);
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
      className={`${isLiked && 'text-cyan-300'}`}
    >
      {likeCount} Likes
    </button>
  );
}
