import { PageRoot } from '@/components/page-root';
import { PaperCard } from '@/components/paper-card';
import { Heading } from '@/components/typography/heading';
import { PaperParser } from '@/utils/paper-parser';
import { createClient } from '@supabase/supabase-js';

function RenderPaperItem({ post }: { post: GetPostList }) {
  const paperParser = new PaperParser(post.truncated_paper_data);
  const parsedCard = paperParser.parseCard();
  const { isPaperValid } = paperParser.validateParsedCard(parsedCard);

  if (!isPaperValid) {
    return null;
  }

  return (
    <>
      <PaperCard {...post} parsedCard={parsedCard} />
      {<hr className="border-border" />}
    </>
  );
}

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
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 mx-auto max-w-2xl">
        <Heading variant={'h1'} className="justify-self-start mb-8">
          Latest
        </Heading>
        {posts?.map((post) => (
          <RenderPaperItem post={post} key={post.id} />
        ))}
      </div>
    </PageRoot>
  );
}
