import LogoutButton from '@/components/logout-button';
import { PaperCard } from '@/components/paper-card';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(*), likes(*)')
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
