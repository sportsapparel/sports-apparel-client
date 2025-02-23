"use client";
import React from "react";
import Image from "next/image";

interface ZoomColumnProps {
  imageUrl: string;
  backgroundColor?: string;
  alt?: string;
}

const ZoomColumn: React.FC<ZoomColumnProps> = ({
  imageUrl,
  backgroundColor = "bg-tranparent",
  alt = "Column image",
}) => {
  return (
    <div className={`h-full ${backgroundColor} relative overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="h-full w-full transition-transform duration-500 ease-in-out hover:scale-105 origin-center">
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Grid Component
interface ZoomGridProps {
  columns: ZoomColumnProps[];
  className: string;
}

const ZoomGrid: React.FC<ZoomGridProps> = ({ columns, className }) => {
  return (
    <div className={className}>
      {columns.map((column, index) => (
        <ZoomColumn
          key={index}
          imageUrl={column.imageUrl}
          backgroundColor={column.backgroundColor}
          alt={column.alt}
        />
      ))}
    </div>
  );
};

export { ZoomColumn, ZoomGrid };
