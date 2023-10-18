'use client';

import { useEffect, useRef } from 'react';
import { Editor } from './editor';
import { EditorState } from 'lexical';

interface PostFragment {
  title: string;
  content: string;
}

function getPostFragment(editorState: EditorState) {
  const result: PostFragment = { title: '', content: '' };
  editorState.read(() => {
    const nodes = editorState._nodeMap;

    for (const [_, node] of nodes.entries()) {
      if (node.__tag === 'h1') {
        result.title = node.getTextContent();
      }
      if (node.getType() === 'paragraph') {
        result.content = node.getTextContent();
      }

      if (result.title && result.content) {
        console.log(result);
        return result;
      }
    }
  });
  return result;
}

function validatePostFragment({ title, content }: PostFragment) {
  const isTitleValid = title.length < 256 && title.length > 16;
  const isContentValid = content.length > 128 && content.length < 16384;

  if (!isTitleValid) {
    console.log(
      `title not valid: ${title.length} < 256 && ${title.length} > 16`,
    );
    return false;
  }
  if (!isContentValid) {
    console.log(
      `content not valid: ${content.length} > 128 && ${content.length} > 16384`,
    );
    return false;
  }

  return true;
}

export default function Page() {
  // const supabase = createClientComponentClient<Database>();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (session === null) {
  //   redirect('/');
  // }

  const editorStateRef = useRef<EditorState | undefined>();

  return (
    <form className="w-full flex flex-row justify-center items-start gap-16 py-16">
      <div className="flex flex-col gap-8 w-full items-center">
        <Editor editorStateRef={editorStateRef} />
        <button
          type="button"
          onClick={() => {
            if (editorStateRef.current) {
              const isPostFragmentValid = validatePostFragment(
                getPostFragment(editorStateRef.current),
              );
              if (!isPostFragmentValid) {
                return;
              }
              const post = JSON.stringify(editorStateRef.current);
              console.log(post);
            }
          }}
        >
          Post Paper
        </button>
      </div>
    </form>
  );
}
