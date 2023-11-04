'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useLenis } from '@studio-freight/react-lenis';
import { ReactNode, useEffect, useState } from 'react';
import { LogoutButton } from './logout-button';

export function UserActions({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-background p-4 z-40 border-border border"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group leading-none flex items-center relative select-none outline-none">
            <LogoutButton />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
