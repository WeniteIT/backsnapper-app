"use client";

import AnimatedNumbers from "react-animated-numbers";

export default function AN({ num }: { num: number }) {
  return (
    <div key={num}>
      <AnimatedNumbers
        animateToNumber={num}
        transitions={(index) => ({
          type: "keyframes",
          duration: (index / 1.5) + 0.5,
        })}
      />
    </div>
  );
}
