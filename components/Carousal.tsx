import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageWithFallback } from "./ProductCard";
import { motion } from "framer-motion"; // Import Framer Motion

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

      <section>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          allowSlideNext
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {images?.map((data, index) => (
            <SwiperSlide key={data.id}>
              {/* Wrap the content with motion.div */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: index % 2 === 0 ? -100 : 100, // Alternate between top and bottom
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }} // Ensures animation only happens once
                transition={{ duration: 1, delay: index * 0.1 }} // Add delay for staggered effect
              >
                <div className="relative group mt-2">
                  <Link href={`${link}/${data.slug}`}>
                    <ImageWithFallback
                      src={data.image}
                      height={1000}
                      width={1000}
                      className="object-cover min-h-40 w-fit"
                      alt={data.name}
                      sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 from-40%  flex justify-center items-center text-white text-lg font-semibold opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {data.name}
                    </div>
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};
