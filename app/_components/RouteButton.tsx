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
      className={`secondary hover-primary flex gap-3 justify-center p-3 rounded-md text-xl w-${width} items-center
       transition-colors duration-300 ease-in-out focus:outline-none cursor-pointer`}
      onClick={() => redirect(route, RedirectType.push)}
    >
      {label}
    </button>
  );
}
