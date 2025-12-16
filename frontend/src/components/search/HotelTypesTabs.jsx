import React from "react";
import "../../styles/components/search/HotelTypesTabs.scss";

const HotelTypesTabs = ({ activeType = "hotel", onTypeChange }) => {
 const tabs = [
  { id: "hotel", label: "Hotels", count: 257 },
  { id: "motel", label: "Motels", count: 51 },
  { id: "resort", label: "Resorts", count: 72 },
 ];

 return (
  <div className="hotel-types-tabs">
   {tabs.map((tab) => (
    <button
     key={tab.id}
     className={`tab-item ${activeType === tab.id ? "active" : ""}`}
     onClick={() => onTypeChange(tab.id)}
    >
     <span className="tab-label">{tab.label}</span>
     <span className="tab-count">{tab.count} places</span>
    </button>
   ))}
  </div>
 );
};

export default HotelTypesTabs;
