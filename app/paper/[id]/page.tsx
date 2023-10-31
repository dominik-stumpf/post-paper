import { Avatar } from '@/components/avatar';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { LikeButton } from '@/components/like-button';
import { PageRoot } from '@/components/page-root';

import { RenderPaper } from '@/components/render-paper/render-paper';
import { createClient } from '@supabase/supabase-js';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export const dynamic = 'force-dynamic';

export default async function Page({
  params: { id },
}: { params: { id: number } }) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  // const { data: posts } = await supabase
  //   .rpc('get_post_list')
  //   .order('created_at', { ascending: false })
  //   .range(0, 10);

  // const supabase = createServerComponentClient<Database>({ cookies });

  const { data: post } = await supabase
    .from('posts')
    .select('*, profiles(name, avatar_url)')
    .eq('id', id)
    .limit(1)
    .single();

  if (post === null || post.profiles === null) {
    return <div>post not found</div>;
  }

  const {
    profiles: { avatar_url, name },
  } = post;

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // const hasUserLiked = post.likes.some(
  //   (like) => like.user_id === session?.user.id,
  // );

  // const likesCount = post.likes.length;

  return (
    <PageRoot>
      <main>
        <div className="flex items-center gap-2 grow mb-8">
          <Avatar imageSrc={avatar_url} />
          <div>{name}</div>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <LikeButton
            data={{
              // likes: likesCount,
              // isLikedInitially: hasUserLiked,
              post_id: post.id,
            }}
          />
          <CopyToClipboard copyHref>share link</CopyToClipboard>
        </div>
        <RenderPaper>{post.paper_data}</RenderPaper>
      </main>
    </PageRoot>
  );
}
