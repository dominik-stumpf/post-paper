import Link from 'next/link';
import { Avatar } from './avatar';

interface PaperCardProps {
  content: string;
  created_at: string;
  id: string;
  title: string;
  // user_id: string;
  profiles: {
    avatar_url: string;
    // id: string;
    name: string;
    user_name: string;
  } | null;
}

export function PaperCard({
  content,
  title,
  created_at,
  profiles,
  id,
}: PaperCardProps) {
  if (profiles === null) {
    return null;
  }

  return (
    <Link href={`/paper/${id}`} className="w-1/2 max-w-2xl">
      <section className="flex flex-col w-full gap-4 p-4 border">
        <div className="flex items-center gap-2">
          <Avatar
            imageSrc={profiles.avatar_url}
            userName={profiles.user_name}
          />
          <div>{profiles.name}</div>
          <time dateTime={created_at}>
            {new Date(created_at).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold overflow-clip max-h-16">{title}</h2>
          <p className="leading-normal line-clamp-2 max-h-16">{content}</p>
        </div>
      </section>
    </Link>
  );
}
