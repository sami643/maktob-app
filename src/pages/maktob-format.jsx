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
  const copyTo = state?.checkedPresidencies;
  const newPresidencies = state?.newpresidencies;
  console.log("FormData_from_MaktobFormat", formData);

  copyTo.sort((a, b) => a.value - b.value);
  const copyToRecipentsJustLabel = copyTo.map((obj) => obj.label);
  const listOfpresidenciesJustValue = copyTo.map((obj) => obj.value);

  const copyToRecipentsJustLabel_1 =
    copyToRecipentsJustLabel.concat(newPresidencies);

  console.log("listOfpresidenciesJustValue", listOfpresidenciesJustValue);
  console.log("listOfpresidenciesBothValueAndLabels", copyTo);
  console.log("copyToRecipentsJustLabel", copyToRecipentsJustLabel_1);

  const handlePrint = () => {
    window.print();
  };

  let arrayA = [];
  let arrayB = [];
  let arrayC = [];
  let counter = 0;
  let counter_1 = 0;
  let counter_2 = 0;
  let isDeputOrAdvisoryChecked = false;

  for (let i = 0; i < copyToRecipentsJustLabel_1.length; i++) {
    if (
      listOfpresidenciesJustValue[i] === 9 ||
      listOfpresidenciesJustValue[i] === 10 ||
      listOfpresidenciesJustValue[i] === 11 ||
      listOfpresidenciesJustValue[i] === 12 ||
      listOfpresidenciesJustValue[i] === 12 ||
      listOfpresidenciesJustValue[i] === 13 ||
      listOfpresidenciesJustValue[i] === 14 ||
      listOfpresidenciesJustValue[i] === 15 ||
      listOfpresidenciesJustValue[i] === 16 ||
      listOfpresidenciesJustValue[i] === 17
    ) {
      // this works when one of the condition become true
      isDeputOrAdvisoryChecked = true;
      counter = 1;

      for (let j = i; j < copyToRecipentsJustLabel_1.length; j++) {
        if (
          listOfpresidenciesJustValue[j] === 16 ||
          listOfpresidenciesJustValue[j] === 17 ||
          listOfpresidenciesJustValue[j] === 19 ||
          listOfpresidenciesJustValue[j] === 19
        ) {
          counter_1 = 1;
          for (let k = j; k <= copyToRecipentsJustLabel_1.length; k++) {
            if (counter_2 === 0 && arrayB.length <= 0) {
              for (let m = k; m <= copyToRecipentsJustLabel_1.length; m++) {
                arrayB.push(copyToRecipentsJustLabel_1[m]);
              }
              counter_2 = 1;
            } else if (counter_2 === 0) {
              arrayC.push(copyToRecipentsJustLabel_1[k]);
            }
          }
          counter_2 = 1;
        }
        // This works Until the value become 16 or 17
        if (counter_1 == 0) {
          arrayB.push(copyToRecipentsJustLabel_1[j]);
        }
      }
    }
    // This works Until the value become 9,16,or 17
    else if (counter == 0) {
      arrayA.push(copyToRecipentsJustLabel_1[i]);
    }
  }

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
              {isDeputOrAdvisoryChecked ? (
                <>
                  <div className="copy_body_item">
                    {arrayA.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                  <div className="copy_body_item">
                    {arrayB.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>

                  <div className="copy_body_item">
                    {arrayC.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="copy_body_item">
                    {copyToRecipentsJustLabel_1
                      .slice(0, 8)
                      .map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                  </div>
                  <div className="copy_body_item">
                    {copyToRecipentsJustLabel_1
                      .slice(8, 16)
                      .map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                  </div>
                  <div className="copy_body_item">
                    {copyToRecipentsJustLabel_1
                      .slice(16, 24)
                      .map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                  </div>
                </>
              )}
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
