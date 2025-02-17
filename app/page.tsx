// pages/index.tsx
"use client";
import HeroSection from "@/components/HeroSection";
import HomeHead from "@/components/HomeHead";
import { ProductGrid } from "@/components/ProductCard";
import { ZoomGrid } from "@/components/ZoomImage";
import { products } from "@/constants";
import { images } from "@/constants/imageUrls";

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

const slides = [
  {
    image: images.HomePageSliderImage1,
    text: `I'm a review. Click to edit me and add text from a \n critic who has evaluated you and your work.`,
    imageHeight: 200,
    imageWidht: 200,
  },

  {
    text: "This is the third slide",
    image: images.HomePageSliderImage2,
    imageHeight: 200,
    imageWidht: 200,
  },
  {
    text: "This is the second slide",
    image: images.HomePageSliderImage3,
    imageHeight: 200,
    imageWidht: 200,
  },
];
const Home = () => (
  <>
    <main className=" space-y-10">
      <HomeHead />
      <ZoomGrid
        className="h-[80dvh] w-full bg-slate-300 text-white grid grid-cols-2"
        columns={items}
      />
      {/* <Banner items={items} /> */}
      <HeroSection />
      <ProductGrid
        className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10 "
        products={products.slice(0, 4)}
      />
      {/* <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel
          leftControl={
            <>
              <ChevronLeft size={40} />
            </>
          }
          rightControl={
            <>
              <ChevronRight size={40} />
            </>
          }
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="flex flex-col  gap-10 items-center text-center"
            >
              <Image src={s.image} alt="slider" height={100} width={200} />
              <h4>{s.text}</h4>
            </div>
          ))}
        </Carousel>
      </div> */}
    </main>
  </>
);

export default Home;
