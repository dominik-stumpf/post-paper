import Link from 'next/link';
import { Avatar } from './avatar';
import { Prose } from './prose';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Markdown from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { createHeadlessEditor } from '@lexical/headless';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

// interface PaperCardProps {
//   data: Database['public']['Functions']['get_post_list']['Returns'][0];
// }
interface PaperCardProps {
  paper_data: string;
  created_at: string;
  id: string;
  likes: {
    id: number;
  }[];
  profiles: {
    name: string;
    avatar_url: string;
  } | null;
}
[];

export async function PaperCard({
  created_at,
  profiles,
  id,
  likes,
  paper_data,
}: PaperCardProps) {
  if (profiles === null) return;

  // const tree = fromMarkdown(paper_data);
  // console.log(tree);

  return (
    <Link href={`/paper/${id}`} scroll={false} className="w-1/2 max-w-2xl">
      <section className="flex flex-col w-full gap-4 p-4 border">
        <div className="flex">
          <div className="flex items-center gap-2 grow">
            <Avatar imageSrc={profiles?.avatar_url} />
            <div>{profiles?.name}</div>
            <time dateTime={created_at}>
              {new Date(created_at).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="grow-0">{likes.length}</div>
        </div>
        <div className="prose prose-invert">
          <Markdown allowedElements={['h1', 'p']}>
            {paper_data.slice(0, 256)}
          </Markdown>
        </div>
        {/* <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold overflow-clip max-h-16">{title}</h2>
          <p className="leading-normal line-clamp-2 max-h-16">{content}</p>
        </div> */}
      </section>
    </Link>
  );
}
