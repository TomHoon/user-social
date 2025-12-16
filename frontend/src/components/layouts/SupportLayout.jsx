import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
const SupportLayout = () => {
  return (
       <section className="support-layout">
      <Header  />

      <main>
        <Outlet />
      </main>

      <Footer />
    </section>
  )
}

export default SupportLayout