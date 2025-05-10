"use client";

import React, { useRef } from "react";
import WideCard from "./wideCard";
import Headings from "./headings";
import { productCards } from "@/lib/utils/constant";
import Productcard from "./productcard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Accessories = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-[#F5F5F7] py-6">
      <div className="flex flex-col md:flex-row justify-between items-start mx-auto max-sm:mx-5 max-lg:mx-10 lg:max-w-5/6 md:items-center mb-6 md:mb-8 gap-4">
        <div className="w-full md:w-auto">
          <Headings
            text={["Accessories.", " Put a bow on Mother’s Day."]}
            textColor={"text-[#ff3c26]"}
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

      <div className="relative max-w-screen py-6 pr-5 lg:pl-24 xl:pl-36 max-sm:px-5 max-lg:px-10 overflow-x-auto overflow-y-hidden no-scrollbar">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          slidesPerView="auto"
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
          <SwiperSlide className="max-sm:min-w-[21rem] max-w-[24rem] mr-5">
            <div className="h-full px-1">
              <WideCard
                text={["MOTHER'S DAY", "Pairs perfectly with Mom."]}
                widthAndHeight="w-full h-[31rem]"
                textZeroStyle="-mt-7"
                textOneStyle="text-black"
                link="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-mothers-day-202504?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1745264939886"
              />
            </div>
          </SwiperSlide>

          {productCards.map((card, index) => (
            <SwiperSlide
              key={index}
              className="max-sm:min-w-[21rem] max-w-[22rem] mr-5"
            >
              <div className="h-[30rem] px-1">
                <Productcard
                  link={card.link}
                  text={card.text}
                  colorOptions={card.colorOptions}
                  images={card.images}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Accessories;
