import React from "react";
import "@/styles/animation/colorCircleAnimation.css";

const ColorCircleAnimation = () => {
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="wrapper">
      {bubbles.map((_, index) => (
        <div key={index} className="bubble2"></div>
      ))}
    </div>
  );
};

export default ColorCircleAnimation;
