"use client";
import React, { useState } from "react";
import styles from "./ZoomImage.module.css"; // Create a CSS module for styling

const ZoomImage: React.FC<{
  src: string;
  alt?: string;
  zoomLevel?: number;
}> = ({
  src,
  alt = "Zoomable Image",
  zoomLevel = 2, // Default zoom level
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setCursorPosition({ x, y });
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className={styles.imageWrapper}
        style={{
          transformOrigin: `${cursorPosition.x}% ${cursorPosition.y}%`,
          transform: isHovered ? `scale(${zoomLevel})` : "scale(1)",
        }}
      >
        <img src={src} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};

export default ZoomImage;
