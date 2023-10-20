import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  EditorState,
} from 'lexical';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { $generateHtmlFromNodes } from '@lexical/html';

import { Prose, proseClassName } from '@/components/prose';
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
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { editorTheme } from './editor-theme';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { JetBrains_Mono } from 'next/font/google';
import Markdown from 'react-markdown';

import markdown from './placeholder.md';

import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import { fromMarkdown } from 'mdast-util-from-markdown';

const jetbrainsMono = JetBrains_Mono({
  variable: '--mono',
  subsets: ['latin'],
});

// function AutoFocusPlugin() {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     editor.focus();
//   }, [editor]);

//   return null;
// }

function onError(error: Error) {
  console.error(error);
}

// function OnChangePlugin({
//   onChange,
//   // biome-ignore lint/nursery/noConfusingVoidType: <explanation>
// }: { onChange: (editorState: EditorState) => void }) {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     editor.update(() => {
//       // Get the RootNode from the EditorState
//       const root = $getRoot();

//       // Get the selection from the EditorState
//       const selection = $getSelection();

//       // Create a new ParagraphNode
//       const paragraphNode = $createParagraphNode();

//       // Create a new TextNode
//       const textNode = $createTextNode('Hello world');

//       // Append the text node to the paragraph
//       paragraphNode.append(textNode);

//       // Finally, append the paragraph to the root
//       root.append(paragraphNode);
//     });

//     return editor.registerUpdateListener(({ editorState }) => {
//       onChange(editorState);
//     });
//   }, [editor, onChange]);

//   return null;
// }

function OnChangePlugin({
  state,
  setState,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // editor.update(() => {
    //   // const root = $getRoot();
    //   // const paragraphNode = $createParagraphNode();
    //   // const textNode = $createTextNode('text node');

    //   // paragraphNode.append(textNode);
    //   // root.append(paragraphNode);
    //   console.log('update');
    //   setState($convertToMarkdownString());
    // });
    console.log('setting up updater');

    return editor.registerUpdateListener(({ editorState }) => {
      console.log('update');
      editorState.read(() => {
        setState($convertToMarkdownString());
        // const html = $generateHtmlFromNodes(editor);
        // console.log(html);
      });
      // editor.update(() => {
      //   console.log('update');
      // });
      // onChange(state);
      // setState(editorState);
      // console.log('update');
      // editor.update()
    });
  }, [editor, setState]);

  return null;
}

const loadContent = () => {
  return () => $convertFromMarkdownString(markdown, TRANSFORMERS);
};

export function Editor({
  editorStateRef,
}: { editorStateRef: MutableRefObject<EditorState | undefined> }) {
  const [editorState, setEditorState] = useState<string>(markdown);

  // function onChange(editorState: EditorState) {
  //   if (editorState === undefined) return;
  //   const editorStateJSON = editorState.toJSON();
  //   setEditorState(JSON.stringify(editorStateJSON));
  // }
  // useEffect(() => {

  //   const tree = fromMarkdown(editorState);
  //   console.log(tree);
  // }, [editorState]);

  const initialEditorState = loadContent();

  const initialConfig = {
    namespace: 'paperEditor',
    nodes: [...editorNodes],
    theme: editorTheme,
    editorState: initialEditorState,
    onError,
  };

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={`${proseClassName} min-h-[75vh] outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black ${jetbrainsMono.variable} prose-code:font-[var(--mono)]`}
              spellCheck="false"
            />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <TablePlugin />
        <MarkdownShortcutPlugin />
        <HorizontalRulePlugin />
        <TabIndentationPlugin />
        <ListMaxIndentLevelPlugin maxDepth={1} />
        {/* <AutoFocusPlugin /> */}
        {/* <LexicalClickableLinkPlugin /> */}
        {/* <OnChangePlugin
        onChange={(editorState) => {
          editorStateRef.current = editorState;
        }}
      /> */}
        <OnChangePlugin state={editorState} setState={setEditorState} />
      </LexicalComposer>
      <Markdown
        className={`${proseClassName} min-h-[75vh] outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black ${jetbrainsMono.variable} prose-code:font-[var(--mono)]`}
      >
        {editorState}
      </Markdown>
    </>
  );
}
