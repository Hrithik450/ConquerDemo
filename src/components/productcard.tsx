"use client";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCardsProps } from "@/lib/utils/constant.types";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Productcard = ({ text, images }: ProductCardsProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative rounded-2xl flex flex-col justify-between font-SFregular leading-relaxed min-w-[20rem] bg-white h-[31rem] p-7 pt-14 shadow-xl hover:scale-[101%] hover:shadow-xl/15 transition ease-in">
      {images && images.length > 1 && (
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button
            ref={prevRef}
            className="cursor-pointer w-8 h-8 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-3 h-3" />
          </button>
          <button
            ref={nextRef}
            className="cursor-pointer w-8 h-8 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
            aria-label="Next image"
          >
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="h-[280px] w-full object-cover mx-auto mb-4">
        {images && images.length > 1 ? (
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              clickable: true,
              el: paginationRef.current,
            }}
            spaceBetween={10}
            slidesPerView={1}
            onBeforeInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <img
                  src={image.url}
                  alt={image.label}
                  height={230}
                  width={230}
                  className="object-contain h-full w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={images?.[0]?.url}
            alt={images?.[0]?.label}
            height={230}
            width={230}
            className="object-contain h-full w-full mx-auto"
          />
        )}
      </div>

      <div
        ref={paginationRef}
        className="flex justify-center items-center mt-2"
      >
        {[...Array(images?.length || 0)].map((_, index) => (
          <span
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`cursor-pointer mx-1 ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            } w-2 h-2 rounded-full`}
          ></span>
        ))}
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-SFregular text-[#b64400]">{text[0]}</p>
        <p className="text-lg font-SFmedium text-wrap">{text[1]}</p>
      </div>
      <p className="text-sm font-SFregular text-[#3f4643]">{text[2]}</p>
    </div>
  );
};

export default Productcard;
