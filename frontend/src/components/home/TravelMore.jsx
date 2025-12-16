import React, { useState, useEffect } from "react";
import MalakaTour from "./MalakaTour";
import TravelGallery from "./TravelGallery";
import "../../styles/components/home/TravelMore.scss";
import { getFeaturedHotels } from "../../api/hotelClient";

const TravelMore = () => {
 const [hotels, setHotels] = useState([]);

 useEffect(() => {
  const fetchFeaturedHotels = async () => {
   try {
    const data = await getFeaturedHotels(5);
    setHotels(data);
    // console.log("Featured hotels data:", data);
   } catch (error) {
    console.error("Failed to fetch featured hotels:", error);
   }
  };

  fetchFeaturedHotels();
 }, []);

 return (
  <section className="container travel-more">
   <div className="inner">
    <div className="section-header">
     <div className="tit">
      <h2 className="section-title">추천 숙소</h2>
      <p className="section-subtitle">
       엄선된 최고의 숙소에서 특별한 휴식을 즐겨보세요. 최상의 서비스와 편안함을
       제공하는 프리미엄 숙소를 만나보세요.
      </p>
     </div>
     <button className="btn">전체보기</button>
    </div>

    <div className="travel-content">
     {hotels && hotels.length > 0 && (
      <>
       <MalakaTour hotel={hotels[0]} />
       <TravelGallery hotels={hotels} />
      </>
     )}
    </div>
   </div>
  </section>
 );
};

export default TravelMore;
