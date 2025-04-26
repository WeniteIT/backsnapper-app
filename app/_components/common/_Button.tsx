"use client";

import React from "react";

interface IProps {
  label: string | React.ReactNode;
  onClick?: () => void;
  width?: string;
  hover?: string;
  color?: "secondary" | "secondary-light" | "secondary-no-mode";
  className?: string;
}

export default function Button({
  label,
  width = "auto",
  hover,
  color = "secondary",
  className = "",
  onClick,
}: IProps) {
  return (
    <button
      title={hover}
      className={`${color} ${className} p-3 hover-primary flex gap-3 justify-center  rounded-md text-smoll w-${width} items-center
       transition-colors duration-300 ease-in-out focus:outline-none cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
