import React from "react";
import "./pages.css";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";
import { Checkbox, Divider } from "antd";

const MaktobFormat = () => {
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
          </div>
          <div className="date">
            <label htmlFor="">ڼیټه:</label>
            <p> &#160;12 &#160;/ 12 / 1444</p>
          </div>
          <div className="maktob_type_div">
            <div className="maktob_no">
              <label>ګڼه:</label>
              <p>12</p>
            </div>
            <div className="maktob_type">
              <div>
                <label className="mx-1">عاجل</label>
                <Checkbox defaultChecked={false} disabled className="ml-3" />
              </div>
              <div>
                <label className="mx-1">محرم</label>
                <Checkbox defaultChecked={false} disabled className="ml-3" />
              </div>
              <div>
                <label className="mx-1">اطلاعیه</label>
                <Checkbox indeterminate disabled className="ml-3" />
              </div>
              <div>
                <label className="mx-1">سایر موارد</label>
                <Checkbox defaultChecked={false} disabled className="ml-3" />
              </div>
            </div>
          </div>

          <div className="divider">
            <Divider />
          </div>
          <div className="body_of_maktob">
            <p>به مقام محترم ریاست دفتر!</p>
            <p>السلام اعلیکم و رحمته الله و برکاته</p>
            <div className="subject_of_maktob">
              <label style={{ fontStyle: "u" }}> موضوع:</label>
              <p>به جواب مکتوب شماره 128 معینیت عواید و گمراکات</p>
            </div>
            <p>محترما:</p>
            <p className="matktob_context">
              به تعقیب مکاتیب شماره 786 مورخ 18/9/1444 و شماره 853 مورخ
              23/10/1444 نگاشته میشود که جهت تطبیق پلان مالی 1402 و عملی کردن
              طرح های دیجیتل سازی از تمام ریاست های محترم اداره تعلیمات تخنیکی و
              مسلکی تقاضا به عمل میاید که طرح های دیجیتل سازی خود را تا اخیر برج
              اول سال روان به آمریت سیستم معلوماتی و احصائیه تحویل نماید. در غیر
              آن مسؤلیت عملی نشدن طرح دیجیتلی شان بدوش خود ریاست ها میباشد.
            </p>
            <br />
            <div className="closing_signature">
              <p>والسلام</p>
              <p>انجنیر شریف احمد راسخ</p>
              <p>آمر سیستم های معلوماتی و احصایه</p>
            </div>
          </div>
          <div className="copy_to_div ">
            <p className="copy_to_title">کاپي به:</p>
            <div className="copy_to_body">
              <div className="copy_body_item">
                <p>ریاست حسابی ومالی</p>
                <p>ریاست منابع بشری</p>
                <p>ریاست دعوت و ارشاد</p>
                <p>ریاست تدارکات</p>
                <p>ریاست حسابی ومالی</p>
                <p>ریاست منابع بشری</p>
                <p>ریاست دعوت و ارشاد</p>
                <p>ریاست تدارکات</p>
              </div>
              <div className="copy_body_item">
                <p>ریاست حسابی ومالی</p>
                <p>ریاست منابع بشری</p>
                <p>ریاست دعوت و ارشاد</p>
                <p>ریاست تدارکات</p>
                <p>ریاست حسابی ومالی</p>
                <p>ریاست منابع بشری</p>
                <p>ریاست دعوت و ارشاد</p>
                <p>ریاست تدارکات</p>
              </div>
              <div className="copy_body_item">
                <p>ریاست حسابی ومالی</p>
                <p>ریاست منابع بشری</p>
                <p>ریاست دعوت و ارشاد</p>
                <p>ریاست تدارکات</p>
                <p>ریاست حسابی ومالی</p>
                <p>ریاست منابع بشری</p>
                <p>ریاست دعوت و ارشاد</p>
                <p>ریاست تدارکات</p>
              </div>
            </div>
          </div>

          <Divider className="footer_divider" />

          <div className="footer">
            <div className="footer-content">
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

export default MaktobFormat;
