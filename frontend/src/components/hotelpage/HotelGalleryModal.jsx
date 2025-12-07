import React, { useState } from "react";
import "../../styles/components/hotelpage/HotelGalleryModal.scss";
const HotelGalleryModal = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          {/* 메인 이미지 영역 */}
          <div className="main-image-container">
            <button className="nav-button prev" onClick={handlePrevious}>
              ‹
            </button>
            <div className="main-image">
              <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
              />
              <div className="image-counter">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
            <button className="nav-button next" onClick={handleNext}>
              ›
            </button>
          </div>

          {/* 썸네일 목록 */}
          <div className="thumbnail-list">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelGalleryModal;
