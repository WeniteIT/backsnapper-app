import React from "react";

interface IProps {
  label: string;
  content: React.ReactNode;
}

export default function StatisticCard({ label, content }: IProps) {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 rounded-lg shadow-md flex-1 relative overflow-hidden">
      <div className="flex">
        <div className="text-3xl grow p-3 px-5 whitespace-nowrap flex-1">
          {label}
        </div>
        <div className="flex text-4xl bg-gray-800 text-gray-200 font-semibold flex-1 px-5 items-center relative justify-between">
          <div className="flex bg-gray-800 px-4 skew-x-16 absolute -left-4 top-0 bottom-0" />
          {content}
        </div>
      </div>
    </div>
  );
}
