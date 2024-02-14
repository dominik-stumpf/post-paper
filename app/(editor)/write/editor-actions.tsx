'use client';

import { Button } from '@/components/ui/button';
import {
  Forward,
  HelpCircle,
  Settings,
  SplitSquareHorizontal,
  SplitSquareVertical,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  useEditorStore,
  EditorLayout as EditorLayoutType,
} from './editor-store';
import * as Drawer from '@/components/ui/drawer';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

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
  return (
    <aside className="absolute bottom-4 right-4 flex max-w-full items-end gap-4 overflow-auto sm:overflow-visible md:flex-col">
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
          <Button size="icon" aria-label="post">
            <Forward />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Post article</p>
        </TooltipContent>
      </Tooltip>
    </aside>
  );
}
