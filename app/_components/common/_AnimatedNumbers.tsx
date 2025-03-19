"use client";

import AnimatedNumbers from "react-animated-numbers";

export function _AnimatedNumber({ num }: { num: number }) {
  return (
    <div key={num}>
      <AnimatedNumbers
        animateToNumber={num}
        transitions={(index) => ({
          type: "spring",
          duration: index / 2 + 0.5,
          ease: "easeInOutQuint",
        })}
      />
    </div>
  );
}
