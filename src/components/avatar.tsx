export function Avatar({ seed }: { seed: string }) {
  return (
    <img
      src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${seed}`}
      alt="avatar"
      width={32}
      height={32}
      className="rounded-full"
    />
  );
}
