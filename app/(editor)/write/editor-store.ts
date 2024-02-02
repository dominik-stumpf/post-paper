import { create } from 'zustand';
import reactHooksPost from '@/public/markdown/react-hooks-post.md';

interface EditorState {
  editorContent: string;
  positionOffset: number;
  initialEditorContent: string;
  setEditorContent: (to: string) => void;
  setPositionOffset: (to: number) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  positionOffset: 0,
  editorContent: '',
  initialEditorContent: reactHooksPost,
  setEditorContent: (to: string) => set(() => ({ editorContent: to })),
  setPositionOffset: (to: number) => set(() => ({ positionOffset: to })),
}));
