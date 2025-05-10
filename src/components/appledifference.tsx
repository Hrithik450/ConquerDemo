"use client";

import { appleDifferenceCards } from "@/lib/utils/constant";
import React, { useRef } from "react";
import Headings from "./headings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const AppleDifference = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-[#F5F5F7] py-6">
      <div className="flex flex-col md:flex-row justify-between items-start mx-auto max-sm:mx-5 max-lg:mx-10 lg:max-w-5/6 md:items-center mb-6 md:mb-8 gap-4">
        <div className="w-full md:w-auto">
          <Headings
            text={[
              "The Apple Store difference.",
              "  Even more reasons to shop with us.",
            ]}
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
          spaceBetween={16}
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
          {appleDifferenceCards.map((card, index) => (
            <SwiperSlide key={index} className="min-w-80 max-w-80 mr-5">
              <div
                key={index}
                className=" w-full rounded-2xl leading-relaxed bg-white hover:scale-[101%] hover:shadow-xl/15 transition ease-in h-[15rem] px-7 pt-9 shadow-xl"
              >
                <svg
                  width="46"
                  height="56"
                  viewBox="0 0 49 56"
                  className="text-[#ff3c26] box-content"
                  fill="currentColor"
                >
                  <path d={card.path}></path>
                </svg>
                <p className="text-2xl font-SFsemibold">
                  {card.text[0]}{" "}
                  <span className="text-[#ff3c26]">{card.text[1]}</span>{" "}
                  {card.text[2]}
                  <span className="text-[#ff3c26]">{card.text[3]}</span>{" "}
                  {card.text[4]}
                  <span className="text-[#ff3c26]"> {card.text[5]}</span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AppleDifference;
