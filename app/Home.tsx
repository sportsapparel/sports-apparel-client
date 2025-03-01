"use client";
import HeroSection from "@/components/HeroSection";
import HomeHead from "@/components/HomeHead";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeleton";
import { ZoomGrid } from "@/components/ZoomImage";
import { images } from "@/constants/imageUrls";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchAllProducts } from "@/lib/apiFuntions";

const items = [
  {
    imageUrl: images.ZoomGridImage1,
    alt: "image",
    link: "/shop",
    linkText: "Shop Now",
  },
  {
    imageUrl: images.ZoomImageGrid2,
    alt: "image",
    link: "/shop",
    linkText: "Shop Now",
  },
];

// const slides = [
//   {
//     image: images.HomePageSliderImage1,
//     text: `I'm a review. Click to edit me and add text from a \n critic who has evaluated you and your work.`,
//     imageHeight: 200,
//     imageWidht: 200,
//   },

//   {
//     text: "This is the third slide",
//     image: images.HomePageSliderImage2,
//     imageHeight: 200,
//     imageWidht: 200,
//   },
//   {
//     text: "This is the second slide",
//     image: images.HomePageSliderImage3,
//     imageHeight: 200,
//     imageWidht: 200,
//   },
// ];
// const slicedProducts = products.slice(0, 4);
const Home = () => {
  const { data: products, loading } = useFetchData(fetchAllProducts);
  console.log(products);
  return (
    <>
      <main className=" space-y-10">
        <HomeHead />
        <ZoomGrid
          className="h-[80dvh] w-full bg-slate-300 text-white grid grid-cols-2"
          columns={items}
        />
        {/* <Banner items={items} /> */}
        <HeroSection />

        <div className="w-full space-y-10 p-10">
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : products?.length > 0 ? (
              products
                ?.slice(0, 4)
                .map((product: any, index: any) => (
                  <ProductCard
                    key={index}
                    id={product.id}
                    imageUrl={product.thumbnail.imageUrl}
                    title={product.name}
                    description={product.description}
                  />
                ))
            ) : (
              <div className="flex flex-col items-center justify-center col-span-full p-10">
                <h4 className="text-gray-600  uppercase">No product found</h4>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
