import React from "react";
import "../../styles/components/hotelpage/HotelMap.scss";

const HotelMap = ({ address, location }) => {
 // Google Maps API 키
 const GOOGLE_MAPS_API_KEY = "AIzaSyDHcx9sCPnQhwcKlC5uHDUgqOJTXqJ5234";
 const encodedAddress = encodeURIComponent(address || "서울시청");

 const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}&zoom=15`;

 // API 키가 없으면 Google Maps 링크로 대체
 const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

 return (
  <div className="hotel-map">
   <div className="map-info">
    <h2> 위치</h2>
    <div className="address">
    {address ?<span className="location">{address}</span>:
    <span className="address-text">{location}</span>}
    </div>
    <a
     href={mapsLink}
     target="_blank"
     rel="noopener noreferrer"
     className="map-link"
    >
     Google Maps에서 보기 →
    </a>
   </div>
   <div className="map-container">
    <iframe
     width="100%"
     height="400"

     style={{ border: 0 }}
     referrerPolicy="no-referrer-when-downgrade"
     src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
     allowFullScreen
    />
   </div>
  </div>
 );
};

export default HotelMap;
