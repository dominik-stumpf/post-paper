import { PaperCard } from '@/components/paper-card';
import { createClient } from '@supabase/supabase-js';

export default async function Index() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(name, avatar_url), likes(count)')
    .order('created_at', { ascending: false })
    .range(0, 8);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid w-full gap-12 py-12 place-items-center">
        {posts?.map((post) => (
          <PaperCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
