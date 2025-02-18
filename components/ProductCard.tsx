"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes,
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center ${className}`}
        style={
          fill
            ? { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }
            : {}
        }
      >
        <ImageOff className="h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Image not available</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      loading="lazy"
      height={height}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
};

// Example usage with ProductCard
interface ProductCardProps {
  id?: string | number;
  imageUrl: string;
  title?: string;
  description?: number | string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageUrl,
  title,
  description,
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 1 % 2 === 0 ? -100 : 100, // Alternate between top and bottom
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }} // Ensures animation only happens once
      transition={{ duration: 1, delay: 1 * 0.1 }} // Add delay for staggered effect
      className="group relative flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[3/4]  overflow-hidden w-full ">
        <ImageWithFallback
          src={imageUrl}
          alt={title || "product image"}
          fill
          className="object-cover "
          sizes="(max-width: 36rem) 100vw, (max-width: 48rem) 50vw, (max-width: 62rem) 33.33vw, 25vw"
        />
        <div className="absolute bottom-0 left-0 right-0 translate-y-[7vh] transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => router.push(`/product/${id}`)}
            className="w-full bg-btnColor py-4 text-center text-sm text-white transition-colors hover:bg-btnHoverColor"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-start">
        {title && <h3 className="text-base text-textColor">{title}</h3>}
        {description && (
          <p className="text-sm text-btnColor truncate">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export { ImageWithFallback, ProductCard };
