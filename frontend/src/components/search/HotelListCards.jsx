import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/search/HotelListCards.scss";

const HotelListCards = ({
 hotels = [],
 toggleFavorite,
 favoriteHotelIds = [],
}) => {
 const navigate = useNavigate();

 const isFavorite = (hotelId) => {
  return favoriteHotelIds.includes(hotelId);
 };

 const handleFavoriteClick = async (e, hotelId) => {
  e.stopPropagation();
  await toggleFavorite(hotelId);
 };
 // console.log("HotelListCards received hotels:", hotels);

 if (!hotels || hotels.length === 0) {
  return <div className="hotel-list-cards empty">호텔을 찾을 수 없습니다.</div>;
 }

 return (
  <div className="hotel-list-cards">
   {hotels.map((hotel, i) => (
    <div
     key={i}
     className="hotel-card"
     onClick={() => {
      navigate(`/hotels/${hotel.id}`);
     }}
    >
     <div className="hotel-image">
      <img src={hotel.images[0]} alt={hotel.name} />
      <div className="image-count">{hotel.images.length} images</div>
     </div>

     <div className="hotel-info">
      <h3 className="hotel-name">{hotel.name}</h3>
      <div className="hotel-location">{hotel.location}</div>

      <div className="hotel-meta">
       <div className="hotel-stars">
        {"⭐".repeat(hotel.stars)} {hotel.stars} Star Hotel
       </div>
       <div className="hotel-amenities">🏨 {hotel.amenities}+ Amenities</div>
      </div>

      <div className="hotel-rating">
       <span className="rating-score">{hotel.rating}</span>
       <span className="rating-label">{hotel.ratingLabel}</span>
       <span className="rating-reviews">{hotel.reviews} reviews</span>
      </div>
     </div>

     <div className="hotel-actions">
      <div className="hotel-price">
       <div className="price-label">starting from</div>
       <div className="price-amount">
        ₩{hotel.basePrice.toLocaleString()}/night
       </div>
       <div className="price-note">excl. tax</div>
      </div>

      <button
       onClick={async (e) => {
        console.log("Toggling favorite for hotel ID:", hotel.id);
        await handleFavoriteClick(e, hotel.id);
        console.log("Favorite toggled successfully");
       }}
       className={`wishlist-button ${isFavorite(hotel.id) ? "active" : ""}`}
      >
       {isFavorite(hotel.id) ? "❤️" : "🤍"}
      </button>
      <button className="view-button">View Place</button>
     </div>
    </div>
   ))}
  </div>
 );
};

export default HotelListCards;
