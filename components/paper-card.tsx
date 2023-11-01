import Link from 'next/link';
import { Avatar } from './avatar';
import { PaperParser } from '@/utils/paper-parser';

interface PaperCardProps {
  data: Database['public']['Functions']['get_post_list']['Returns'][0];
}

export async function PaperCard({
  data: { created_at, avatar_url, name, id, likes_count, truncated_paper_data },
}: PaperCardProps) {
  const paperParser = new PaperParser(truncated_paper_data);
  const parsedCard = paperParser.parseCard();
  const { isPaperValid } = paperParser.validateParsedCard(parsedCard);

  if (!isPaperValid) {
    return null;
  }

  return (
    <Link href={`/paper/${id}`} className="w-1/2 max-w-2xl">
      <section className="flex flex-col w-full gap-4 p-4 border border-separator rounded-radius">
        <div className="flex">
          <div className="flex items-center gap-2 grow">
            <Avatar imageSrc={avatar_url} />
            <div>{name}</div>
            <time dateTime={created_at}>
              {new Date(created_at).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold line-clamp-2 max-h-16">
            {parsedCard.title}
          </h2>
          <p className="leading-normal line-clamp-2 max-h-16">
            {parsedCard.content}
          </p>
        </div>
      </section>
    </Link>
  );
}
