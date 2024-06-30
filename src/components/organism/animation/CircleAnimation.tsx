import React from "react";
import "@/styles/animation/circleAnimation.css";

const CircleAnimation = () => {
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="wrapper">
      {bubbles.map((_, index) => (
        <div key={index} className="bubble"></div>
      ))}
    </div>
  );
};

export default CircleAnimation;
