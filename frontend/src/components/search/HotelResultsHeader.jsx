import React, { useState } from "react";
import "../../styles/components/search/HotelResultsHeader.scss";

const HotelResultsHeader = ({ total, showing, filters, onFilterChange }) => {
 const [sortBy, setSortBy] = useState("recommended");

 const handleSortChange = (value) => {
  setSortBy(value);
  if (onFilterChange) {
   onFilterChange({ sortBy: value });
  }
 };

 return (
  <div className="hotel-results-header">
   <div className="results-info">
    Showing <strong>{showing}</strong> of{" "}
    <strong className="total">{total} places</strong>
   </div>
   <div className="sort-dropdown">
    <label>Sort by</label>
    <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
     <option value="recommended">Recommended</option>
     <option value="price-low">Price: Low to High</option>
     <option value="price-high">Price: High to Low</option>
     <option value="rating">Rating</option>
    </select>
   </div>
  </div>
 );
};

export default HotelResultsHeader;
