'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEvent, useEffect, useState } from 'react';
import { Editor } from './editor';

import initialMarkdown from './react-hooks-post.md';
import { PageRoot } from '@/components/page-root';
import Markdown from 'react-markdown';
import { proseClassName } from '@/components/prose';
import { PluggableList } from 'unified';

import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import '@/app/gruvbox-dark-hard.min.css';

export default function Page() {
  const supabase = createClientComponentClient<Database>();
  const [editorContent, setEditorContent] = useState(initialMarkdown);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (editorContent === '') {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
      return;
    }

    // const paperParser = new PaperParser(editorStateRef.current);
    // const parsedPaper = paperParser.parse();

    console.log(`inserting ${editorContent}`);
    await supabase.from('posts').insert({
      paper_data: editorContent,
      user_id: session.user.id,
    });
  }

  return (
    <form
      className="w-full max-w-screen-xl h-remaining border border-emerald-500 mx-auto overflow-hidden grid grid-cols-2 gap-16"
      onSubmit={handleSubmit}
    >
      <Editor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      <div className="h-remaining flex flex-col relative">
        <Preview markdownString={editorContent} />
        <button type="submit" className="">
          Post Paper
        </button>
      </div>
    </form>
  );
}

function Preview({ markdownString }: { markdownString: string }) {
  const rehypePlugins: PluggableList = [rehypeSlug, rehypeHighlight];
  const remarkPlugins: PluggableList = [remarkGfm, remarkToc];

  return (
    <Markdown
      className={`${proseClassName} border-fuchsia-500 border prose-pre:p-0 overflow-hidden`}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
    >
      {markdownString}
    </Markdown>
  );
}
