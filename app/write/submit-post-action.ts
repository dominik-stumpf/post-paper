'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function submitPost(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();
  const { paperEditorState } = Object.fromEntries(formData.entries());

  if (authError || session?.user === undefined) {
    redirect('/');
  }

  const { user } = session;

  console.log('inserting', paperEditorState);

  // if (typeof content === 'string' && typeof title === 'string') {
  //   await supabase.from('posts').insert({ content, title, user_id: user.id });
  //   revalidatePath('/');
  // }
}
