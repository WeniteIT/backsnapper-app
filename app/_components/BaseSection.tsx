import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren<{}> {
  label: string;
}

export default function BaseSection({ children, label }: IProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-gray-200 text-gray-700 rounded-lg p-4 border-3 border-gray-300">
      <div className="flex text-4xl font-bold">{label}</div>
      <div className="flex gap-3 flex-col text-gray-700">{children}</div>
    </div>
  );
}
