import '@/styles/classic-dark.css';
import '@/styles/classic-light.css';
import { type ReactNode, forwardRef } from 'react';
import type { articleSchema } from '@/lib/validators/article';
import type { z } from 'zod';

type Metadata = Partial<z.infer<typeof articleSchema>>;

interface ProseArticleProps {
  metadata?: Metadata;
  children: ReactNode;
}

function ArticleHeader({ metadata }: { metadata?: Metadata }) {
  if (metadata === undefined) {
    return;
  }

  return (
    <>
      {metadata.title && <h1>{metadata.title}</h1>}
      {metadata.lead && <p className="lead">{metadata.lead}</p>}
      {metadata.splashImage && (
        <img src={metadata.splashImage} alt="article splash" />
      )}
    </>
  );
}

export const ProseArticle = forwardRef<HTMLElement, ProseArticleProps>(
  ({ children, metadata }, ref) => {
    return (
      <article
        className="prose w-full max-w-prose break-words dark:prose-invert lg:prose-lg prose-pre:p-0 prose-table:block prose-table:overflow-auto"
        ref={ref}
      >
        <ArticleHeader metadata={metadata} />
        {children}
      </article>
    );
  },
);
