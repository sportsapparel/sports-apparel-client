"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useRouter } from "next/navigation";

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
  imageUrl: string | undefined;
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
    <div className="group relative flex flex-col">
      <div className="relative aspect-[3/4]  overflow-hidden w-full ">
        <ImageWithFallback
          src={imageUrl || ""}
          alt={title || "product image"}
          fill
          className="object-contain"
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
        {description && <p className="text-sm text-btnColor">{description}</p>}
      </div>
    </div>
  );
};

// Grid Container Component
interface ProductGridProps {
  products: ProductCardProps[];
  className?: string;
  perPage?: number; // Make perPage configurable
  initialPerPage?: number; // Optional initial load count
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className,
  perPage = 10, // Default to 10 if not specified
  initialPerPage = perPage, // Default initial load to perPage value
}) => {
  const [visibleProducts, setVisibleProducts] = useState(initialPerPage);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + perPage, products.length));
  };

  const displayedProducts = products.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < products.length;
  return (
    <div className="container-c  py-8">
      <div className={className}>
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>

      {hasMoreProducts && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-btnColor px-8 py-3 text-white rounded hover:bg-btnHoverColor transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export { ImageWithFallback, ProductCard, ProductGrid };
