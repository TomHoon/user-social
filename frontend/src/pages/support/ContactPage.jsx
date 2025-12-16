import React, { useState } from "react";
import "../../styles/pages/support/ContactPage.scss";

const ContactPage = () => {
 const [formData, setFormData] = useState({
  category: "예약",
  subject: "",
  email: "",
  message: "",
 });

 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  alert("문의가 접수되었습니다. 24시간 내에 답변 드리겠습니다.");
  console.log("Form submitted:", formData);
 };

 return (
  <div className="contact-page">
   <div className="contact-header">
    <h1>1:1 문의</h1>
    <p>문의 내용을 남겨주시면 24시간 내에 답변 드리겠습니다.</p>
   </div>

   <div className="contact-info">
    <div className="info-item">
     <h3>전화 문의</h3>
     <p>1588-1234</p>
     <span>평일 09:00 - 18:00</span>
    </div>
    <div className="info-item">
     <h3>이메일 문의</h3>
     <p>support@w-hotel.com</p>
     <span>24시간 내 답변</span>
    </div>
    <div className="info-item">
     <h3>카카오톡 채널</h3>
     <p>@w-hotel</p>
     <span>빠른 상담 가능</span>
    </div>
   </div>

   <form className="contact-form" onSubmit={handleSubmit}>
    <div className="form-group">
     <label>문의 유형</label>
     <select name="category" value={formData.category} onChange={handleChange}>
      <option value="예약">예약 관련</option>
      <option value="결제">결제 관련</option>
      <option value="회원">회원 관련</option>
      <option value="호텔">호텔 이용</option>
      <option value="기타">기타</option>
     </select>
    </div>

    <div className="form-group">
     <label>제목</label>
     <input
      type="text"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      placeholder="문의 제목을 입력하세요"
      required
     />
    </div>

    <div className="form-group">
     <label>이메일</label>
     <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="답변 받을 이메일을 입력하세요"
      required
     />
    </div>

    <div className="form-group">
     <label>문의 내용</label>
     <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      placeholder="문의하실 내용을 상세히 작성해주세요"
      rows="8"
      required
     />
    </div>

    <button type="submit" className="submit-btn">
     문의하기
    </button>
   </form>
  </div>
 );
};

export default ContactPage;
