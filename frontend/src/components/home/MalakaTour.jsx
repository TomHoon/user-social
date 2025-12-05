import React from "react";
import "../../styles/components/home/MalakaTour.scss";

const MalakaTour = ({ hotel }) => {
//  console.log(hotel);

 if (!hotel) return null;

 return (
  <div
   className="malaka-tour"
   style={{ backgroundImage: `url(${hotel.images?.[0] || ""})` }}
  >
   <div className="tour-content">
    <h3 className="tour-title">{hotel.name || "숙소"}</h3>
    <div className="tour-price">
     <span className="price-label">from</span>
     <span className="price-amount">
      ₩{hotel.basePrice?.toLocaleString() || "0"}
     </span>
    </div>
    <p className="tour-description">
     {hotel.description || "숙소 설명이 없습니다."}
    </p>
    <button className="book-flight-btn">예약하기</button>
   </div>
  </div>
 );
};

export default MalakaTour;
