import React, { useState, useEffect } from "react";
import "../../styles/components/search/FilterSidebar.scss";

const FilterSidebar = ({ filters, onFilterChange }) => {
 const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 1000]);

 useEffect(() => {
  setPriceRange(filters.priceRange || [0, 1000]);
 }, [filters.priceRange]);

 return (
  <aside className="filter-sidebar">
   <h3 className="filter-title">Filters</h3>

   {/* Price Range */}
   <div className="filter-section">
    <h4 className="section-title">Price</h4>
    <input
     type="range"
     min="0"
     max="1000"
     value={priceRange[1]}
     onChange={(e) => {
      const newRange = [0, Number(e.target.value)];
      setPriceRange(newRange);
      onFilterChange({ priceRange: newRange });
     }}
    />
    <div className="price-display">
     {priceRange[0]} - ${priceRange[1]}원
    </div>
   </div>

   {/* Rating */}
   <div className="filter-section">
    <h4 className="section-title">Rating</h4>
    {[5, 4, 3, 2, 1].map((rating) => (
     <label key={rating} className="filter-checkbox">
      <input
       type="checkbox"
       checked={filters.rating.includes(rating)}
       onChange={(e) => {
        const newRating = e.target.checked
         ? [...filters.rating, rating]
         : filters.rating.filter((r) => r !== rating);
        onFilterChange({ rating: newRating });
       }}
      />
      <span>{rating}+</span>
     </label>
    ))}
   </div>

   {/* Freebies */}
   <div className="filter-section">
    <h4 className="section-title">Freebies</h4>
    {["무료조식", "무료주차", "WiFi", "고객센터24", "무료픽업"].map(
     (freebie) => (
      <label key={freebie} className="filter-checkbox">
       <input
        type="checkbox"
        checked={filters.freebies.includes(freebie)}
        onChange={(e) => {
         const newFreebies = e.target.checked
          ? [...filters.freebies, freebie]
          : filters.freebies.filter((f) => f !== freebie);
         onFilterChange({ freebies: newFreebies });
        }}
       />
       <span>{freebie}</span>
      </label>
     )
    )}
   </div>

   {/* Amenities */}
   <div className="filter-section">
    <h4 className="section-title">Amenities</h4>
    {["24시 프론트데스크", "에어컨", "피트니스", "수영장"].map((amenity) => (
     <label key={amenity} className="filter-checkbox">
      <input
       type="checkbox"
       value={amenity}
       checked={filters.amenities.includes(amenity)}
       onChange={(e) => {
        const newAmenities = e.target.checked
         ? [...filters.amenities, amenity]
         : filters.amenities.filter((a) => a !== amenity);
        onFilterChange({ amenities: newAmenities });
       }}
      />
      <span>{amenity}</span>
     </label>
    ))}
   </div>
  </aside>
 );
};

export default FilterSidebar;
