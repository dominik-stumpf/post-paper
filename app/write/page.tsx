'use client';

import { Editor } from './editor';

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
    </form>
  );
}
