import { Carousel } from "./Carousal";

interface CategoryProps {
  title?: string;
  categoryLoading: boolean;
  data?: any[];
  link?: string;
}

const CategorySection: React.FC<CategoryProps> = ({
  title = "Categories",
  categoryLoading,
  data = [],
  link = "#",
}) => {
  return (
    <section className="mb-5 ">
      {/* <h1 className="text-4xl text-center text-gray-800 mb-3">{title}</h1> */}
      <div className="w-full">
        {categoryLoading ? (
          <CarouselSkeleton />
        ) : data?.length > 0 ? (
          <Carousel link={link} images={data} />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-40 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-xs uppercase">No {title} found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
const CarouselSkeleton = () => {
  return (
    <section className="w-full">
      <div className="flex gap-4 overflow-hidden">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex flex-col items-center animate-pulse">
            {/* Image Skeleton */}
            <div className="w-[250px] h-[150px] bg-gray-300 rounded-lg"></div>

            {/* Text Skeleton */}
            {/* <div className="mt-2 w-[120px] h-4 bg-gray-300 rounded"></div> */}
          </div>
        ))}
      </div>
    </section>
  );
};
