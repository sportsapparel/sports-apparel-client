export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};
export const CarouselSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex space-x-4 overflow-hidden">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-40 bg-gray-300 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};
