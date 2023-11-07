'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut, PenSquare, User, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function UserActions({ session }: { session: Session | null }) {
  const router = useRouter();

  async function signOutUser() {
    await fetch('/api/auth/sign-out', { method: 'POST' });
    router.refresh();
    router.push('/login');
  }

  if (session?.user) {
    return (
      <>
        <div className="hidden gap-4 items-center md:flex">
          <Button asChild variant={'default'} size="sm">
            <Link href="/write" className="flex gap-2">
              <PenSquare className="w-4 h-4" />
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
                <User className="w-4 h-4" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between"
                onClick={signOutUser}
              >
                Log out
                <LogOut className="w-4 h-4" />
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
                <PenSquare className="w-4 h-4" />
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
              <User className="w-4 h-4" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className="flex justify-between"
              onClick={signOutUser}
              variant={'outline'}
            >
              Log out
              <LogOut className="w-4 h-4" />
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
            className="flex py-2 px-3 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
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
              className="flex py-2 px-3 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
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
      <SheetTrigger asChild>
        <div>
          <Button className="md:hidden" variant={'ghost'} size={'icon'}>
            <Menu />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        {children}
      </SheetContent>
    </Sheet>
  );
}
