"use client";

import { RedirectType, redirect } from "next/navigation";
import React from "react";

interface IProps {
  label: string | React.ReactNode;
  route: string;
  width?: string;
  hover?: string;
}

export default function RouteButton({
  label,
  route,
  width = "auto",
  hover,
}: IProps) {
  return (
    <button
      title={hover}
      className={`flex gap-3 justify-center bg-gray-800 p-3 text-gray-200 rounded-md text-xl hover:bg-yellow-500 hover:text-gray-800 w-${width} items-center
       transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 cursor-pointer`}
      onClick={() => redirect(route, RedirectType.push)}
    >
      {label}
    </button>
  );
}
