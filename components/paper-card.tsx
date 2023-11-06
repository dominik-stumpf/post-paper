import Link from 'next/link';
import { PaperCardType } from '@/utils/paper-parser';
import { AvatarImage, Avatar } from '@/components/ui/avatar';

interface PaperCardProps extends GetPostList {
  parsedCard: PaperCardType;
}

export async function PaperCard({
  created_at,
  avatar_url,
  name,
  id,
  parsedCard,
}: PaperCardProps) {
  const date = new Date(created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const { title, content } = parsedCard;

  return (
    <article
      key={id}
      className="flex flex-col justify-between items-start max-w-xl"
    >
      <div className="flex gap-x-4 items-center text-xs">
        <time dateTime={created_at} className="text-dim-foreground">
          {date}
        </time>
        <Link
          href={'/'}
          className="relative z-10 rounded-full bg-surface-color px-3 py-1.5 font-medium text-foreground hover:bg-background"
        >
          {'category'}
        </Link>
      </div>
      <div className="relative group">
        <h2 className="mt-3 text-2xl font-semibold tracking-tight leading-6 text-foreground group-hover:text-dim-foreground line-clamp-2">
          <Link href={`/paper/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h2>
        <p className="mt-5 text-base leading-6 line-clamp-2 text-dim-foreground">
          {content}
        </p>
      </div>
      <div className="flex relative gap-x-4 items-center mt-8">
        <Avatar>
          <AvatarImage src={avatar_url} />
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
