"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CommonSliderProps = {
  items: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
};

const CommonSlider = ({
  items,
  slidesPerView = 3,
  spaceBetween = 20,
  loop = true,
  autoplay = false,
  showNavigation = true,
  showPagination = false,
}: CommonSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
      navigation={showNavigation}
      pagination={showPagination ? { clickable: true } : false}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommonSlider;
