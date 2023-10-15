import { LikeButton } from '@/components/like-button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Page({
  params: { id },
}: { params: { id: number } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: posts } = await supabase
    .from('posts')
    .select('*, likes(post_id, user_id)')
    .eq('id', id);

  if (posts === null) {
    return <div>post not found</div>;
  }

  const post = posts[0];
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const hasUserLiked = post.likes.some(
    (like) => like.user_id === session?.user.id,
  );

  const likesCount = post.likes.length;

  return (
    <article className="flex flex-col items-start gap-4">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton
        data={{
          likes: likesCount,
          isLikedInitially: hasUserLiked,
          post_id: post.id,
        }}
      />
    </article>
  );
}
