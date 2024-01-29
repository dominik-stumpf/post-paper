import { PaperCard } from '@/components/paper-card';
import { Heading } from '@/components/typography/heading';
import { PaperParser } from '@/lib/paper-parser';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/validate-env-vars.mjs';

export const revalidate = 1800;

function RenderPaperItem({ post }: { post: GetPostList }) {
  const paperParser = new PaperParser(post.truncated_paper_data);
  const parsedCard = paperParser.parseCard();
  // const { isPaperValid } = paperParser.validateParsedCard(parsedCard);

  // if (!isPaperValid) {
  //   return null;
  // }

  return (
    <>
      <PaperCard {...post} parsedCard={parsedCard} />
      {<hr className="border-border" />}
    </>
  );
}

export default async function Index() {
  const supabase = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const { data: posts } = await supabase
    .rpc('get_post_list')
    .order('created_at', { ascending: false })
    .range(0, 7);

  return (
    <>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8">
        <Heading variant={'h1'} className="mb-2 justify-self-start">
          Latest
        </Heading>
        {posts?.map((post) => (
          <RenderPaperItem post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}
