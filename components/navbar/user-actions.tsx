'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { Session } from '@supabase/auth-helpers-nextjs';
import { LogOut, Menu, PenSquare, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export function UserActions({ session }: { session: Session | null }) {
  const router = useRouter();

  async function signOutUser() {
    await fetch('/api/auth/sign-out', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  if (session?.user) {
    return (
      <>
        <div className="hidden items-center gap-4 md:flex">
          <Button asChild variant={'default'} size="sm">
            <Link href="/write" className="flex gap-2">
              <PenSquare className="h-4 w-4" />
              Write
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src={session.user.user_metadata.avatar_url}
                    alt="User profile picture"
                  />
                  <AvatarFallback />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div>{session.user.user_metadata.name}</div>
                <div className="font-normal text-muted-foreground">
                  {session.user.email}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-between" disabled>
                Profile
                <User className="h-4 w-4" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between"
                onClick={signOutUser}
              >
                Log out
                <LogOut className="h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ActionMenu>
          <SheetHeader>
            <SheetTitle>{session.user.user_metadata.name}</SheetTitle>
            <SheetDescription className="font-normal text-muted-foreground">
              {session.user.email}
            </SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button asChild variant={'default'} size="sm">
              <Link href="/write" className="flex gap-2">
                <PenSquare className="h-4 w-4" />
                Write
              </Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className="flex justify-between"
              disabled
              variant={'outline'}
            >
              Profile
              <User className="h-4 w-4" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className="flex justify-between"
              onClick={signOutUser}
              variant={'outline'}
            >
              Log out
              <LogOut className="h-4 w-4" />
            </Button>
          </SheetClose>
        </ActionMenu>
      </>
    );
  }

  return (
    <>
      <nav className="hidden space-x-3 md:block">
        <Button variant={'ghost'} asChild size="sm">
          <Link
            href="/login"
            className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
          >
            Log in
          </Link>
        </Button>
        <Button variant={'outline'} size="sm" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </nav>
      <ActionMenu>
        <span className="h-2" />
        <SheetClose asChild>
          <Button variant={'ghost'} asChild size="sm">
            <Link
              href="/login"
              className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
            >
              Log in
            </Link>
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button variant={'outline'} size="sm" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </SheetClose>
      </ActionMenu>
    </>
  );
}

function ActionMenu({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ size: 'icon', variant: 'ghost' }),
          'md:hidden',
        )}
        title="open user actions sheet"
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        {children}
      </SheetContent>
    </Sheet>
  );
}
