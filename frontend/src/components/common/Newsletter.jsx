import React from "react";
import "../../styles/components/home/Newsletter.scss";

const Newsletter = () => {
 return (
  <section className="newsletter-section">
   <div className="container">
    <div className="newsletter-content">
     <div className="newsletter-text">
      <h2 className="newsletter-title">
       구독서비스
       <br />
       신청해보세요
      </h2>
      <div className="newsletter-info">
       <h3>The Travel</h3>
       <p>구독발송 조건, 최신 여행문르 받아보세요</p>
      </div>
      <div className="newsletter-form">
       <input
        type="email"
        placeholder="Your email address"
        className="email-input"
       />
       <button className="subscribe-btn">Subscribe</button>
      </div>
     </div>

     <div className="newsletter-graphics">
      <div className="graphic-element graphic-1"></div>
      <div className="graphic-element graphic-2"></div>
      <div className="graphic-element graphic-3"></div>
      <div className="graphic-element graphic-4"></div>
     </div>
    </div>

   </div>
  </section>
 );
};

export default Newsletter;
