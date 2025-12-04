import "../../styles/components/search/SearchFilterWrap.scss";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const SearchFilterWrap = ({ filters, onFilterChange }) => {
 const navigate = useNavigate();
 const [destination, setDestination] = useState(filters?.destination || "");
 const [dateRange, setDateRange] = useState([
  filters?.checkIn ? new Date(filters.checkIn) : null,
  filters?.checkOut ? new Date(filters.checkOut) : null,
 ]);
 const [startDate, endDate] = dateRange;
 const [guests, setGuests] = useState(parseInt(filters?.guests) || 2);
 const [showGuestPicker, setShowGuestPicker] = useState(false);

 useEffect(() => {
  if (filters) {
   setDestination(filters.destination || "");
   setGuests(parseInt(filters.guests) || 2);
   if (filters.checkIn && filters.checkOut) {
    setDateRange([new Date(filters.checkIn), new Date(filters.checkOut)]);
   }
  }
 }, [filters]);

 const incrementGuests = () => setGuests((prev) => Math.min(prev + 1, 10));
 const decrementGuests = () => setGuests((prev) => Math.max(prev - 1, 1));

 const handleSearch = () => {
  const newFilters = {
   destination,
   checkIn: startDate?.toISOString() || "",
   checkOut: endDate?.toISOString() || "",
   guests: guests.toString(),
  };

  if (onFilterChange) {
   onFilterChange(newFilters);
  }

  // URL 파라미터 업데이트 (선택사항)
  const params = new URLSearchParams();
  if (destination) params.append("destination", destination);
  if (startDate) params.append("checkIn", startDate.toISOString());
  if (endDate) params.append("checkOut", endDate.toISOString());
  params.append("guests", guests);

  window.history.replaceState(null, "", `/search?${params.toString()}`);
 };
 return (
  <div className="search-form inner">
   <div className="form-container">
    <div className="form-group">
     <label>목적지</label>
     <input
      type="text"
      placeholder="호텔명 또는 지역 입력"
      className="destination-input"
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
     />
    </div>

    <div className="form-group">
     <label>날짜</label>
     <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
       setDateRange(update);
      }}
      minDate={new Date()}
      dateFormat="M/d"
      locale={ko}
      placeholderText="11/28 ~ 도 11/29 · 1박"
      className="date-input"
      monthsShown={1}
      showPopperArrow={false}
     />
    </div>

    <div className="form-group guest-picker-wrapper">
     <label>인원 수</label>
     <div
      className="guest-display"
      onClick={() => setShowGuestPicker(!showGuestPicker)}
     >
      <span className="guest-icon">👤</span>
      <span>{guests}</span>
     </div>

     {showGuestPicker && (
      <div className="guest-picker-dropdown">
       <button
        className="guest-btn"
        onClick={(e) => {
         e.stopPropagation();
         decrementGuests();
        }}
        disabled={guests <= 1}
       >
        -
       </button>
       <span className="guest-count">{guests}</span>
       <button
        className="guest-btn"
        onClick={(e) => {
         e.stopPropagation();
         incrementGuests();
        }}
        disabled={guests >= 10}
       >
        +
       </button>
      </div>
     )}
    </div>

    <button className="search-button" onClick={handleSearch}>
     <span>🔍</span>
    </button>
   </div>
  </div>
 );
};

export default SearchFilterWrap;
