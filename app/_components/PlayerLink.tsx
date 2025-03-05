import Link from "next/link";

interface IProps {
  name: string;
  className?: string;
  shorten?: boolean;
}

export function PlayerLink({ name, className, shorten }: IProps) {
  return (
    <Link
      title={name}
      href={`/player/${name}`}
      passHref
      className={`hover:underline ${className}`}
    >
      {shorten ? name.substring(0, 3) : name}
    </Link>
  );
}
