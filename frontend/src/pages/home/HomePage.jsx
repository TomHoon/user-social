import React, { useContext } from "react";
import HeroSection from "../../components/home/HeroSection";
import PopularDestinations from "../../components/home/PopularDestinations";
import TravelMore from "../../components/home/TravelMore";
import "../../styles/pages/home/HomePage.scss";
import SearchFilterWrap from "../../components/search/SearchFilterWrap";
import { AuthContext } from "../../context/AuthContext";

const HomePage = () => {
 const { user, isAuthed } = useContext(AuthContext);

 return (
  <div className="home-page top-container">
   {isAuthed && user && (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f8ff' }}>
     <h2>환영합니다, {user.name}님! 🎉</h2>
     <p>로그인에 성공하셨습니다.</p>
    </div>
   )}
   <HeroSection />
   {/* <SearchFilterWrap /> */}
   <PopularDestinations />
   <TravelMore />
  </div>
 );
};

export default HomePage;
