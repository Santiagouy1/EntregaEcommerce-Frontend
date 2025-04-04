import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Header />

      <main className="mainContent">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Main;
