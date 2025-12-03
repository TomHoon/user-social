import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import HeroCard from "./HeroCard";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../styles/components/home/HeroSection.scss";
import { Pagination } from "swiper/modules";

const HeroSection = () => {
  const navigate = useNavigate();
  const heroSlides = [
    {
      title: "신정해보세요",
      subtitle: "퍼펙트 호텔 및 다양한\n숙소를 확인하세요!",
      description:
        "컴퓨터를 통해 유용한 예약과 고객 사을 지원 부웅\n함한 북시즈 확인하세요.",
      backgroundImage:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop",
      className: "hero-card-1",
    },
    {
      title: "최고의 여행 경험",
      subtitle: "세계 곳곳의 숨겨진\n보석같은 장소들",
      description:
        "특별한 여행을 위한 완벽한 숙소와\n잊지 못할 추억을 만들어보세요.",
      backgroundImage:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop",
      className: "hero-card-2",
    },
    {
      title: "럭셔리 휴양지",
      subtitle: "프리미엄 리조트에서\n완벽한 휴식을",
      description: "최고급 시설과 서비스로\n당신만의 특별한 시간을 보내세요.",
      backgroundImage:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=1080&fit=crop",
      className: "hero-card-3",
    },
  ];

  return (
    <div className="hero-section">
      <div className="search-btn-wrapper">
        <button className="btn btn--blur" onClick={() => navigate("/search")}>
          어떤 숙소를 찾고 계세요?
        </button>
      </div>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="hero-swiper"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <HeroCard
              title={slide.title}
              subtitle={slide.subtitle}
              description={slide.description}
              backgroundImage={slide.backgroundImage}
              className={slide.className}
              searchForm={index === 0} // 첫 번째 슬라이드에만 검색 폼 표시
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
