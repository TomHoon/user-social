import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
const HotelPageLayout = () => {
 return (
  <section className="hotelpage-layout ">
   <Header />

    <main className="mypage-content">
     <Outlet />
    </main>

   <Footer />
  </section>
 );
};

export default HotelPageLayout;
