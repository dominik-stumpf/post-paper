'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { Editor } from './editor';
import { Prose } from '@/components/prose';

export default async function Page() {
  const supabase = createClientComponentClient<Database>();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect('/');
  }

  return (
    <form>
      <Prose>
        <Editor />
      </Prose>
    </form>
  );
}
