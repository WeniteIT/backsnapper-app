import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  label: string | React.ReactNode;
  info?: string | React.ReactNode;
}

export default function BaseSection({ children, label, info }: IProps) {
  return (
    <div className="flex flex-col gap-4 secondary-light rounded-lg p-4 border-3 secondary-border">
      <div className="flex justify-between items-center">
        <div className="flex text-xl md:text-4xl font-bold">{label}</div>
        <div className="flex text-xl md:text-3xl secondary-text-light">
          {info}
        </div>
      </div>
      <div className="flex gap-3 flex-col">{children}</div>
    </div>
  );
}
