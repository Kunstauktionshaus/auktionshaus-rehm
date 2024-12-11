"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Zoom, Navigation, Thumbs, FreeMode } from "swiper/modules";
import { AiOutlineClose } from "react-icons/ai";

interface ImagesContainerProps {
  catalogNumber: number;
  auctionNumber: string;
}

const ImagesContainer: React.FC<ImagesContainerProps> = ({
  catalogNumber,
  auctionNumber,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  const maxImages = 9;

  const checkImageExists = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      const loadedImageUrls: string[] = [];
      for (let i = 0; i < maxImages; i++) {
        const imageUrl = `${BASE_URL}/${auctionNumber}/${catalogNumber}${
          i > 0 ? `_${i}` : ""
        }.jpg`;
        const exists = await checkImageExists(imageUrl);
        if (exists) {
          loadedImageUrls.push(imageUrl);
        } else {
          break;
        }
      }
      setImageUrls(loadedImageUrls);
      setIsLoading(false);
    };

    loadImages();
  }, [catalogNumber, auctionNumber, BASE_URL]);

  const enterFullScreen = async () => {
    if (mainSwiper && mainSwiper.el.requestFullscreen) {
      await mainSwiper.el.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullScreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="w-full p-2">
      <div className="w-full h-[400px] md:h-[500px] xl:h-[700px] lg:p-6 flex items-center justify-center">
        {isLoading ? (
          <span className="mt-20 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-2 border-t-teal border-gray-200"></span>
        ) : (
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <Swiper
              spaceBetween={10}
              navigation
              loop={true}
              zoom={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Zoom, FreeMode, Navigation, Thumbs]}
              onSwiper={setMainSwiper}
              className="main-swiper w-full h-5/6"
            >
              {imageUrls.map((imageUrl, index) => (
                <SwiperSlide key={index} onClick={enterFullScreen}>
                  <div className="w-full h-full swiper-zoom-container relative">
                    <Image
                      src={imageUrl}
                      alt={`Image for catalog number ${catalogNumber}`}
                      fill
                      quality={100}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-contain cursor-zoom-in"
                    />
                  </div>
                  {isFullscreen && (
                    <button
                      onClick={exitFullScreen}
                      className="fixed top-4 right-4 p-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 z-50"
                    >
                      <AiOutlineClose size={24} />
                    </button>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {imageUrls.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={imageUrls.length}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumb mt-3 w-full h-1/6"
              >
                {imageUrls.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full relative">
                      <Image
                        src={imageUrl}
                        alt={`Thumbnail for catalog number ${catalogNumber}`}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesContainer;
