"use client";
import Image from "next/image";
import React from "react";

interface CardProps {
  imageUrl: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title }) => {
  return (
    <div className="card relative">
      <div className="image-container">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill" // Use layout="fill" for responsive images
          objectFit="contain" // Ensure the image covers the container
          // width={300}
          // height={200}
          className="object-cover"
          loading="lazy"
        />
        <div className="overlay">View</div>
      </div>
      <div className="text-container">
        <h3>{title}</h3>
      </div>
      <style jsx>{`
        .card {
          height: auto;
          overflow: hidden;
          width: 100%;
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .image-container {
          position: relative;
          border-radius: 8px;
          width: 100%;
          cursor: pointer;
          height: 500px;
          overflow: hidden;
        }
        .overlay {
          position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          background-color: white;
          color: whiNte;
          text-align: center;
          padding: 10px;
          transition: bottom 0.5s ease;
        }
        .card:hover .overlay {
          bottom: -2px;
        }
        .text-container {
          padding: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Card;
