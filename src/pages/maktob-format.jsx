import React from "react";
import "./pages.css";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";
import { Checkbox, Divider } from "antd";
import { useLocation } from "react-router-dom";
import { BorderInnerOutlined } from "@ant-design/icons";

const MaktobFormat = () => {
  const { state } = useLocation();
  const formData = state?.formData;
  const copyTo = state?.copyTo;
  console.log("FormData_from_MaktobFormat", formData);
  console.log("ListOfPresidenciesPrintedFrom_maktobFOrmat", copyTo);

  copyTo.sort((a, b) => a.value - b.value);
  const copyToRecipents = copyTo.map((obj) => obj.label);

  console.log("copyToRecipentsJustLabel", copyToRecipents);
  console.log("copyToRecipentsJustLabelWithValue", copyTo);

  const handlePrint = () => {
    window.print();
  };

  let arrayA = [];
  let arrayB = [];
  let arrayC = [];
  let counter = 0;
  let counter_1 = 0;
  let isDeputOrAdvisoryChecked = false;

  for (let i = 0; i < copyTo.length; i++) {
    if (
      copyTo[i] === "معاونیت محترم امور تخنیکی و مسلکی" ||
      copyTo[i] === "مشاوریت محترم تخنیکی" ||
      copyTo[i] === "مشاوریت محترم حقوقی"
    ) {
      isDeputOrAdvisoryChecked = true;

      counter = 1;
      for (let j = i; j < copyTo.length; j++) {
        if (
          copyTo[j] === "مشاوریت محترم تخنیکی" ||
          copyTo[j] === "مشاوریت محترم حقوقی"
        ) {
          counter_1 = 1;
          for (let k = j; k <= copyTo.length; k++) {
            arrayC.push(copyTo[k]);
          }
        }
        if (counter_1 == 0) {
          arrayB.push(copyTo[j]);
        }
      }
    } else if (counter == 0) {
      arrayA.push(copyTo[i]);
    }
  }

  // Limit the length of arrayA and arrayB to a maximum of 8 elements
  // arrayA = arrayA.slice(0, 8);
  // arrayB = arrayB.slice(0, 8);
  // console.log("ArrayC", arrayC);
  // console.log("ArrayB", arrayB);
  return (
    <>
      <div className="main_container ">
        <div className="contain maktobviewcontainer mt-5 p-0 " dir="rtl">
          <div className="header-body ">
            <div className=" m-0 tvet_logo ">
              <img src={Imarat_Logo} alt="" min-width="120" height="100" />
            </div>
            <div className="mt-4 pashto_headling_div">
              <img src={ImratName_Pashto} className="pashto_headling_img" />
              <h4 className="m-0 text-right  pashto_headline_text">
                د تخنیکي او مسلکي زده کړو اداره
              </h4>
            </div>

            <div className=" pt-4 english_headline_div">
              <h4 className=" text-center m-0 english_headline_text">
                Islamic Imarat of Afghanistan Technical & Vocational Education
                Training Authority
              </h4>
            </div>

            <div className="mt-4  persian_headline_div">
              <img src={ImratName} className="persian_headline_img" />
              <h4 className="m-0  persian_headline_text">
                اداره تعلیمات تخنیکی و مسلکی
              </h4>
            </div>

            <div className="imarat_logo mr-3">
              <img src={Logo} alt="" min-width="120" height="100" />
            </div>
          </div>
          <div className="owner">
            <div>معاونیت امور تعلیمی و تحصیلی</div>
            <div>ریاست نصاب تعلیمی و تحصیلی</div>
            <div>آمریت تحلیل و ارزیابی</div>
            <div>مدیریت اجراینه</div>
            <div>مدیریت اجراینه</div>
          </div>
          <div className="date">
            <label htmlFor="">ڼیټه:</label>
            <p> &#160;{formData.maktobDate ? formData.maktobDate : ""}</p>
          </div>

          <div className="maktob_type_div">
            <div className="maktob_type_content">
              <div className="maktob_no">
                <label>ګڼه:</label>
                <p>{formData.maktobNo}</p>
              </div>
              <div className="maktob_type">
                <div>
                  <label className="mx-1">عاجل</label>
                  <Checkbox defaultChecked={false} disabled className="ml-3" />
                </div>
                <div>
                  <label className="mx-1">محرم</label>
                  <Checkbox defaultChecked={false} className="ml-3" />
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
          </div>

          <Divider className="divider" />
          <div className="body_of_maktob ">
            <p className="audiance">{formData.recipent}</p>
            <p className="greating">
              ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ ً{" "}
            </p>
            <div className="subject_of_maktob">
              <label> موضوع </label>
              <p>:&#160;&#160; {formData.subject} </p>
            </div>
            <p>محترما:</p>
            <p className="matktob_context">{formData.context}</p>
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
              {/* {isDeputOrAdvisoryChecked ? (
                <>
                  <div className="copy_body_item">
                    {arrayA.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                  {arrayB.length > 0 ? (
                    <div className="copy_body_item">
                      {arrayB.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="copy_body_item">
                      {arrayC.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  )}
                  {arrayB.length > 0 ? (
                    <div className="copy_body_item">
                      {arrayC.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {" "}
                  <div className="copy_body_item">
                    {copyTo.slice(0, 8).map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                  <div className="copy_body_item">
                    {copyTo.slice(8, 16).map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                  <div className="copy_body_item">
                    {copyTo.slice(16, 24).map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </>
              )} */}

              {/* 
              <div className="copy_body_item">
                {copyTo
                  .slice(
                    0,
                    copyTo.findIndex(
                      (item) => item === "معاونیت محترم امور تخنیکی و مسلکی"
                    )
                  )
                  .map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </div>
              <div className="copy_body_item">
                {copyTo
                  .slice(
                    copyTo.findIndex(
                      (item) => item === "معاونیت محترم امور تخنیکی و مسلکی"
                    ),
                    copyTo.findIndex((item) => item === "مشاوریت محترم تخنیکی")
                  )
                  .map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </div>
              <div className="copy_body_item">
                {copyTo
                  .slice(
                    copyTo.findIndex((item) => item === "مشاوریت محترم تخنیکی"),
                    24
                  )
                  .map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </div> */}
            </div>
          </div>

          <Divider className="footer_divider" />
          <div className="footer">
            <div className="footer-content_maktob">
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
