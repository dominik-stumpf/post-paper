'use client';

import { EditorState, LexicalNode } from 'lexical';
import { useRef, FormEvent } from 'react';
import { Editor } from './editor';
import { submitPost } from './submit-post-action';
import { PaperParser } from './paper-parser';

export default function Page() {
  // const supabase = createClientComponentClient<Database>();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (session === null) {
  //   redirect('/');
  // }

  const editorStateRef = useRef<EditorState | undefined>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (editorStateRef.current === undefined) {
      return;
    }
    const paperParser = new PaperParser(editorStateRef.current);
    paperParser.parse();
    // const isPostFragmentValid = validatePaperFragment(
    //   getPaperFragment(editorStateRef.current),
    // );
    // if (!isPostFragmentValid) {
    //   return;
    // }
    // const post = JSON.stringify(editorStateRef.current);
    // console.log(post);
  }

  return (
    <form
      className="w-full flex flex-row justify-center items-start gap-16 py-16"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8 w-full items-center">
        <Editor editorStateRef={editorStateRef} />
        <button type="submit">Post Paper</button>
      </div>
    </form>
  );
}
