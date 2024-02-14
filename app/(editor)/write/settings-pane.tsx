'use client';

import { PageMargin } from '@/components/page-margin';
import { ThemeSelection, } from '@/components/theme-toggle';
import * as Drawer from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EditorLayout, useEditorStore } from './editor-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function SettingsPane() {
  const editorLayout = useEditorStore((state) => state.editorLayout);
  const isVimModeActive = useEditorStore((state) => state.isVimModeActive);
  const setIsVimModeActive = useEditorStore(
    (state) => state.setIsVimModeActive,
  );
  const isPreviewEnabled = useEditorStore((state) => state.isPreviewEnabled);
  const setIsPreviewEnabled = useEditorStore(
    (state) => state.setIsPreviewEnabled,
  );

  return (
    <Drawer.DrawerContent className="min-h-[80vh]">
      <PageMargin className="prose-sm w-full pt-6">
        <h1 className="font-bold">Settings</h1>
        <p className="lead text-dim-foreground">
          Configure your editor and markdown preview experience.
        </p>
        <hr />
        <h2>Color theme</h2>
        <div className="max-w-sm">
          <ThemeSelection />
        </div>
        <h2>Editor view layout</h2>
        <Select defaultValue={editorLayout}>
          <SelectTrigger className="max-w-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EditorLayout.Vertical}>
              Vertical (side by side)
            </SelectItem>
            <SelectItem value={EditorLayout.Horizontal}>
              Horizonal (overlay)
            </SelectItem>
          </SelectContent>
        </Select>
        <h2>Keyboard preferences</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vim-mode"
            checked={isVimModeActive}
            onCheckedChange={(value) =>
              typeof value === 'boolean' && setIsVimModeActive(value)
            }
          />
          <Label htmlFor="vim-mode">
            Enable <b>Vim motions</b> (encouraged)
          </Label>
        </div>
        <p>
          To disable mouse support enter <code>:no-mouse-help</code> as a Vim
          command - <em>only for experienced users</em>
        </p>
        <h2>Article preview</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="preview"
            checked={isPreviewEnabled}
            onCheckedChange={(value) =>
              typeof value === 'boolean' && setIsPreviewEnabled(value)
            }
          />
          <Label htmlFor="preview">Enable real-time preview rendering</Label>
        </div>
      </PageMargin>
    </Drawer.DrawerContent>
  );
}
