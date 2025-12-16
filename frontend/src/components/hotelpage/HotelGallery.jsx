import React, { useState } from "react";
import "../../styles/components/hotelpage/HotelGallery.scss";
import HotelGalleryModal from "./HotelGalleryModal";
const HotelGallery = ({ hotelImages, hotelName }) => {
  const [images] = hotelImages;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index = 0) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hotel-gallery">
      <div className="hotel-images">
        <div className="main-image">
          <img
            onClick={() => openModal(0)}
            src={
              hotelImages[0] ||
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
            }
            alt={hotelName}
          />
        </div>
        <div className="sub-images">
          {hotelImages.slice(1, 5).map((img, index) => (
            <div
              key={index}
              className="sub-image"
              onClick={() => openModal(index + 1)}
            >
              <img src={img} alt={`${hotelName} ${index + 2}`} />
              {index === 3 && hotelImages.length > 5 && (
                <div className="view-all-overlay">
                  <span>View all photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <HotelGalleryModal
          images={hotelImages}
          initialIndex={selectedImageIndex}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HotelGallery;
