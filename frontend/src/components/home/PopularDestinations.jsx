import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/components/home/PopularDestinations.scss";
import DestinationCard from "./DestinationCard";
import { mockDestinations } from "../../api/mockData";
import { getHotels } from "../../api/hotelClient";

const PopularDestinations = () => {
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

    <Swiper
     modules={[Navigation, Pagination]}
     spaceBetween={20}
     slidesPerView={4}
     navigation
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
   </div>
  </section>
 );
};

export default PopularDestinations;
