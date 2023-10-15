import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect('/');
  }

  async function submitPost(formData: FormData) {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();
    const { title, content } = Object.fromEntries(formData.entries());

    if (authError || session?.user === undefined) {
      // console.error(authError);
      redirect('/');
    }

    const { user } = session;

    if (typeof content === 'string' && typeof title === 'string') {
      await supabase.from('posts').insert({ content, title, user_id: user.id });
      revalidatePath('/');
    }
  }

  return (
    <>
      <Link href="/">home</Link>
      <form action={submitPost}>
        <label>
          title
          <InputField name="title" />
        </label>
        <label>
          content
          <InputField name="content" />
        </label>
        <button type="submit">post</button>
      </form>
    </>
  );
}

function InputField({ name }: { name: string }) {
  return (
    <input
      name={name}
      className="p-2 bg-black outline-none ring-1 ring-white"
    />
  );
}
