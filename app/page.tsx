import { PageRoot } from '@/components/page-root';
import { PaperCard } from '@/components/paper-card';
import { createClient } from '@supabase/supabase-js';

export default async function Index() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const { data: posts } = await supabase
    .rpc('get_post_list')
    .order('created_at', { ascending: false })
    .range(0, 10);

  return (
    <PageRoot>
      <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 mx-auto">
        {posts?.map((post) => (
          <PaperCard key={post.id} data={post} />
        ))}
      </div>
    </PageRoot>
  );
}
