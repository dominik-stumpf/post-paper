import { PaperCard } from '@/components/paper-card';
import { createClient } from '@supabase/supabase-js';

export default async function Index() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const { data: posts } = await supabase
    .rpc('get_post_list')
    // .from('posts')
    // .select('paper_data, created_at, id, likes(id), profiles(name, avatar_url)')
    .order('created_at', { ascending: false })
    .range(0, 10);

  // console.log(posts);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid w-full gap-12 py-12 place-items-center">
        {posts?.map((post) => (
          <PaperCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
