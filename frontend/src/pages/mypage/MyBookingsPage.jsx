import React, { useState } from "react";
import MyProfile from "../../components/mypage/MyProfile";
import "../../styles/pages/mypage/MyBookingsPage.scss";

const MyBookingsPage = () => {
 const [filter, setFilter] = useState("upcoming");

 // 임시 예약 데이터
 const bookings = [
  {
   id: 1,
   hotelName: "객실",
   hotelImage: "/hotel-placeholder.jpg",
   checkIn: { date: "Thur, Dec 8", time: "12:00pm" },
   checkOut: { date: "Fri, Dec 9", time: "11:30am" },
   status: "upcoming",
  },
  {
   id: 2,
   hotelName: "객실",
   hotelImage: "/hotel-placeholder.jpg",
   checkIn: { date: "Thur, Dec 8", time: "12:00pm" },
   checkOut: { date: "Fri, Dec 9", time: "11:30am" },
   status: "upcoming",
  },
  {
   id: 3,
   hotelName: "객실",
   hotelImage: "/hotel-placeholder.jpg",
   checkIn: { date: "Thur, Dec 8", time: "12:00pm" },
   checkOut: { date: "Fri, Dec 9", time: "11:30am" },
   status: "upcoming",
  },
 ];

 const filteredBookings = bookings.filter(
  (booking) => booking.status === filter
 );

 return (
  <div className="bookings-page">


   <div className="bookings-content">
    <div className="bookings-header">
     <h2 className="bookings-title">예약내역</h2>
     <div className="filter-dropdown">
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
       <option value="upcoming">Upcoming</option>
       <option value="past">Past</option>
       <option value="cancelled">Cancelled</option>
      </select>
     </div>
    </div>

    <div className="bookings-list">
     {filteredBookings.map((booking) => (
      <div key={booking.id} className="booking-card">
       <div className="booking-image">
        <div className="image-placeholder">
         <span>객실</span>
        </div>
       </div>

       <div className="booking-details">
        <div className="detail-group">
         <label>Check-in</label>
         <div className="date">{booking.checkIn.date}</div>
         <div className="time-group">
          <span className="time-label">체크인</span>
          <span className="time">{booking.checkIn.time}</span>
         </div>
        </div>

        <div className="divider">~</div>

        <div className="detail-group">
         <label>Check-Out</label>
         <div className="date">{booking.checkOut.date}</div>
         <div className="time-group">
          <span className="time-label">체크아웃</span>
          <span className="time">{booking.checkOut.time}</span>
         </div>
        </div>

        <div className="status-group">
         <div className="status-item">
          <span className="status-dot arrival"></span>
          <div>
           <div className="status-label">체크인</div>
           <div className="status-value">On arrival</div>
          </div>
         </div>
         <div className="status-item">
          <span className="status-dot departure"></span>
          <div>
           <div className="status-label">체크아웃</div>
           <div className="status-value">On arrival</div>
          </div>
         </div>
        </div>
       </div>

       <div className="booking-actions">
        <button className="btn-download">Download Ticket</button>
        <button className="btn-detail">›</button>
       </div>
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};

export default MyBookingsPage;
