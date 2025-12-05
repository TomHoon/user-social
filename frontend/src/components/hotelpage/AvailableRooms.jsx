import React from "react";
import "../../styles/components/hotelpage/AvailableRooms.scss";
import { NavLink } from "react-router-dom";
const AvailableRooms = ({ rooms, hotelId }) => {
 return (
  <div className="available-rooms">
   <h3>예약 가능한 객실</h3>
   {rooms.map((room) => (
    <div key={room.id} className="room-card">
     <div className="left">
      <div className="img-wrap">
       <img src={room.images[0]} alt={room.name} />
      </div>
      <h3 className="room-name">{room.name}</h3>
      <p className="room-type">{room.type}</p>
     </div>
     <div className="right">
      <p className="room-price">{room.price.toLocaleString()}원</p>
      <NavLink
       to={`/booking/${hotelId}?roomId=${room.id}`}
       className="btn btn--primary"
      >
       예약하기
      </NavLink>
     </div>
    </div>
   ))}
  </div>
 );
};

export default AvailableRooms;
