import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
const PageNotFound = () => {
  return (
    <Sidebar>
      <Header />
      <div className=" main-container ">
        <div className=" text-center pt-5 mt-5">
          <h1>404</h1>
          <h3>یاده پاڼه شتون نه لري/ صفحه قابل درسترس نیست</h3>
        </div>
      </div>
      <Footer />
    </Sidebar>
  );
};
export default PageNotFound;
