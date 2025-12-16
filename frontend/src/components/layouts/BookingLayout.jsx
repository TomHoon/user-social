import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
const BookingLayout = () => {
  return (
      <section className="booking-layout">
      <Header  />

      <main>
        <Outlet />
      </main>

      <Footer />
    </section>
  )
}

export default BookingLayout