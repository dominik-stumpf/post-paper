import { produce } from 'immer';
import { create } from 'zustand';

export enum EditorLayout {
  Horizontal = 'overlay',
  Vertical = 'side by side',
  Zen = 'fullscreen',
}

interface Toggle {
  isActive: boolean;
  setState: (to: boolean) => void;
}

export interface EditorState {
  initialEditorContent: string | undefined;
  setInitialEditorContent: (to?: string) => void;
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
  editorLayout: EditorLayout;
  setEditorLayout: (to: EditorLayout) => void;
  isEditorScrollbarActive: boolean;
  setIsEditorScrollbarActive: (to: boolean) => void;
  articleStats: {
    wordCount: Toggle;
    charCount: Toggle;
    readTime: Toggle;
  };
  isMouseModeActive: boolean;
  setIsMouseModeActive: (to: boolean) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  initialEditorContent: undefined,
  setInitialEditorContent: (to?: string) =>
    set(() => ({ initialEditorContent: to })),
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
  editorLayout: EditorLayout.Horizontal,
  setEditorLayout: (to: EditorLayout) => set(() => ({ editorLayout: to })),
  isEditorScrollbarActive: true,
  setIsEditorScrollbarActive: (to: boolean) =>
    set(() => ({ isEditorScrollbarActive: to })),
  articleStats: {
    wordCount: {
      isActive: false,
      setState: (to) => {
        set(
          produce((state: EditorState) => {
            state.articleStats.wordCount.isActive = to;
          }),
        );
      },
    },
    charCount: {
      isActive: true,
      setState: (to) => {
        set(
          produce((state: EditorState) => {
            state.articleStats.charCount.isActive = to;
          }),
        );
      },
    },
    readTime: {
      isActive: false,
      setState: (to) => {
        set(
          produce((state: EditorState) => {
            state.articleStats.readTime.isActive = to;
          }),
        );
      },
    },
  },
  isMouseModeActive: true,
  setIsMouseModeActive: (to: boolean) =>
    set(() => {
      if (to === true) {
        return { isMouseModeActive: true };
      }

      return {
        isMouseModeActive: false,
        isEditorScrollbarActive: false,
        isVimModeActive: true,
      };
    }),
}));
