import React, { useState } from "react";
import { FaStar, FaMapMarkerAlt, FaHeart, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/components/hotelpage/HotelDetailHeader.scss";
import { renderStars} from "../../util/reviewHelper";

const HotelDetailHeader = ({ hotel, toggleFavorite, favoriteHotelIds }) => {
 // console.log("HotelDetailHeader props:", hotel);

 const navigate = useNavigate();
 const [dateRange, setDateRange] = useState([null, null]);
 const [startDate, endDate] = dateRange;
 const [guests, setGuests] = useState(2);
 if (!hotel) {
  return <div className="hotel-detail-header loading">Loading...</div>;
 }

 const {
  name = "호텔명 없음",
  ratingAverage = 0,
  ratingCount = 0,
  city = "",
  address = "주소 정보 없음",
  location = "",
  basePrice = 0,

 } = hotel;

 // 별점을 별 아이콘으로 표시
 renderStars(ratingAverage)

 const handleFavorite = async () => {
  await toggleFavorite(hotel._id || hotel.id);

 };

 const handleShare = () => {
  console.log("Share hotel");
 };

 const handleBookNow = () => {
  const params = new URLSearchParams();
  if (startDate) params.append("checkIn", startDate.toISOString());
  if (endDate) params.append("checkOut", endDate.toISOString());
  params.append("guests", guests);

  navigate(`/booking/${hotel._id || hotel.id}?${params.toString()}`);
 };

 const isFavorited = favoriteHotelIds.includes(hotel._id || hotel.id);
 return (
  <div className="hotel-detail-header">
   <div className="header-top">
    <div className="breadcrumb">
     <span>{city || "Location"}</span> &gt; <span>{location || "Area"}</span>{" "}
     &gt; <span>{name}</span>
    </div>
    <div className="header-actions">
     <button className="icon-btn" onClick={handleFavorite}>
   {isFavorited ? "❤️" : "🤍"}
     </button>
     <button className="icon-btn" onClick={handleShare}>
      <FaShare />
     </button>
     <span className="user-name">Tomhoon</span>
    </div>
   </div>

   <div className="hotel-info">
    <div className="hotel-title-section">
     <h1 className="hotel-name">{name}</h1>
     <div className="rating-section">
      <div className="stars">{renderStars(ratingAverage)}</div>
      <span className="rating-text">{ratingAverage} Star Hotel</span>
     </div>
     <div className="location-section">
      <FaMapMarkerAlt className="location-icon" />
      <span className="address">{address}</span>
     </div>
     <div className="review-section">
      <span className="review-score">{ratingAverage}</span>
      <span className="review-text">Very Good</span>
      <span className="review-count">{ratingCount} reviews</span>
     </div>
    </div>
    <div className="price-section">
     <div className="price-wrapper">
      <span className="price">₩{hotel.basePrice.toLocaleString()}</span>
      <span className="price-unit">/night</span>
     </div>
     <button className="btn btn--secondary" onClick={handleBookNow}>
      Book now
     </button>
    </div>
   </div>


  </div>
 );
};

export default HotelDetailHeader;
