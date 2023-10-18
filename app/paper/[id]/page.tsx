import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { LikeButton } from '@/components/like-button';
import { Prose } from '@/components/prose';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Markdown from 'react-markdown';

export const dynamic = 'force-dynamic';

export default async function Page({
  params: { id },
}: { params: { id: number } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: post } = await supabase
    .from('posts')
    .select('*, likes(post_id, user_id)')
    .eq('id', id)
    .limit(1)
    .single();

  if (post === null) {
    return <div>post not found</div>;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const hasUserLiked = post.likes.some(
    (like) => like.user_id === session?.user.id,
  );

  const likesCount = post.likes.length;

  return (
    <Prose>
      <div>
        <h1>{post.title}</h1>
        <Markdown>{post.content}</Markdown>
      </div>
      <LikeButton
        data={{
          likes: likesCount,
          isLikedInitially: hasUserLiked,
          post_id: post.id,
        }}
      />
      <CopyToClipboard copyHref>share link</CopyToClipboard>
    </Prose>
  );
}
