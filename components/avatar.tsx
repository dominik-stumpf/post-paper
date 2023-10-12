interface AvatarProps {
  imageSrc?: string;
  userName?: string;
}

export function Avatar({ imageSrc, userName }: AvatarProps) {
  return (
    <img
      src={
        imageSrc ??
        `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${userName}`
      }
      alt="avatar"
      className="w-6 rounded-full aspect-square"
    />
  );
}
