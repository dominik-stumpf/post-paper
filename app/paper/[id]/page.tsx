import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Page({
  params: { id },
}: { params: { id: number } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: posts } = await supabase.from('posts').select('*').eq('id', id);

  if (posts === null) {
    return <div>post not found</div>;
  }

  const post = posts[0];

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
