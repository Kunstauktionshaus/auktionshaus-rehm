"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";

const MainPageSlider = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  const images = ["w1.jpg", "w2.jpg", "w3.jpg", "w4.jpg", "w5.jpg", "w6.jpg"];

  return (
    <div className="w-full max-w-screen-3xl mx-auto">
      <div className="w-full aspect-[32/9] lg:h-96 flex items-center overflow-hidden">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1500}
          effect="fade"
          modules={[Autoplay, EffectFade]}
          className="w-full aspect-[32/9] lg:h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full aspect-[32/9] lg:h-full">
                <Image
                  src={`${BASE_URL}/homepage/${image}`}
                  fill
                  alt={`Homepage image`}
                  className="object-cover object-center z-0"
                  sizes="100vw"
                  quality={100}
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainPageSlider;
