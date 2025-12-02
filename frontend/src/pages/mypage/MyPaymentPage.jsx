import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyProfile from "../../components/mypage/MyProfile";
import "../../styles/pages/mypage/MyPaymentPage.scss";
import PaymentContent from "../../components/payment/PaymentContent";
import PaymentForm from "../../components/payment/PaymentForm";
const MyPaymentPage = () => {
 const navigate = useNavigate();

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

 return (
  <div className="payment-page">
   <PaymentContent
    cards={cards}
    handleAddCard={handleAddCard}
    handleDeleteCard={handleDeleteCard}
    addCard={addCard}
    handleBackdropClick={handleBackdropClick}
   />

   <div className="subscription-section">
    <div className="subscription-content">
     <div className="subscription-text">
      <h3 className="subscription-title">구독서비스</h3>
      <p className="subscription-subtitle">신청해보세요</p>
      <div className="subscription-description">
       <p className="description-title">The Travel</p>
       <p className="description-text">구독하고 포르투 워터프론트 멋진리세요</p>
      </div>
      <div className="subscription-form">
       <input
        type="email"
        placeholder="Your email address"
        className="email-input"
       />
       <button className="subscribe-button">Subscribe</button>
      </div>
     </div>
     <div className="subscription-image">
      <div className="image-placeholder"></div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MyPaymentPage;
