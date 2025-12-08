import React from "react";
import { Link } from "react-router-dom";
const DestinationCard = ({ destination }) => {

 // 호텔 객체 구조에 맞게 속성 추출
 const name = destination.name;
 const city = destination.city || destination.country;
 const image = destination.images?.[0] || destination.image;
 const price = destination.basePrice || destination.price;
 const description = destination.description || `${destination.address || ""}`;

 return (
  <div
   className="destination-card"
   style={{ backgroundImage: `url(${image})` }}
  >
   <Link to={`/hotels/${destination._id || destination.id}`}>
    <div className="card-content">
     <div className="card-top">
      <h3 className="destination-name">{name}</h3>
      <p className="destination-country">{city}</p>
     </div>
     <p className="destination-description">{description}</p>
     <div className="card-footer">
      <span className="destination-price">
       ₩{price?.toLocaleString() || "가격 문의"}
      </span>
      <button className="btn--block btn">Book a Hotel</button>
     </div>
    </div>
   </Link>
  </div>
 );
};

export default DestinationCard;
