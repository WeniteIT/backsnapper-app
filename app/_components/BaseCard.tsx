import { PropsWithChildren } from "react";

export default function BaseCard({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 p-4  bg-gray-100 rounded-lg shadow-md flex-1 relative">
      {children}
    </div>
  );
}
