import Link from 'next/link';
import { Avatar } from './avatar';
import { PaperParser } from '@/utils/paper-parser';

interface PaperCardProps {
  data: Database['public']['Functions']['get_post_list']['Returns'][0];
}

export async function PaperCard({
  data: { created_at, avatar_url, name, id, truncated_paper_data },
}: PaperCardProps) {
  const paperParser = new PaperParser(truncated_paper_data);
  const parsedCard = paperParser.parseCard();
  const { isPaperValid } = paperParser.validateParsedCard(parsedCard);

  if (!isPaperValid) {
    return null;
  }

  const date = new Date(created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const { title, content } = parsedCard;

  return (
    <article
      key={id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={created_at} className="text-fg-dim-color">
          {date}
        </time>
        <a
          href={'/'}
          className="relative z-10 rounded-full bg-surface-color px-3 py-1.5 font-medium text-fg-color hover:bg-bg-color"
        >
          {'category'}
        </a>
      </div>
      <div className="group relative">
        <h2 className="mt-3 text-xl font-semibold leading-6 text-fg-color group-hover:text-fg-dim-color line-clamp-2">
          <a href={`/paper/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </a>
        </h2>
        <p className="mt-5 line-clamp-2 text-sm leading-6 text-fg-dim">
          {content}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          src={avatar_url}
          alt=""
          className="h-10 w-10 rounded-full bg-fg-color"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-fg-dim">
            <a href={'/'}>
              <span className="absolute inset-0" />
              {name}
            </a>
          </p>
          <p className="text-fg-dim">{'Role title'}</p>
        </div>
      </div>
    </article>
  );
}
