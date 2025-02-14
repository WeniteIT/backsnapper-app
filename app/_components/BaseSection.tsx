import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  label: string | React.ReactNode;
  info?: string | React.ReactNode;
}

export default function BaseSection({ children, label, info }: IProps) {
  return (
    <div className="flex flex-col gap-4 secondary-light rounded-lg p-2 md:p-4 md:shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex text-normal font-bold">{label}</div>
        <div className="flex text-normal secondary-text-light">{info}</div>
      </div>
      <div className="flex gap-3 flex-col">{children}</div>
    </div>
  );
}
