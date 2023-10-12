import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    const { title, content } = Object.fromEntries(formData.entries());

    if (authError || user === null) {
      // console.error(authError);
      redirect('/');
    }

    if (typeof content === 'string' && typeof title === 'string') {
      await supabase.from('posts').insert({ content, title, user_id: user.id });
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
      className="bg-background p-2 outline-none ring-1 ring-foreground"
    />
  );
}
