import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
import { Checkbox, Divider } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import { presidencies } from "./../assets/data/data.js";
import { pishnihaadValidationSchema } from "./../assets/data/validation.js";
import "./pages.css";
import { useNavigate } from "react-router-dom";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";
import axios from "axios";

const Pishnihad = () => {
  const [btnChecked, setBtnChecked] = useState(false);
  const [initialValues, setInitialValues] = useState("");
  const [isFormState, setIsFromState] = useState(true);
  const [formData, setFormData] = useState("");
  const onSubmitForm_1 = (values) => {
    console.log("values", values);
    setFormData(values);
    setIsFromState(false);
    setInitialValues(values);
  };
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));
  console.log("Decoded values", userData);

  const handlePrint = () => {
    window.print();
  };

  // Retrieving data from the LocalStorage

  const onStoreData = () => {
    axios
      .post("/api/pishnihad/new-pishnihad", {
        data: {
          pishnihadNo: formData.pishnihadNo,
          pishnihadDate: formData.pishnihadDate,
          recipent: formData.recipent,
          subject: formData.subject,
          context: formData.context,
          userId: userData.userId,
          presidencyName: userData.presidencyName,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
      })
      .catch((err) => {
        console.log("ErrorMessage", err.response.data.message);
      });
  };
  return (
    <Sidebar>
      {isFormState ? (
        <>
          <Header />
          <div className="main-container text-right">
            <h1 className="container-header">پیشنهاد</h1>
            <Divider />
            <Formik
              initialValues={{
                pishnihadNo: initialValues.pishnihadNo,
                pishnihadDate: initialValues.pishnihadDate,
                subject: initialValues.subject,
                context: initialValues.context,
                recipent: initialValues.recipent,
              }}
              onSubmit={onSubmitForm_1}
              validationSchema={pishnihaadValidationSchema}
            >
              {({
                values,
                setFieldValue,
                setFieldTouched,
                touched,
                errors,
              }) => (
                <Form className="m-5">
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label mr-3" htmlFor="maktobNo">
                          د پیشنهاد ګڼه/شماره
                          <span
                            style={{
                              color: "red",
                              marginInline: "5px",
                              paddingTop: "5px",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          id="pishnihadNo"
                          name="pishnihadNo"
                          className={`form-control ${
                            errors.pishnihadNo && touched.pishnihadNo
                              ? "is-invalid"
                              : ""
                          }`}
                          value={values.pishnihadNo}
                          onChange={(e) =>
                            setFieldValue("pishnihadNo", e.target.value)
                          }
                          onBlur={() => setFieldTouched("pishnihadNo", true)}
                        />
                        {errors.pishnihadNo && touched.pishnihadNo ? (
                          <div className="invalid-feedback d-block errorMessageStyle mr-2">
                            {errors.pishnihadNo}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label mr-3" htmlFor="maktobDate">
                          نیټه/تاریخ
                          <span
                            style={{
                              color: "red",
                              marginInline: "5px",
                              paddingTop: "5px",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <br />
                        <DatePicker
                          style={{
                            width: "inherit",
                            padding: "16px",
                            marginTop: "-1px",
                            border: `${
                              errors.pishnihadDate && touched.pishnihadDate
                                ? "1px solid red"
                                : ""
                            }`,
                          }}
                          calendar={arabic}
                          locale={arabic_ar}
                          id="pishnihadDate"
                          name="pishnihadDate"
                          value={values.pishnihadDate}
                          onChange={(e) =>
                            setFieldValue(
                              "pishnihadDate",
                              e.year + "/" + e.month.number + "/" + e.day
                            )
                          }
                        />
                        {errors.pishnihadDate && touched.pishnihadDate ? (
                          <div className="invalid-feedback d-block errorMessageStyle mr-2">
                            {errors.pishnihadDate}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="row ">
                    {!btnChecked ? (
                      <div className="form-outline col">
                        <label className="form-label mr-3" htmlFor="subject">
                          مخاطب
                          <span
                            style={{
                              color: "red",
                              marginInline: "5px",
                              paddingTop: "5px",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <select
                          id="recipent"
                          value={values.recipent}
                          name="recipent"
                          style={{ height: "35px" }}
                          onChange={(e) =>
                            setFieldValue("recipent", e.target.value)
                          }
                          className={`form-control form-select-lg ${
                            errors.recipent && touched.recipent
                              ? "is-invalid form-select-lg    "
                              : ""
                          }`}
                          aria-label=".form-select-lg example"
                        >
                          <option selected>Open this select menu</option>
                          <option value="نصاب">ریاست نصاب</option>
                          <option value="بشری">ریاست منابع بشری</option>
                          <option value="پلان">ریاست پلان</option>
                        </select>
                        {errors.recipent && touched.recipent ? (
                          <div className="invalid-feedback  errorMessageStyle mr-2 mb-3 mt-0">
                            {errors.recipent}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="form-outline  col">
                        <label className="form-label mr-3" htmlFor="subject">
                          مخاطب
                          <span
                            style={{
                              color: "red",
                              marginInline: "5px",
                              paddingTop: "5px",
                            }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          id="recipent"
                          name="recipent"
                          className={`form-control form-select-lg ${
                            errors.recipent && touched.recipent
                              ? "is-invalid form-select-lg    "
                              : ""
                          }`}
                          value={values.recipent}
                          onChange={(e) =>
                            setFieldValue("recipent", e.target.value)
                          }
                          onBlur={() => setFieldTouched("recipent", true)}
                        />
                        {errors.recipent && touched.recipent ? (
                          <div className="invalid-feedback d-block errorMessageStyle mr-2">
                            {errors.recipent}
                          </div>
                        ) : null}
                      </div>
                    )}

                    <div className="form-outline mb-4 col">
                      <label className="form-label mr-3" htmlFor="subject">
                        موضوع
                        <span
                          style={{
                            color: "red",
                            marginInline: "5px",
                            paddingTop: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className={`form-control ${
                          errors.subject && touched.subject ? "is-invalid" : ""
                        }`}
                        value={values.subject}
                        onChange={(e) =>
                          setFieldValue("subject", e.target.value)
                        }
                        onBlur={() => setFieldTouched("subject", true)}
                      />
                      {errors.subject && touched.subject ? (
                        <div className="invalid-feedback d-block errorMessageStyle mr-2">
                          {errors.subject}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div class="form-check ">
                    <div style={{ marginTop: "-12px", marginRight: "4px" }}>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckIndeterminate"
                        onChange={(e) => setBtnChecked(e.target.checked)}
                      />
                    </div>
                    <label
                      class="form-check-label"
                      for="flexCheckIndeterminate"
                      style={{ marginInline: "24px", fontSize: "11px" }}
                    >
                      په لست کې شتون نه لري؟
                    </label>
                  </div>

                  <div className="form-outline mb-4 mt-5">
                    <label className="form-label mr-3" htmlFor="context">
                      متن
                      <span
                        style={{
                          color: "red",
                          marginInline: "5px",
                          paddingTop: "5px",
                        }}
                      >
                        *
                      </span>
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.context && touched.context ? "is-invalid" : ""
                      }`}
                      id="context"
                      name="context"
                      rows="4"
                      value={values.context}
                      onChange={(e) => setFieldValue("context", e.target.value)}
                      onBlur={() => setFieldTouched("context", true)}
                    ></textarea>
                    {errors.context && touched.context ? (
                      <div
                        className="invalid-feedback d-block errorMessageStyle mr-2"
                        style={{ fontWeight: "bolder" }}
                      >
                        {errors.context}
                      </div>
                    ) : null}
                  </div>

                  <div className="row">
                    <div className="text-left col"></div>
                    <div className="text-left col">
                      <button type="submit" className="btn bg-primary button-1">
                        ثبت
                      </button>
                      <button type="submit" className="btn bg-primary button-1">
                        ثبت او پرنت
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <Footer />
        </>
      ) : (
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
                    Islamic Imarat of Afghanistan Technical & Vocational
                    Education Training Authority
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
                <p> &#160;{formData.pishnihadDate}</p>
              </div>
              <div className="maktob_type_div">
                <div className="maktob_no">
                  <label>ګڼه:</label>
                  <p>{formData.pishnihadNo}</p>
                </div>
              </div>

              <Divider className="divider" />

              <div className="pishnihad_body_main_div">
                <div className="pishnihad_body">
                  <div className="header_of_pishnihad">
                    <h3 className="header_of_pishnihad_text">پیشنهاد</h3>
                  </div>
                  <div className="pishnihad_body_div mx-2">
                    <p className="audiance">{formData.recipent}</p>
                    <p className="greating">
                      ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ ً{" "}
                    </p>
                    <div className="subject_of_maktob">
                      <label style={{ textDecoration: "underline" }}>
                        {" "}
                        موضوع:
                      </label>
                      <p>{formData.subject} </p>
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
                    <h3 className="ahkaam_header_text">احکام</h3>
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
                onClick={() => {
                  setIsFromState(true);
                }}
                className="print-button btn bg-primary px-۲"
              >
                مخکنۍ صفحه/ صفحه قبلی
              </button>

              <button
                className="print-button btn bg-primary px-5"
                onClick={() => {
                  onStoreData();
                }}
              >
                ثبت
              </button>

              <button
                onClick={() => {
                  onStoreData();
                  handlePrint();
                }}
                className="print-button btn bg-primary px-5"
              >
                پرنت و ثبت
              </button>
            </div>
          </div>
        </>
      )}
    </Sidebar>
  );
};

export default Pishnihad;
