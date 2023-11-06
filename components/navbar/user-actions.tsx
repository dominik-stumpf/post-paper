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
import { LogOut, PenSquare, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export function UserActions({ session }: { session: Session | null }) {
  const router = useRouter();

  async function signOutUser() {
    await fetch('/auth/sign-out', { method: 'POST' });
    router.refresh();
    router.push('/login');
  }

  if (session?.user) {
    return (
      <>
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
                <AvatarImage src={session.user.user_metadata.avatar_url} />
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
      </>
    );
  }

  return (
    <nav className="space-x-3">
      <Button variant={'ghost'} asChild size="sm">
        <Link
          href="/login"
          className="flex px-3 py-2 ml-auto no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
        >
          Log in
        </Link>
      </Button>
      <Button variant={'outline'} size="sm" asChild>
        <Link href="/signup">Sign up</Link>
      </Button>
    </nav>
  );
}
