'use client';

import { Prose } from '@/components/prose';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { Editor } from './editor';
import { ReferenceArticle } from './reference-article';

export default function Page() {
  // const supabase = createClientComponentClient<Database>();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (session === null) {
  //   redirect('/');
  // }

  return (
    <form className="w-full flex flex-row justify-center items-start gap-16 py-16">
      <Editor />
      {/* <ReferenceArticle /> */}
    </form>
  );
}
