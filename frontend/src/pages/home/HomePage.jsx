import React from "react";
import HeroSection from "../../components/home/HeroSection";
import PopularDestinations from "../../components/home/PopularDestinations";
import TravelMore from "../../components/home/TravelMore";
import "../../styles/pages/home/HomePage.scss";
import SearchFilterWrap from "../../components/search/SearchFilterWrap";

const HomePage = () => {
 return (
  <div className="home-page top-container">
   <HeroSection />
   {/* <SearchFilterWrap /> */}
   <PopularDestinations />
   <TravelMore />
  </div>
 );
};

export default HomePage;
