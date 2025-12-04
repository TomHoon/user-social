import React, { useState } from "react";
import {
  FaAngleUp,
  FaUser,
  FaHome,
  FaPaperPlane,
  FaComment,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/components/floatingBanner/FloatingBanner.scss";

const FloatingBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`floating-container ${isOpen ? "open" : ""}`}>
      <div className="floating-button" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className="menu-items">
        <button
          className="menu-item"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="맨 위로"
        >
          <FaAngleUp />
        </button>
        <button
          className="menu-item"
          onClick={() => navigate("/mypage")}
          aria-label="마이페이지"
        >
          <FaUser />
        </button>
        <button
          className="menu-item"
          onClick={() => navigate("/")}
          aria-label="홈"
        >
          <FaHome />
        </button>
        <button
          className="menu-item"
          onClick={() => navigate("/support")}
          aria-label="고객센터"
        >
          <FaPaperPlane />
        </button>
        <button
          className="menu-item"
          onClick={() => navigate("/support")}
          aria-label="문의하기"
        >
          <FaComment />
        </button>
      </div>
    </div>
  );
};

export default FloatingBanner;
