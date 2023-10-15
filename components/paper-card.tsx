import Link from 'next/link';
import { Avatar } from './avatar';

interface PaperCardProps {
  data: Database['public']['Functions']['get_post_list']['Returns'][0];
}

export function PaperCard({
  data: { content, title, created_at, name, avatar_url, id, likes_count },
}: PaperCardProps) {
  return (
    <Link href={`/paper/${id}`} className="w-1/2 max-w-2xl">
      <section className="flex flex-col w-full gap-4 p-4 border">
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
          <div className="grow-0">{likes_count}</div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold overflow-clip max-h-16">{title}</h2>
          <p className="leading-normal line-clamp-2 max-h-16">{content}</p>
        </div>
      </section>
    </Link>
  );
}
