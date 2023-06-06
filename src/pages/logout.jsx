import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Divider } from "@material-ui/core";
import "./pages.css";
const LogOut = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        {" "}
        <h1>Logout</h1> <Divider  />
        
      </div>
      <Footer />
    </>
  );
};

export default LogOut;
