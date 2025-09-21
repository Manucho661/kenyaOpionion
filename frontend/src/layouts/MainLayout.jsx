import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
