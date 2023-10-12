import { Session } from 'next-auth';
import Link from 'next/link';
import { getSession } from '../auth';
import { Avatar } from './avatar';
import { SignOut } from './sign-out';

function UnauthorizedActions() {
  return (
    <>
      <Link className="btn" href="/signin">
        sign in
      </Link>
      <Link className="btn btn-primary" href="/signup">
        sign up
      </Link>
    </>
  );
}

function AuthorizedActions({ session }: { session: Session }) {
  if (!session.user.name) return null;
  return (
    <>
      <div className="flex items-center gap-2">
        signed in as {session.user.name}
        <Avatar session={session} />
      </div>
      <SignOut />
    </>
  );
}

export async function SignButtons() {
  const session = await getSession();

  return session === null ? (
    <UnauthorizedActions />
  ) : (
    <AuthorizedActions session={session} />
  );
}
