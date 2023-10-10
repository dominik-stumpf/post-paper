export function Avatar({ src }: { src: string }) {
  return (
    <img
      // src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${seed}`}
      src={src}
      alt="avatar"
      width={32}
      height={32}
      className="rounded-full"
    />
  );
}
