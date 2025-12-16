import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/components/booking/BookingStepRoom.scss";
import { getRoomsByHotel } from "../../api/roomClient";

const BookingStepRoom = () => {
 const { hotelId, adults } = useParams();
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const [rooms, setRooms] = useState([]);
 const [selectedRoom, setSelectedRoom] = useState(null);

 useEffect(() => {
  const fetchRooms = async () => {
   try {
    const roomsData = await getRoomsByHotel(hotelId);
    setRooms(roomsData);
   } catch (error) {
    console.error("Failed to fetch rooms:", error);
    // 에러 발생 시 빈 배열 또는 임시 데이터 사용
    setRooms([]);
   }
  };

  fetchRooms();
 }, [hotelId]);

 const handleSelectRoom = (room) => {
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const select = searchParams.get("select");

  // room ID를 여러 필드에서 찾기 (API 응답 구조에 따라 다를 수 있음)
  const roomId = room._id || room.id || room.roomId;

  console.log("Selected room:", room);
  console.log("Room ID:", roomId);

  if (!roomId) {
   alert("객실 ID를 찾을 수 없습니다.");
   return;
  }

  const params = new URLSearchParams();
  params.append("checkIn", checkIn);
  params.append("checkOut", checkOut);
  params.append("adults", adults);
  if (children) params.append("children", children);
  if (select) params.append("select", select);
  params.append("roomId", roomId);

  navigate(`/booking/${hotelId}/payment?${params.toString()}`);
 };

 const checkIn = searchParams.get("checkIn");
 const checkOut = searchParams.get("checkOut");
 const nights =
  checkIn && checkOut
   ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
   : 0;

 return (
  <div className="booking-rooms">
   <div className="booking-header">
    <h1>객실 선택</h1>
    <div className="selected-dates">
     <div className="date-info">
      <span className="icon">📅</span>
      <span>
       {checkIn ? new Date(checkIn).toLocaleDateString("ko-KR") : "-"} ~{" "}
       {checkOut ? new Date(checkOut).toLocaleDateString("ko-KR") : "-"}
      </span>
     </div>
     <div className="date-info">
      <span className="icon">🌙</span>
      <span>{nights}박</span>
     </div>
     <div className="date-info">
      <span className="icon">👤</span>
      <span>성인 {searchParams.get("adults")}명</span>
      <span>어린이 {searchParams.get("children")}명</span>
     </div>
    </div>
   </div>

   <div className="room-list">
    {rooms.map((room, index) => (
     <div
      key={room._id || room.id || room.roomId || index}
      className="room-card"
     >
      <div className="room-image">
       <img
        src={
         room.images?.[0] ||
         "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400"
        }
        alt={room.name}
       />
      </div>

      <div className="room-details">
       <div className="room-header">
        <h3>{room.name}</h3>
        <div className="room-size">
         {room.type} · 최대 {room.capacity}명
        </div>
       </div>

       <div className="room-amenities">
        {room.amenities?.map((amenity, idx) => (
         <div key={idx} className="amenity">
          <span className="icon">✓</span>
          <span>{amenity}</span>
         </div>
        ))}
       </div>

       <div className="room-footer">
        <div className="price-info">
         <div className="current-price">
          ₩{room.price.toLocaleString()}
          <span className="unit">/박</span>
         </div>
        </div>
        <button
         className="btn btn--primary"
         onClick={() => handleSelectRoom(room)}
        >
         선택하기
        </button>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default BookingStepRoom;
