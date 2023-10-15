interface AvatarProps {
  imageSrc?: string;
}

export function Avatar({ imageSrc }: AvatarProps) {
  return (
    <img
      src={
        imageSrc ??
        `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${Math.round(
          Math.random() * 10000,
        )}`
      }
      alt="avatar"
      className="w-6 rounded-full aspect-square"
    />
  );
}
