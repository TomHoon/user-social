import React, { useState } from "react";
import "../../styles/pages/support/FaqPage.scss";

const FaqPage = () => {
 const [activeId, setActiveId] = useState(null);

 const faqData = [
  {
   id: 1,
   category: "예약/결제",
   question: "예약 취소는 어떻게 하나요?",
   answer:
    "마이페이지 > 내 예약에서 취소하려는 예약을 선택하고 '취소' 버튼을 클릭하세요. 취소 정책에 따라 취소수수료가 부과될 수 있습니다.",
  },
  {
   id: 2,
   category: "예약/결제",
   question: "결제 방법은 무엇이 있나요?",
   answer:
    "신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이 등)를 지원합니다.",
  },
  {
   id: 3,
   category: "예약/결제",
   question: "예약 변경은 가능한가요?",
   answer:
    "체크인 날짜 변경은 숨32일 전까지 가능합니다. 마이페이지에서 해당 예약을 취소하고 새로 예약해주세요.",
  },
  {
   id: 4,
   category: "호텔 이용",
   question: "체크인 시간은 언제인가요?",
   answer:
    "대부분의 호텔은 오후 3시부터 체크인이 가능하며, 체크아웃은 오전 11시입니다. 호텔마다 다를 수 있으니 예약 시 확인해주세요.",
  },
  {
   id: 5,
   category: "호텔 이용",
   question: "반려동물 동반이 가능한가요?",
   answer:
    '호텔마다 반려동물 정책이 다릅니다. 호텔 상세페이지의 "편의시설" 항목에서 확인하거나 호텔에 직접 문의해주세요.',
  },
  {
   id: 6,
   category: "호텔 이용",
   question: "주차는 무료인가요?",
   answer:
    "호텔마다 주차 정책이 다릅니다. 일부 호텔은 무료 주차를 제공하며, 일부는 유료일 수 있습니다.",
  },
  {
   id: 7,
   category: "회원",
   question: "회원 탈퇴는 어떻게 하나요?",
   answer:
    "마이페이지 > 계정 설정 > 회원탈퇴를 클릭하세요. 탈퇴 시 모든 예약 내역과 포인트가 삭제됩니다.",
  },
  {
   id: 8,
   category: "회원",
   question: "포인트는 어떻게 사용하나요?",
   answer:
    "예약 완료 후 적립된 포인트는 다음 예약 시 결제 금액에서 차감할 수 있습니다. (1포인트 = 1원)",
  },
  {
   id: 9,
   category: "쿠폰/할인",
   question: "쿠폰은 어떻게 사용하나요?",
   answer:
    "결제 페이지에서 보유한 쿠폰을 선택하면 자동으로 할인이 적용됩니다. 쿠폰은 중복 사용이 불가합니다.",
  },
  {
   id: 10,
   category: "쿠폰/할인",
   question: "쿠폰 유효기간은 어떻게 되나요?",
   answer:
    "쿠폰마다 유효기간이 다릅니다. 마이페이지 > 내 쿠폰에서 확인할 수 있습니다.",
  },
 ];

 const categories = [...new Set(faqData.map((item) => item.category))];

 const toggleFaq = (id) => {
  setActiveId(activeId === id ? null : id);
 };

 return (
  <div className="faq-page">
   <div className="faq-header">
    <h1>자주 묻는 질문</h1>
    <p>궁금하신 내용을 빠르게 찾아보세요</p>
   </div>

   <div className="faq-categories">
    {categories.map((category) => (
     <button key={category} className="category-btn">
      {category}
     </button>
    ))}
   </div>

   <div className="faq-list">
    {faqData.map((faq) => (
     <div
      key={faq.id}
      className={`faq-item ${activeId === faq.id ? "active" : ""}`}
     >
      <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
       <span className="category-tag">{faq.category}</span>
       <h3>{faq.question}</h3>
       <span className="toggle-icon">{activeId === faq.id ? "−" : "+"}</span>
      </div>
      {activeId === faq.id && (
       <div className="faq-answer">
        <p>{faq.answer}</p>
       </div>
      )}
     </div>
    ))}
   </div>
  </div>
 );
};

export default FaqPage;
