import React from "react";
import "./pages.css";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";

const MaktobFormat = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="container maktobviewcontainer mt-5 ">
        <div className="header-part">
          <div className="ml-1 logo_1">
            <img src={Imarat_Logo} alt="" width="100" height="100" />
          </div>
          <div className="mt-4 pashto_header pashto_header-text">
            <img src={ImratName_Pashto} alt="" width="300" height="40" />
            <h3 className="m-0 text-center">د تخنیکي او مسلکي زده کړو اداره</h3>
          </div>

          <div className="px-2 pt-2">
            <h4 className="text-center">
              Islamic Emirate of Afghanistan Technical & Vocational Education
              Training Authority
            </h4>
          </div>

          <div className="mt-4 pashto_header">
            <img src={ImratName} alt="" width="300" height="40" />
            <h3 className="m-0 text-center  persian_header-text">
              اداره تعلیمات تخنیکی و مسلکی
            </h3>
          </div>

          <div className="mr-1 logo_2">
            <img src={Logo} alt="" width="100" height="100" />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <button onClick={handlePrint} className="print-button btn bg-primary">
          Print
        </button>
      </div>
    </>
  );
};

export default MaktobFormat;
