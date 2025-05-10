"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import WideCard from "./widecard";
import Headings from "./headings";
import { latestCards } from "@/lib/utils/constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

const TheLatest = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-[#F5F5F7] pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start mx-auto max-sm:mx-5 max-lg:mx-10 lg:max-w-5/6 md:items-center mb-6 md:mb-8 gap-4">
        <div className="w-full md:w-auto">
          <Headings
            text={["The latest.", "Take a look at what's new right now."]}
            textColor={"text-[#1d1d1f]"}
          />
        </div>

        <div className="flex items-center space-x-3 ml-auto">
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

      <div className="relative max-w-screen py-5 pr-5 lg:pl-24 xl:pl-36 max-sm:px-5 max-lg:px-10 overflow-x-scroll no-scrollbar">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          slidesPerView={"auto"}
          onBeforeInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          className="!overflow-visible"
        >
          {latestCards.map((card, index) => (
            <SwiperSlide
              key={index}
              className="max-sm:min-w-[21rem] max-w-[24rem] mr-5"
            >
              <WideCard
                text={card.text}
                widthAndHeight="w-full h-[30rem]"
                textOneStyle={card.textOneStyle}
                textTwoStyle={card.textTwoStyle}
                textThreeStyle={card.textThreeStyle}
                link={card.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TheLatest;
