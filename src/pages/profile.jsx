import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";

import "./pages.css";

const Profile = () => {
  return (
    <Sidebar>
      <Header />
      <div className="main-container text-right">
        {" "}
        <h1>Profile</h1>{" "}
      </div>
      <Footer />
    </Sidebar>
  );
};

export default Profile;
