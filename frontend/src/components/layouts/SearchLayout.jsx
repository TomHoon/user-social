import React, { useState, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Header from "../common/Header";
import SearchFilterWrap from "../search/SearchFilterWrap";
import FilterSidebar from "../search/FilterSidebar";
import "../../styles/layouts/SearchLayout.scss";
import { createReservation } from "../../api/reservationClient";

import Footer from "../common/Footer";
const SearchLayout = () => {
 const [searchParams] = useSearchParams();
 const [filters, setFilters] = useState({
  destination: searchParams.get("destination") || "",
  checkIn: searchParams.get("checkIn") || "",
  checkOut: searchParams.get("checkOut") || "",
  guests: searchParams.get("guests") || "2",
  type: searchParams.get("type") || "hotel",
  priceRange: [0, 1000],
  rating: [],
  freebies: [],
  amenities: [],
 });

 useEffect(() => {
  const newFilters = {
   destination: searchParams.get("destination") || "",
   checkIn: searchParams.get("checkIn") || "",
   checkOut: searchParams.get("checkOut") || "",
   guests: searchParams.get("guests") || "2",
   type: searchParams.get("type") || "hotel",
  };
  setFilters((prev) => ({ ...prev, ...newFilters }));
 }, [searchParams]);

 const handleFilterChange = (newFilters) => {
  setFilters((prev) => ({
   ...prev,
   ...newFilters,
  }));
 };
 const handleSubmitReservation = async (reservationData) => {
  try {
   const response = await createReservation(reservationData);
   console.log("Reservation created successfully:", response);
  } catch (error) {
   console.error("Failed to create reservation:", error);
  }
 };

 return (
  <section className="search-layout">
   <Header />
   <div className="search-container">
    <SearchFilterWrap filters={filters} onFilterChange={handleFilterChange} />
    <div className="search-content inner">
     <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
     <main className="search-main">
      <Outlet
       context={{
        filters,
        onFilterChange: handleFilterChange,
        onSubmitReservation: handleSubmitReservation,
       }}
      />
     </main>
    </div>
   </div>
   <Footer />
  </section>
 );
};

export default SearchLayout;
