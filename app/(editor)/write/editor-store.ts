import { create } from 'zustand';
import reactHooksPost from '@/public/markdown/react-hooks-post.md';

interface EditorState {
  initialEditorContent: string;
  editorContent: string;
  setEditorContent: (to: string) => void;
  positionOffset: number;
  setPositionOffset: (to: number) => void;
  isEditorFocused: boolean;
  setIsEditorFocused: (to: boolean) => void;
  isVimModeActive: boolean;
  setIsVimModeActive: (to: boolean) => void;
  isPreviewEnabled: boolean;
  setIsPreviewEnabled: (to: boolean) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  initialEditorContent: (reactHooksPost as string).repeat(10),
  positionOffset: 0,
  setPositionOffset: (to: number) => set(() => ({ positionOffset: to })),
  editorContent: '',
  setEditorContent: (to: string) => set(() => ({ editorContent: to })),
  isEditorFocused: true,
  setIsEditorFocused: (to: boolean) => set(() => ({ isEditorFocused: to })),
  isVimModeActive: true,
  setIsVimModeActive: (to: boolean) => set(() => ({ isVimModeActive: to })),
  isPreviewEnabled: true,
  setIsPreviewEnabled: (to: boolean) => set(() => ({ isPreviewEnabled: to })),
}));
