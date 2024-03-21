'use client';

import { Button } from '@/components/ui/button';
import * as Drawer from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
  Save,
  Settings,
  SplitSquareHorizontal,
  SplitSquareVertical,
} from 'lucide-react';
import {
  EditorLayout as EditorLayoutType,
  useEditorStore,
} from './editor-store';
import { useArticlePublisher } from './use-article-publisher';

const editorLayoutData = [
  { Icon: SplitSquareHorizontal, value: EditorLayoutType.Horizontal },
  { Icon: SplitSquareVertical, value: EditorLayoutType.Vertical },
] as const;

function EditorLayout() {
  const editorLayout = useEditorStore((state) => state.editorLayout);
  const ActiveIcon = editorLayoutData.find(
    ({ value }) => value === editorLayout,
  )?.Icon;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" aria-label="change layout">
              {ActiveIcon ? <ActiveIcon /> : <SplitSquareHorizontal />}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent align="end">Change Layout</TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          aria-label="Text alignment"
          onValueChange={(value) => console.log(value)}
          value={editorLayout}
        >
          {editorLayoutData.map(({ Icon, value }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className="space-x-2 capitalize"
            >
              <Icon />
              <span>{value}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EditorActions() {
  const { handlePublish, isLoading } = useArticlePublisher();

  return (
    <aside className="absolute bottom-4 right-4 flex max-w-full items-end gap-4 overflow-auto sm:overflow-visible md:flex-col">
      {/*
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" aria-label="help" asChild>
            <Link href="/write/help" target="_blank">
              <HelpCircle />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Help</p>
        </TooltipContent>
      </Tooltip>
      */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Drawer.DrawerTrigger asChild>
            <Button size="icon" variant="outline" aria-label="open settings">
              <Settings />
            </Button>
          </Drawer.DrawerTrigger>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Open settings</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            aria-label="post"
            onClick={() => handlePublish()}
            loading={isLoading}
          >
            {isLoading ? null : <Save />}
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Save article</p>
        </TooltipContent>
      </Tooltip>
    </aside>
  );
}
