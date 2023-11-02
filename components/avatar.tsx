interface AvatarProps {
  imageSrc?: string;
  size?: 'lg' | 'base' | 'sm';
}

export function Avatar({ imageSrc, size }: AvatarProps) {
  let sizeNumber: number;

  switch (size) {
    case 'lg':
      sizeNumber = 10;
      break;

    case 'base':
      sizeNumber = 8;
      break;

    case 'sm':
      sizeNumber = 6;
      break;

    default:
      sizeNumber = 8;
      break;
  }

  const sizeValue = `w-${sizeNumber} h-${sizeNumber}`;

  return (
    <img
      src={
        imageSrc ??
        `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${Math.round(
          Math.random() * 10000,
        )}`
      }
      alt="avatar"
      className={`rounded-full aspect-square max-w-10 max-h-10 ${sizeValue}`}
    />
  );
}
