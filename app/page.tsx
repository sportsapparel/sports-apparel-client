// pages/index.tsx
"use client";
import HeroSection from "@/components/HeroSection";
import HomeHead from "@/components/HomeHead";
import { ProductGrid } from "@/components/ProductCard";
import Slider from "@/components/Slider/Slider";
import { ZoomGrid } from "@/components/ZoomImage";
import { products } from "@/constants";
import { Carousel } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const items = [
  {
    imageUrl:
      "https://static.wixstatic.com/media/e4f166_fd835a93708e42359f08b90fb73ecc45~mv2_d_7029_7087_s_4_2.jpg/v1/fill/w_523,h_523,fp_0.47_0.23,q_90/e4f166_fd835a93708e42359f08b90fb73ecc45~mv2_d_7029_7087_s_4_2.webp",
    alt: "image",
    link: "/shop",
    linkText: "Shop Now",
  },
  {
    imageUrl:
      "https://static.wixstatic.com/media/e4f166_425fdb4e99434f2faac1ae5d6b79ff2d~mv2_d_5254_5452_s_4_2.jpg/v1/fill/w_523,h_523,fp_0.48_0.48,q_90/e4f166_425fdb4e99434f2faac1ae5d6b79ff2d~mv2_d_5254_5452_s_4_2.webp",
    alt: "image",
    link: "/shop",
    linkText: "Shop Now",
  },
];

const slides = [
  {
    image:
      "https://static.wixstatic.com/media/e4f166_2c239077eff3402ca2afe0513fb5a73c~mv2.png/v1/fill/w_272,h_46,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Artboard%202%20copy.png",
    text: `I'm a review. Click to edit me and add text from a \n critic who has evaluated you and your work.`,
    imageHeight: 200,
    imageWidht: 200,
  },

  {
    image:
      "https://static.wixstatic.com/media/e4f166_a0463a6e2b8d48c3bf0504a51784ffef~mv2.png/v1/crop/x_70,y_5,w_1152,h_329/fill/w_216,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Artboard%202%20copy%202.png",
    text: "This is the third slide",
    imageHeight: 200,
    imageWidht: 200,
  },
  {
    image:
      "https://static.wixstatic.com/media/e4f166_e3ce649436114c0b879715185eaa0ef6~mv2.png/v1/fill/w_146,h_47,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Artboard%202.png",
    text: "This is the second slide",
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
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
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
      </div>
    </main>
  </>
);

export default Home;
