import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { LikeButton } from '@/components/like-button';
import { PageRoot } from '@/components/page-root';
import { RenderPaper } from '@/components/render-paper/render-paper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'lucide-react';

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
        <div className="flex gap-4 justify-between items-center mb-8">
          <div className="grid grid-cols-[auto,1fr] gap-x-4 grid-rows-2 items-center">
            <Avatar className="row-span-2">
              <AvatarImage src={avatar_url} alt="Author profile picture" />
              <AvatarFallback />
            </Avatar>
            <div className="font-bold">{name}</div>
            <div className="flex gap-2 text-muted-foreground">
              <div>Role title</div>/
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
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
    </PageRoot>
  );
}
