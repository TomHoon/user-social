import React from "react";
import "../../styles/components/home/TravelGallery.scss";

const TravelGallery = () => {
 const galleryImages = [
  {
   id: 1,
   image: "/images/travel-1.jpg",
   className: "travel-image-1",
  },
  {
   id: 2,
   image: "/images/travel-2.jpg",
   className: "travel-image-2",
  },
  {
   id: 3,
   image: "/images/travel-3.jpg",
   className: "travel-image-3",
  },
  {
   id: 4,
   image: "/images/travel-4.jpg",
   className: "travel-image-4",
  },
 ];

 return (
  <div className="travel-gallery">
   <div className="gallery-grid">
    {galleryImages.map((item) => (
     <div
      key={item.id}
      className={`gallery-item ${item.className}`}
      style={{ backgroundImage: `url(${item.image})` }}
     >
      <div className="gallery-overlay"></div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default TravelGallery;
