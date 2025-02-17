import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import { ImageWithFallback } from "./ProductCard";
import Link from "next/link";

interface ImageData {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  subcategories: any[]; // You can further type this if needed
}

interface CarouselProps {
  images: ImageData[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  console.log(images, "images from carousel");

  return (
    <>
      <style jsx>
        {`
          .swiper {
            width: 100%;
            padding-top: 50px;
            padding-bottom: 50px;
          }

          .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 300px;
            height: 300px;
          }

          .swiper-slide img {
            display: block;
            width: 100%;
          }
        `}
      </style>

      <section className="p-10 ">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={6}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          //   pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {images?.map((data) => (
            <SwiperSlide key={data.id}>
              <Link href={`/category/${data.slug}`}>
                <ImageWithFallback
                  src={data.image}
                  height={1000}
                  width={1000}
                  className="object-contain h-full"
                  alt={data.name} // Added alt text dynamically for accessibility
                  sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};
