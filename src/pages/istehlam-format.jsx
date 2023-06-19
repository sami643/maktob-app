import React from "react";
import "./pages.css";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";
import { useLocation } from "react-router-dom";
import { Checkbox, Divider } from "antd";
const PishnihadFormat = () => {
  const { state } = useLocation();
  const formData = state?.formData;
  console.log("FromIstehlaam_View_format", formData);

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="main_container ">
        <div className="contain maktobviewcontainer mt-5 p-0 " dir="rtl">
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
                Islamic Imarat of Afghanistan Technical & Vocational Education
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
            <div>معاونیت امور تعلیمی و تحصیلی</div>
          </div>
          <div className="pishnihad_date">
            <label htmlFor="">ڼیټه:</label>
            <p> &#160;{formData.istehlaamDate}</p>
          </div>
          <div className="maktob_type_div">
            <div className="maktob_no">
              <label>ګڼه:</label>
              <p>{formData.istehlaamNo}</p>
            </div>
          </div>

          <Divider className="divider" />

          <div className="pishnihad_body_main_div">
            <div className="pishnihad_body">
              <div className="header_of_pishnihad">
                <h3 className="header_of_pishnihad_text">استعلام</h3>
              </div>
              <div className="pishnihad_body_div mx-2">
                <p className="audiance">{formData.recipent}</p>
                <p className="greating">
                  ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ ً{" "}
                </p>
                <div className="subject_of_maktob">
                  <label style={{ textDecoration: "underline" }}> موضوع:</label>
                  <p>{formData.subject}</p>
                </div>
                <br />
                <p>محترما:</p>
                <p className="matktob_context">{formData.context}</p>
                <br />
                <div className="closing_signature">
                  <p>والسلام</p>
                  <p>انجنیر شریف احمد راسخ</p>
                  <p>آمر سیستم های معلوماتی و احصایه</p>
                </div>
              </div>
            </div>
            <div className="ahkaam_div">
              <div className="ahkaam_header">
                <h3 className="ahkaam_header_text">جواب</h3>
              </div>
            </div>
          </div>
          <Divider className="footer_divider_pishnihad" />
          <div className="footer_pishnihad">
            <div className="footer-content_pishnihad">
              <div className="footer-item">
                آدرس: کارته چهار، جوار وزارت تحصیلات عالی- کابل- افغانستان
              </div>
              <div className="footer-item">Email: mis_it@tveta.gov</div>
              <div className="footer-item">Tel: + 93794465693</div>
            </div>
          </div>
        </div>

        <div className="container print_btn_div ">
          <button
            onClick={handlePrint}
            className="print-button btn bg-primary px-5"
          >
            Print
          </button>
        </div>
      </div>
    </>
  );
};

export default PishnihadFormat;
