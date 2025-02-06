import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  label: string | React.ReactNode;
  info?: string | React.ReactNode;
}

export default function BaseSection({ children, label, info }: IProps) {
  return (
    <div className="flex flex-col gap-4 bg-gray-200 text-gray-700 rounded-lg p-4 border-3 border-gray-300">
      <div className="row justify-between items-center">
        <div className="flex text-4xl font-bold">{label}</div>
        <div className="flex text-3xl text-gray-600">{info}</div>
      </div>
      <div className="flex gap-3 flex-col text-gray-700">{children}</div>
    </div>
  );
}
