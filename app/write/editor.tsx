import { EditorState } from 'lexical';
import { MutableRefObject, useEffect } from 'react';

import { proseClassName } from '@/components/prose';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { editorNodes } from './editor-nodes';

import ListMaxIndentLevelPlugin from '@/app/write/plugins/ListMaxIndentLevelPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { editorTheme } from './editor-theme';

import markdown from './placeholder.md';

import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';

function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error: Error) {
  console.error(error);
}

// function OnChangePlugin({
//   onChange,
//   // biome-ignore lint/nursery/noConfusingVoidType: <explanation>
// }: { onChange: (editorState: EditorState) => void }) {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     return editor.registerUpdateListener(({ editorState }) => {
//       onChange(editorState);
//     });
//   }, [editor, onChange]);

//   return null;
// }

const loadContent = () => {
  return () => $convertFromMarkdownString(markdown, TRANSFORMERS);
};

export function Editor({
  editorStateRef,
}: { editorStateRef: MutableRefObject<EditorState | undefined> }) {
  // const [_editorState, setEditorState] = useState<string | undefined>();

  // function onChange(editorState: EditorState) {
  //   if (editorState === undefined) return;
  //   const editorStateJSON = editorState.toJSON();
  //   setEditorState(JSON.stringify(editorStateJSON));
  // }

  const initialEditorState = loadContent();

  const initialConfig = {
    namespace: 'paperEditor',
    nodes: [...editorNodes],
    theme: editorTheme,
    editorState: initialEditorState,
    onError,
  };

  // const editorStateRef = useRef<EditorState | undefined>();

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={`${proseClassName} min-h-[75vh] outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black`}
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <TablePlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <HorizontalRulePlugin />
        <TabIndentationPlugin />
        <ListMaxIndentLevelPlugin maxDepth={2} />
        <AutoFocusPlugin />
        <LexicalClickableLinkPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorStateRef.current = editorState;
          }}
        />
      </LexicalComposer>
    </>
  );
}
