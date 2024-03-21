import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { LikeButton } from '@/components/like-button';
import { RenderPaper } from '@/components/render-paper/render-paper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatPostDate } from '@/lib/timestamp-formatter';
import { env } from '@/validate-env-vars.mjs';
import { createClient } from '@supabase/supabase-js';

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  const supabase = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
    <main className="mx-auto max-w-prose">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-4">
          <Avatar className="row-span-2">
            <AvatarImage src={avatar_url} alt="Author profile picture" />
            <AvatarFallback />
          </Avatar>
          <div className="font-bold">{name}</div>
          <div className="flex gap-2 text-muted-foreground">
            <div>Role title</div>/
            <time dateTime={post.created_at}>
              {formatPostDate(post.created_at)}
            </time>
          </div>
        </div>
        <div className="space-x-2">
          <LikeButton post_id={post.id} />
          <CopyToClipboard copyHref />
        </div>
      </div>
      <RenderPaper>{post.paper_data}</RenderPaper>
    </main>
  );
}
