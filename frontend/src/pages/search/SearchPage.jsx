import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import HotelTypesTabs from "../../components/search/HotelTypesTabs";
import HotelResultsHeader from "../../components/search/HotelResultsHeader";
import HotelListCards from "../../components/search/HotelListCards";
import "../../styles/pages/search/SearchPage.scss";
import { getHotels } from "../../api/hotelClient";

const SearchPage = () => {
 const { filters, onFilterChange } = useOutletContext();
 const [hotels, setHotels] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const fetchHotels = async (filterParams) => {
  try {
   setLoading(true);
   const params = {};
   if (filterParams.destination) params.city = filterParams.destination;
   if (filterParams.guests) params.guests = filterParams.guests;
   if (filterParams.type) params.type = filterParams.type;

  //  console.log("Fetching hotels with params:", params);
   const data = await getHotels(params);
  //  console.log("Fetched hotels data:", data);
  //  console.log("Data type:", typeof data, "Is array:", Array.isArray(data));
   setHotels(data);
  } catch (err) {
   setError(err.message);
   console.error("Failed to fetch hotels:", err);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchHotels(filters);
 }, [filters]);

 if (loading) {
  return <div className="search-page loading">Loading hotels...</div>;
 }

 if (error) {
  return <div className="search-page error">Error: {error}</div>;
 }

 return (
  <div className="search-page">
   <HotelTypesTabs
    activeType={filters.type}
    onTypeChange={(type) => onFilterChange({ type })}
   />
   <HotelResultsHeader
    total={hotels.length}
    showing={hotels.length}
    filters={filters}
    onFilterChange={onFilterChange}
   />
   <HotelListCards hotels={hotels} />
  </div>
 );
};
export default SearchPage;
