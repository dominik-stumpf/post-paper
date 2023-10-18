import { $getRoot, $getSelection, EditorState } from 'lexical';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { editorNodes } from './editor-nodes';
import { Prose } from '@/components/prose';

const theme = {
  // Theme styling goes here
};

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

// When the editor changes, you can get notified via the
// OnChangePlugin!
function OnChangePlugin({
  onChange,
  // biome-ignore lint/nursery/noConfusingVoidType: <explanation>
}: { onChange: (editorState: EditorState) => void }) {
  // Access the editor through the LexicalComposerContext
  const [editor] = useLexicalComposerContext();
  // Wrap our listener in useEffect to handle the teardown and avoid stale references.
  useEffect(() => {
    // most listeners return a teardown function that can be called to clean them up.
    return editor.registerUpdateListener(({ editorState }) => {
      // call onChange here to pass the latest state up to the parent.
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
}

const initialConfig = {
  namespace: 'paperEditor',
  nodes: [...editorNodes],
  theme,
  onError,
};

export function Editor() {
  const [editorState, setEditorState] = useState<string | undefined>();

  function onChange(editorState: EditorState) {
    if (editorState === undefined) return;
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <Prose>
            <ContentEditable className="min-h-[16rem] outline-none focus:ring-1 ring-white ring-offset-[1rem] ring-offset-black" />
          </Prose>
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
      <MyCustomAutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
