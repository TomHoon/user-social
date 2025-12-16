import React, { useState, useEffect,useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/components/home/PopularDestinations.scss";
import DestinationCard from "./DestinationCard";
import { getHotels } from "../../api/hotelClient";
import { GrPrevious ,GrNext } from "react-icons/gr";

const PopularDestinations = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
 const [featuredHotels, setFeaturedHotels] = useState([]);
 useEffect(() => {
  const fetchFeaturedHotels = async () => {
   try {
    const data = await getHotels({ limit: 8 });
    setFeaturedHotels(data || []);
   } catch (error) {
    console.error("Failed to fetch featured hotels:", error);
   }
  };
  fetchFeaturedHotels();
 }, []);

 return (
  <section className="container">
   <div className="inner">
    <div className="section-header">
     <div className="tit">
      <h2>여행에 빠지다</h2>
      <p>최고의 호텔을 추천해 드립니다.</p>
     </div>
     <button className="btn-see-all btn">See All</button>
    </div>
<div className="slider-wrap">

    <Swiper
     modules={[Navigation, Pagination]}
     spaceBetween={20}
     navigation={{
      prevEl: prevRef.current,
      nextEl: nextRef.current,
     }} 
     slidesPerView={4}

     // pagination={{ clickable: true }}
     breakpoints={{
      320: { slidesPerView: 1, spaceBetween: 15 },
      640: { slidesPerView: 2, spaceBetween: 15 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
      1280: { slidesPerView: 4, spaceBetween: 20 },
     }}
     className="destinations-swiper"
    >
     {featuredHotels.map((hotel, i) => (
      <SwiperSlide key={i}>
       <DestinationCard destination={hotel} />
      </SwiperSlide>
     ))}
    </Swiper>
    <div className="destinations-nav-btns">
      <button ref={prevRef} className="swiper-btn prev"><GrPrevious /> </button>
      <button ref={nextRef} className="swiper-btn next"><GrNext /></button>
    </div>
   </div>
</div>

  </section>
 );
};

export default PopularDestinations;
