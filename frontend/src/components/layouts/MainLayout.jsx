import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MainLayout = () => {
  return (
    <section className="main-layout">
      <Header  />

      <main>
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

export default MainLayout;
