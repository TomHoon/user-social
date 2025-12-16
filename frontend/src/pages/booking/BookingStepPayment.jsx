import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/components/booking/BookingStepPayment.scss";
import PaymentContent from "../../components/payment/PaymentContent";
import { createReservation } from "../../api/reservationClient";
import { getHotelDetail } from "../../api/hotelClient";
import { getRoomDetail } from "../../api/roomClient";
const BookingStepPayment = () => {
 const { hotelId } = useParams();
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const [addCard, setAddCard] = useState(false);

 // 임시 카드 데이터
 const [cards, setCards] = useState([
  {
   id: 1,
   last4: "4321",
   expiry: "02/27",
   type: "visa",
  },
 ]);
 const handleAddCard = () => {
  //   navigate("/add-payment");
  setAddCard(true);
 };

 const handleDeleteCard = (cardId) => {
  setCards(cards.filter((card) => card.id !== cardId));
 };

 const handleBackdropClick = (e) => {
  if (e.target.className === "add-card-modal") {
   setAddCard(false);
  }
 };
 const [hotel, setHotel] = useState(null);
 const [room, setRoom] = useState(null);
 const [formData, setFormData] = useState({
  saveCard: false,
  terms: false,
 });

 useEffect(() => {
  const fetchData = async () => {
   try {
    // 호텔 정보 가져오기
    const hotelData = await getHotelDetail(hotelId);
    setHotel(hotelData);

    // 객실 정보 가져오기
    const roomId = searchParams.get("roomId");
    console.log("Room ID from URL:", roomId);

    if (roomId && roomId !== "undefined" && roomId !== "null") {
     const roomData = await getRoomDetail(roomId);
     setRoom(roomData);
    } else {
     console.warn("roomId가 없습니다. 객실 선택 페이지로 이동하세요.");
    }
   } catch (error) {
    console.error("Failed to fetch data:", error);
    // 에러 발생 시 기본 데이터 사용
    setHotel({
     _id: hotelId,
     name: "호텔 정보 로딩 실패",
     address: "-",
     image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    });
   }
  };

  fetchData();
 }, [hotelId, searchParams]);

 const checkIn = searchParams.get("checkIn");
 const checkOut = searchParams.get("checkOut");
 const adults = searchParams.get("adults") || 2;
 const children = searchParams.get("children") || 0;
 const select = searchParams.get("select");

 const calculateNights = () => {
  if (!checkIn || !checkOut) return 0;
  const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 };

 const nights = calculateNights();
 const totalPrice = room ? room.price * nights : 0;
 const serviceFee = Math.floor(totalPrice * 0.1);
 const tax = Math.floor(totalPrice * 0.1);
 const finalTotal = totalPrice + serviceFee + tax;

 const handleInputChange = (e) => {
  const { name, type, checked } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: type === "checkbox" ? checked : e.target.value,
  }));
 };

 const handleSubmit = async () => {
  if (cards.length === 0) {
   alert("결제 수단을 추가해주세요.");
   return;
  }
  // 약관 동의 확인
  if (!formData.terms) {
   alert("이용약관 및 개인정보처리방침에 동의해주세요.");
   return;
  }

  try {
   const roomId = searchParams.get("roomId");

   // roomId 유효성 확인
   if (!roomId) {
    alert("객실 정보가 없습니다. 다시 시도해주세요.");
    return;
   }

   // 예약 데이터 생성 (백엔드 모델 스키마: roomId, hotelId, checkIn, checkOut, guests, totalPrice 필요)
   const reservationData = {
    roomId: roomId,
    hotelId: hotelId,
    checkIn: new Date(checkIn).toISOString(),
    checkOut: new Date(checkOut).toISOString(),
    guests: parseInt(adults) + parseInt(children),
    totalPrice: finalTotal,
   };

   console.log("Creating reservation:", reservationData);

   // 예약 생성 API 호출
   const response = await createReservation(reservationData);

   console.log("Reservation created:", response);

   // 성공 후 완료 페이지로 이동
   navigate(
    `/booking/${hotelId}/complete?${searchParams.toString()}&reservationId=${
     response.data._id
    }`
   );
  } catch (error) {
   console.error("Reservation error:", error);
   alert(
    error.response?.data?.message ||
     "예약 생성에 실패했습니다. 다시 시도해주세요."
   );
  }
 };

 const formatPrice = (price) => {
  return new Intl.NumberFormat("ko-KR").format(price);
 };

 return (
  <div className="booking-payment">
   <div className="booking-content">
    <PaymentContent
     cards={cards}
     handleAddCard={handleAddCard}
     handleDeleteCard={handleDeleteCard}
     addCard={addCard}
     handleBackdropClick={handleBackdropClick}
    />

    <div className="payment-section">
     {/* 약관 동의 섹션 */}
     <div className="section-card terms-section">
      <h3>
       <span className="icon">📋</span>
       약관 동의
      </h3>
      <div className="term-item">
       <input
        type="checkbox"
        id="saveCard"
        name="saveCard"
        required
        checked={formData.saveCard}
        onChange={handleInputChange}
       />
       <label htmlFor="saveCard">
        <div className="term-title">결제수단 안전하게 저장</div>
       </label>
      </div>
      <div className="term-item">
       <input
        type="checkbox"
        id="terms"
        name="terms"
        required
        checked={formData.terms}
        onChange={handleInputChange}
       />
       <label htmlFor="terms">
        <div className="term-title">
         이용약관 및 개인정보처리방침에 동의합니다
        </div>
       </label>
      </div>
     </div>
    </div>

    <div className="payment-summary">
     <h3>예약 요약</h3>

     <div className="booking-details">
      {hotel && (
       <>
        <div className="detail-item">
         <span className="label">호텔명</span>
         <span className="value">{hotel.name}</span>
        </div>
        <div className="detail-item">
         <span className="label">주소</span>
         <span className="value">{hotel.address}</span>
        </div>
       </>
      )}
     </div>

     <div className="booking-details">
      <div className="detail-item">
       <span className="label">체크인</span>
       <span className="value">
        {checkIn ? new Date(checkIn).toLocaleDateString("ko-KR") : "-"}
       </span>
      </div>
      <div className="detail-item">
       <span className="label">체크아웃</span>
       <span className="value">
        {checkOut ? new Date(checkOut).toLocaleDateString("ko-KR") : "-"}
       </span>
      </div>
      <div className="detail-item">
       <span className="label">숙박 기간</span>
       <span className="value">{nights}박</span>
      </div>
      <div className="detail-item">
       <span className="label">투숙객</span>
       <span className="value">
        성인 {adults}명{children > 0 ? `, 어린이 ${children}명` : ""}
       </span>
      </div>
      {room && (
       <div className="detail-item">
        <span className="label">객실</span>
        <span className="value">
         {room.name} ({room.size})
        </span>
       </div>
      )}
     </div>

     <div className="price-breakdown">
      <div className="price-row">
       <span className="label">
        ₩{formatPrice(room?.price || 0)} × {nights}박
       </span>
       <span className="value">₩{formatPrice(totalPrice)}</span>
      </div>
      <div className="price-row">
       <span className="label">서비스 수수료</span>
       <span className="value">₩{formatPrice(serviceFee)}</span>
      </div>
      <div className="price-row">
       <span className="label">세금</span>
       <span className="value">₩{formatPrice(tax)}</span>
      </div>
      <div className="price-row total">
       <span className="label">총 합계</span>
       <span className="value">₩{formatPrice(finalTotal)}</span>
      </div>
     </div>

     <button onClick={handleSubmit} className="btn btn--primary btn--lg">
      ₩{formatPrice(finalTotal)} 결제하기
     </button>

     <div className="payment-secure">
      <span className="icon">🔒</span>
      <span>안전한 결제</span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default BookingStepPayment;
