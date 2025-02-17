import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
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
  link: string;
}

export const Carousel: React.FC<CarouselProps> = ({ images, link }) => {
  console.log(images, "images from carousel");

  return (
    <>
      <style jsx>
        {`
          .swiper {
            width: 100%;
            height: 100%;
          }

          .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>

      <section className="p-10 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          allowSlideNext
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {images?.map((data) => (
            <SwiperSlide key={data.id}>
              <Link href={`${link}/${data.slug}`}>
                <ImageWithFallback
                  src={data.image}
                  height={1000}
                  width={1000}
                  className="object-contain min-h-40 w-fit "
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
