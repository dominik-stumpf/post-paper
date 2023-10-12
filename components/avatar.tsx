import { Session } from 'next-auth';

export function Avatar({ session }: { session: Session }) {
  const {
    user: { image },
  } = session;

  return (
    <img
      src={
        image ??
        `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${session.user.name}`
      }
      alt="avatar"
      width={32}
      height={32}
      className="rounded-full"
    />
  );
}
