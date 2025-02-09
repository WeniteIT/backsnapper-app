import React from "react";

interface IProps {
  label: string;
  content: React.ReactNode;
}

export default function StatisticCard({ label, content }: IProps) {
  return (
    <div className="flex flex-col gap-4 secondary-lighter rounded-lg shadow-md flex-1 relative overflow-hidden">
      <div className="flex">
        <div className="text-lg md:text-3xl grow p-2 md:p-3 px-4 md:px-5 whitespace-nowrap flex-1">
          {label}
        </div>
        <div className="flex text-lg md:text-4xl secondary font-semibold flex-1 px-4 md:px-5 items-center relative justify-between">
          <div className="flex secondary px-4 skew-x-16 absolute -left-4 top-0 bottom-0" />
          {content}
        </div>
      </div>
    </div>
  );
}
