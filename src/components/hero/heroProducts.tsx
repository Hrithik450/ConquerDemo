"use client";

import { heroProductImages } from "@/lib/utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

const HeroProducts = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params.navigation &&
      typeof swiperRef.current.params.navigation !== "boolean"
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:ml-16 2xl:ml-24 sm:pt-16 sm:px-6 lg:px-8">
      <div className="relative pt-4 md:pt-8 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 xl:px-10 overflow-x-hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          slidesPerView={"auto"}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!overflow-visible"
        >
          {heroProductImages.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!w-[120px] flex flex-col items-center mr-6"
            >
              <div className="relative w-full aspect-square flex items-center justify-center">
                <img
                  src={item.link}
                  alt={item.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <p className="text-sm sm:text-base text-center mt-3 mb-2 tracking-wide font-medium line-clamp-2">
                {item.name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-start sm:pl-5 space-x-3 mb-4 md:mb-0">
        <button
          ref={prevRef}
          className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Previous products"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          ref={nextRef}
          className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Next products"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroProducts;
