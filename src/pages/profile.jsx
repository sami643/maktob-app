import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./pages.css";

const Profile = () => {
  return (
    <>
      <Header />
      <div className="main-container text-right">
        {" "}
        <h1>Profile</h1>{" "}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
  