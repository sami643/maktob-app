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
      <div className="contain maktobviewcontainer mt-5 p-0 ">
        <div className="header-body ">
          <div className=" m-0 tvet_logo ">
            <img src={Imarat_Logo} alt="" min-width="120" height="100" />
          </div>
          <div className="mt-4 pashto_headling_div">
            <img
              src={ImratName_Pashto}
              min-width="300"
              className="pashto_headling_img"
              height="40"
            />
            <h3 className="m-0 text-right  pashto_headline_text">
              د تخنیکي او مسلکي زده کړو اداره
            </h3>
          </div>

          <div className=" pt-4 english_headline_div">
            <h4 className=" text-center m-0 english_headline_text">
              Islamic Republic of Afghanistan Technical & Vocational Education
              Training Authority
            </h4>
          </div>

          <div className="mt-4  persian_headline_div">
            <img
              src={ImratName}
              min-width="300"
              height="40"
              className="persian_headline_img"
            />
            <h3 className="m-0  persian_headline_text">
              اداره تعلیمات تخنیکی و مسلکی
            </h3>
          </div>

          <div className="imarat_logo">
            <img src={Logo} alt="" min-width="120" height="100" />
          </div>
        </div>
        <div className="owner">
          <div>معاونیت امور تعلیمی و تحصیلی</div>
          <div>ریاست نصاب تعلیمی و تحصیلی</div>
          <div>آمریت تحلیل و ارزیابی</div>
          <div>مدیریت اجراینه</div>
        </div>
        <div className="date">
          <label htmlFor="">ڼیټه:</label>
          <p> &#160;1444/12/12</p>
        </div>
      </div>
      <div className="container text-center mt-5">
        <button
          onClick={handlePrint}
          className="print-button btn bg-primary px-5"
        >
          Print
        </button>
      </div>
    </>
  );
};

export default MaktobFormat;
