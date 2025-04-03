import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';  // Correct CSS import for Swiper 7+
import 'swiper/modules/navigation/navigation.min.css';  // Optional, for navigation
import 'swiper/modules/pagination/pagination.min.css';  // Optional, for pagination

const Carousel = () => {
  return (
    <div className="carousel-container">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect="slide"
        navigation={true}  // Optional, enable navigation arrows
        pagination={{ clickable: true }}  // Optional, enable pagination dots
      >
        <SwiperSlide>
          <img src="https://via.placeholder.com/600x300" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://via.placeholder.com/600x300" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://via.placeholder.com/600x300" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
