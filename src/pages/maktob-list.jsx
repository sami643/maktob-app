import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./pages.css";
const MaktobList = () => {
  return (
    <>
      <Header />
      <div className="main-container text-right">
        {" "}
        <h1>د مکتوبونو لست</h1>{" "}
      </div>
      <Footer />
    </>
  );
};

export default MaktobList;
