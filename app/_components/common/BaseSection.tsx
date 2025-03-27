import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  label?: string | React.ReactNode;
  info?: string | React.ReactNode;
}

export default function BaseSection({ children, label, info }: IProps) {
  return (
    <div className="flex flex-col gap-4 secondary-light rounded-lg p-2 md:p-4 md:shadow-lg secondary-border flex-1">
      {(label || info) && <div className="flex justify-between items-center text-normal">
        <div className="flex font-bold">{label}</div>
        <div className="flex secondary-text-light">{info}</div>
      </div>}
      <div className="flex gap-3 flex-col h-full">{children}</div>
    </div>
  );
}
