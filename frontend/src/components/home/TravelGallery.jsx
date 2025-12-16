import React from "react";
import "../../styles/components/home/TravelGallery.scss";
import { Link } from "react-router-dom";

const TravelGallery = ({ hotels }) => {
//  console.log(hotels);

 // 2번째부터 5번째 항목까지만 표시 (인덱스 1~4)
 const displayHotels = hotels.slice(1, 5);

 return (
  <div className="travel-gallery">
   <div className="gallery-grid">
    {displayHotels.map((item,i) => (
     <Link
      key={i}
      to={`/hotels/${item._id || item.id}`}
      className={`gallery-item ${item.className || ""}`}
      style={{ backgroundImage: `url(${item.images?.[0] || ""})` }}
     >
      <div className="gallery-overlay">
       <h4>{item.name}</h4>
       <p>{item.city}</p>
      </div>
     </Link>
    ))}
   </div>
  </div>
 );
};

export default TravelGallery;
