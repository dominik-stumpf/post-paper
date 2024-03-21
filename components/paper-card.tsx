import { Avatar, AvatarImage } from '@/components/ui/avatar';
import type { PaperCardType } from '@/lib/paper-parser';
import { formatPostDate } from '@/lib/timestamp-formatter';
import Link from 'next/link';

interface PaperCardProps extends GetPostList {
  parsedCard: PaperCardType;
}

export function PaperCard({
  created_at,
  avatar_url,
  name,
  id,
  parsedCard,
}: PaperCardProps) {
  const date = formatPostDate(created_at);
  const { title, content } = parsedCard;

  return (
    <article
      key={id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={created_at} className="text-dim-foreground">
          {date}
        </time>
        <Link
          href={'/'}
          className="bg-surface-color relative z-10 rounded-full px-3 py-1.5 font-medium text-foreground hover:bg-background"
        >
          {'category'}
        </Link>
      </div>
      <div className="group relative">
        <h2 className="mt-3 line-clamp-2 text-2xl font-semibold leading-6 tracking-tight text-foreground group-hover:text-dim-foreground">
          <Link href={`/paper/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h2>
        <p className="mt-5 line-clamp-2 text-base leading-6 text-dim-foreground">
          {content}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <Avatar>
          <AvatarImage src={avatar_url} alt="Author profile picture" />
        </Avatar>
        <div className="text-sm leading-6">
          <p className="font-semibold text-dim-foreground">
            <Link href={'/'}>
              <span className="absolute inset-0" />
              {name}
            </Link>
          </p>
          <p className="text-dim-foreground">{'Role title'}</p>
        </div>
      </div>
    </article>
  );
}
