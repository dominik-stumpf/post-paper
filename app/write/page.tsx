import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ContentInput } from './mdr/content-input';

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
      <form
        action={submitPost}
        className="flex gap-4 py-16 flex-col w-1/3 max-w-3xl"
      >
        {/* <label htmlFor="title">title</label>
        <InputField name="title" id="title" /> */}
        {/* <label id="content">content</label> */}
        <ContentInput />
        <button type="submit">post</button>
      </form>
    </>
  );
}

// function InputField({ name, id }: { name: string; id: string }) {
//   return (
//     <input
//       name={name}
//       id={id}
//       className="p-2 bg-black outline-none ring-1 ring-white w-full"
//     />
//   );
// }
