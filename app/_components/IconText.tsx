interface IconTextProps {
  icon: React.ReactNode;
  text: string | React.ReactNode;
}

export default function IconText({ icon, text }: IconTextProps) {
  return (
    <div className="flex gap-2 md:gap-3 items-center">
      {icon}
      <div>{text}</div>
    </div>
  );
}
