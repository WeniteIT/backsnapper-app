interface IconTextProps {
  icon: React.ReactNode;
  text: string | React.ReactNode;
}

export default function IconText({ icon, text }: IconTextProps) {
  return (
    <div className="flex gap-2 items-center">
      {icon}
      <div>{text}</div>
    </div>
  );
}
