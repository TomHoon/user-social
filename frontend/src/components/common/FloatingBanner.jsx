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

const FloatingBanner = () => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleMenu = () => {
  setIsOpen(!isOpen);
 };

 return (
  <div className={`floating-container ${isOpen ? "open" : ""}`}>
   <div className="floating-button" onClick={toggleMenu}>
    {isOpen ? <FaTimes /> : <FaBars />}
   </div>
   <div className="menu-items">
    <a href="#" className="menu-item">
     <FaAngleUp />
    </a>
    <a href="#" className="menu-item">
     <FaUser />
    </a>
    <a href="#" className="menu-item">
     <FaHome />
    </a>
    <a href="#" className="menu-item">
     <FaPaperPlane />
    </a>
    <a href="#" className="menu-item">
     <FaComment />
    </a>
   </div>
  </div>
 );
};

export default FloatingBanner;
