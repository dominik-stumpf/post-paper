import { useEditorStore } from './editor-store';

export function ArticleStats() {
  const editorContent = useEditorStore((state) => state.editorContent);
  // const wordCount = editorContent.match(/\w+/g)?.length ?? 0;

  return (
    <code className="absolute right-4 top-4 flex select-none flex-col items-end text-xs font-bold">
      <div>{editorContent.length}</div>
    </code>
  );
}
