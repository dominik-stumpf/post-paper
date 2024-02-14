'use client';

// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from 'next-themes';
//
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
//

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from './ui/select';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <ToggleGroup
      type="single"
      onValueChange={(selected) => {
        setTheme(selected);
      }}
      defaultValue={theme}
      aria-label="Toggle between themes"
    >
      <ToggleGroupItem value="light" aria-label="Toggle light mode">
        <Sun className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle dark mode">
        <Moon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Toggle system default">
        <SunMoon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ThemeSelection() {
  const { setTheme, theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <Select
      onValueChange={(selected) => {
        setTheme(selected);
      }}
      defaultValue={theme}
      aria-label="Toggle between themes"
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light mode</SelectItem>
        <SelectItem value="dark">Dark mode</SelectItem>
        <SelectItem value="system">System default</SelectItem>
      </SelectContent>
    </Select>
  );
}
