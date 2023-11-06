import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { LikeButton } from '@/components/like-button';
import { PageRoot } from '@/components/page-root';
import { RenderPaper } from '@/components/render-paper/render-paper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@supabase/supabase-js';

export default async function Page({
  params: { id },
}: { params: { id: number } }) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

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

  return (
    <PageRoot>
      <main className="mx-auto max-w-prose">
        <div className="flex gap-4 items-center mb-8">
          <Avatar>
            <AvatarImage src={avatar_url} alt="Author profile picture" />
            <AvatarFallback />
          </Avatar>
          <div>{name}</div>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <LikeButton post_id={post.id} />
          <CopyToClipboard copyHref>share link</CopyToClipboard>
        </div>
        <RenderPaper>{post.paper_data}</RenderPaper>
      </main>
    </PageRoot>
  );
}
