"use client";

import { ObjectsArrayValues } from "@schemas/item";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import ItemPreview from "./ItemPreview";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HighlightedItems = ({ items }: { items: ObjectsArrayValues }) => {
  const swiperRef = useRef<any>(null);

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="w-full  flex gap-2 justify-between items-center mt-10">
        <p className="text-4xl font-montserrat">Highlights</p>
      </div>

      <div className="w-full flex gap-2 justify-center">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-20 p-1 md:p-2 flex items-center justify-center"
        >
          <FiChevronLeft className="text-3xl text-black" />
        </button>

        <Swiper
          loop={true}
          spaceBetween={15}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          speed={1000}
          modules={[Autoplay, Navigation, Pagination, A11y]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 8,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full h-full m-0"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="border border-sky-blue">
                <ItemPreview item={item} searchKeyword="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-20 p-1 md:p-2 flex items-center justify-start"
        >
          <FiChevronRight className="text-3xl text-black" />
        </button>
      </div>
    </div>
  );
};

export default HighlightedItems;
