'use client';

import { PageMargin } from '@/components/page-margin';
import { ThemeSelect } from '@/components/theme-toggle';
import { Checkbox } from '@/components/ui/checkbox';
import * as Drawer from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  EditorLayout as EditorLayoutType,
  useEditorStore,
} from './editor-store';

function EditorLayout() {
  const editorLayout = useEditorStore((state) => state.editorLayout);
  return (
    <>
      <h2>Editor view layout</h2>
      <Select defaultValue={editorLayout}>
        <SelectTrigger className="max-w-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EditorLayoutType.Vertical}>
            Vertical (side by side)
          </SelectItem>
          <SelectItem value={EditorLayoutType.Horizontal}>
            Horizonal (overlay)
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export function SettingsPane() {
  const isVimModeActive = useEditorStore((state) => state.isVimModeActive);
  const setIsVimModeActive = useEditorStore(
    (state) => state.setIsVimModeActive,
  );
  const isPreviewEnabled = useEditorStore((state) => state.isPreviewEnabled);
  const setIsPreviewEnabled = useEditorStore(
    (state) => state.setIsPreviewEnabled,
  );
  const isEditorScrollbarActive = useEditorStore(
    (state) => state.isEditorScrollbarActive,
  );
  const setIsEditorScrollbarActive = useEditorStore(
    (state) => state.setIsEditorScrollbarActive,
  );

  return (
    <Drawer.DrawerContent className="min-h-[80vh]">
      <PageMargin className="prose-sm w-full py-6">
        <h1 className="font-bold">Settings</h1>
        <p className="lead text-dim-foreground">
          Configure your editor and markdown preview experience.
        </p>
        <hr />
        <h2>Color theme</h2>
        <div className="max-w-sm">
          <ThemeSelect />
        </div>
        <h2>Editor</h2>
        <Label className="flex items-center space-x-2">
          <Checkbox
            checked={isEditorScrollbarActive}
            onCheckedChange={(value) =>
              typeof value === 'boolean' && setIsEditorScrollbarActive(value)
            }
          />
          <p>Show editor scrollbar</p>
        </Label>
        <Label className="flex items-center space-x-2">
          <Checkbox
            checked={isVimModeActive}
            onCheckedChange={(value) =>
              typeof value === 'boolean' && setIsVimModeActive(value)
            }
          />
          <p>
            Enable <b>Vim motions</b> (encouraged)
          </p>
        </Label>
        <p className="max-w-prose">
          To disable mouse support enter <code>:nomousehelp</code> as a Vim
          command - <em>only for experienced users</em>
        </p>
        <h2>Article preview</h2>
        <p className="max-w-prose">
          This editor provides real-time accurate preview of your article. Code
          syntax highlight is excluded.
        </p>
        <Label className="flex items-center space-x-2">
          <Checkbox
            id="preview"
            checked={isPreviewEnabled}
            onCheckedChange={(value) =>
              typeof value === 'boolean' && setIsPreviewEnabled(value)
            }
          />
          <p>Enable real-time preview rendering</p>
        </Label>
      </PageMargin>
    </Drawer.DrawerContent>
  );
}
