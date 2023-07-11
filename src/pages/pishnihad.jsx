import React, { useEffect, useState } from "react";
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
import { Spin, message } from "antd";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const Pishnihad = () => {
  const { pishnihadId } = useParams();
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));
  const [totalPishnihad, setTotalPishnihad] = useState("");
  // console.log("Decoded values", userData);
  const [btnChecked, setBtnChecked] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const [isFormState, setIsFromState] = useState(true);
  const [formData, setFormData] = useState("");
  const [uniquePishnihadstate, setUniquePishnihadstate] = useState({});

  const handlePrint = () => {
    window.print();
  };

  // Calling API for getting Istehalaam Number
  useEffect(() => {
    axios
      .post("/api/pishnihad/pishnihads", {
        data: {
          userId: userData.userId,
          presidencyName: userData.presidencyName,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
        setTotalPishnihad(parseInt(res.data.pishnihadsList.length + 1));
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  }, [totalPishnihad]);

  // Adding new Istehlaams and Update Istehlaam
  const onStoreData = () => {
    axios
      .post("/api/pishnihad/new-pishnihad", {
        data: {
          pishnihadId: pishnihadId ? pishnihadId : "newPishnihad",
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
        message.success({
          content: res.data.message,
          className: "success_custom_message",
        });
      })
      .catch((err) => {
        console.log("ErrorMessage", err.response.data.message);
        message.error({
          content: err.response.data.message,
          className: "error_custom_message",
        });
      });
  };

  const onSubmitForm_1 = (values) => {
    console.log("values", values);
    setFormData(values);
    setIsFromState(false);
    setInitialValues(values);
  };

  //Getting mIstehlaam for View component
  const gettingSpecificPishnihadForView = async () => {
    await axios
      .post("/api/pishnihad/uniquePishnihad", {
        data: {
          pishnihadId,
          userId: userData.userId,
        },
      })
      .then((res) => {
        setUniquePishnihadstate(res.data.uniquePishnihad);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };
  useEffect(() => {
    if (pishnihadId) gettingSpecificPishnihadForView();
  }, []);

  const updateInitialValues = {
    pishnihadNo: uniquePishnihadstate.PishnihadNo,
    pishnihadDate: uniquePishnihadstate.PishnihadDate,
    recipent: uniquePishnihadstate.Recipent,
    subject: uniquePishnihadstate.Subject,
    context: uniquePishnihadstate.Context,
  };

  const initialStateValue = {
    pishnihadNo: initialValues?.pishnihadNo || totalPishnihad,
    pishnihadDate: initialValues?.pishnihadDate,
    subject: initialValues?.subject,
    context: initialValues?.context,
    recipent: initialValues?.recipent,
  };

  return (
    <Sidebar>
      {isFormState && (!pishnihadId || pishnihadId.length > 15) ? (
        <>
          <Header />
          <div className="main-container text-right">
            <h1 className="container-header">پیشنهاد</h1>
            <Divider />
            <Formik
              initialValues={
                pishnihadId ? updateInitialValues : initialStateValue
              }
              onSubmit={onSubmitForm_1}
              enableReinitialize={true}
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
                      rows="6"
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

                  {pishnihadId ? (
                    <>
                      <div className="row">
                        <div className=" col container print_btn_div text-right  ">
                          <button
                            onClick={() => {
                              window.history.go(-1);
                            }}
                            className="print-button-view btn bg-primary px-5 mr-3 mt-2 "
                          >
                            مخکنۍ صفحه/ صفحه قبلی
                          </button>
                        </div>
                        <div className=" col container print_btn_div text-left  ">
                          <button
                            type="submit"
                            className="btn bg-primary button-1  py-2"
                          >
                            ثبت تغیرات/ د تغیراتو ثبت
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="row">
                      <div className="text-left col"></div>
                      <div className="text-left col">
                        <button
                          type="submit"
                          className="btn bg-primary button-1"
                        >
                          مخته/بعدی
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className="main_container ">
            <div className="header-body">
              <div className=" pashto_headling_div col-md-4 col-xl-4 col-sm-6">
                <div className=" pastho-side ">
                  <div className="  tvet_logo ">
                    <img src={Imarat_Logo} alt="" min-width="100" height="80" />
                  </div>
                </div>
                <div className="pashto-text-div-inner">
                  <img src={ImratName_Pashto} className="pashto_heading_img" />
                  <p className="m-0 text-right  pashto_headline_text">
                    د تخنیکي او مسلکي زده کړو اداره
                  </p>
                </div>
              </div>

              <div className=" pt-4  english_headline_div   col-md-4">
                <h4 className=" text-center m-0 english_headline_text">
                  Islamic Imarat of Afghanistan Technical & Vocational Education
                  Training Authority
                </h4>
              </div>

              <div className="col-md-4 col-xl-4 col-sm-6 persian_headline_div">
                <div className=" persian-text-div-inner ">
                  <img src={ImratName} className="persian_headline_img " />
                  <p className="m-0  persian_headline_text">
                    اداره تعلیمات تخنیکی و مسلکی
                  </p>
                </div>
                <div className="imarat_logo px-0">
                  <img src={Logo} alt="" min-width="100" height="80" />
                </div>
              </div>
            </div>

            <div className="date_type_no_div   col-12 ">
              <div className="maktob_no col-4 align-self-end">
                <label>ګڼه:</label>
                <p>
                  &#160;
                  {pishnihadId && pishnihadId.length < 15
                    ? uniquePishnihadstate?.PishnihadNo
                    : formData.pishnihadNo}
                </p>
              </div>
              <div className="owner col-4">
                <div>{userData.higherAuthority}</div>
                <div>{userData.presidencyName}</div>
                <div>{userData.directorate}</div>
                <div> اجرائیه مدیریت</div>
              </div>

              <div className=" col-4 date_type_div align-self-end ">
                <div className="date d-flex justify-content-end  ">
                  <label htmlFor="">نیټه:</label>
                  <p>
                    &#160;
                    {pishnihadId && pishnihadId.length < 15
                      ? uniquePishnihadstate?.PishnihadDate
                      : formData.pishnihadDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="divider">
              <Divider className="divider" />
            </div>
            <div className="pishnihad_body_main_div">
              <div className="pishnihad_body">
                <div className="header_of_pishnihad">
                  <h3 className="header_of_pishnihad_text">پیشنهاد</h3>
                </div>
                <div className="pishnihad_body_div mx-2">
                  <p className="audiance">
                    {pishnihadId && pishnihadId.length < 15
                      ? uniquePishnihadstate?.Recipent
                      : formData.recipent}
                  </p>
                  <p className="greating">
                    ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ ً{" "}
                  </p>
                  <div className="subject_of_maktob">
                    <label style={{ textDecoration: "underline" }}>
                      {" "}
                      موضوع:
                    </label>
                    <p>
                      {pishnihadId && pishnihadId.length < 15
                        ? uniquePishnihadstate?.Subject
                        : formData.subject}{" "}
                    </p>
                  </div>
                  <br />
                  <div className="mohtarama">
                    <p>محترما:</p>
                  </div>
                  <p className="matktob_context">
                    {pishnihadId && pishnihadId.length < 15
                      ? uniquePishnihadstate?.Context
                      : formData.context}
                  </p>
                  <br />
                  <div className="closing_signature">
                    <p>والسلام</p>
                    <p>{userData.presidentName}</p>
                    <p>{userData.presidencyName}</p>
                  </div>
                </div>
              </div>
              <div className="ahkaam_div">
                <div className="ahkaam_header">
                  <h3 className="ahkaam_header_text">احکام</h3>
                </div>
              </div>
            </div>
            <div className="footer_divider">
              <Divider className="" />
            </div>
            <div className="footer_div">
              <div className="footer_div_content">
                <div className="footer-item">
                  آدرس: کارته چهار، د لوړو زده کړو وزارت څیرمه- کابل- افغانستان
                </div>
                <div className="footer-item">Email: {userData.email}</div>
                <div className="footer-item">Tel: {userData.phoneNo}</div>
              </div>
            </div>
          </div>

          {(!pishnihadId || pishnihadId?.length > 15) && (
            <div className=" d-flex container  print_btn_div ">
              <div className=" col-4 text-right mr-3 ">
                <button
                  onClick={() => {
                    setIsFromState(true);
                    setUniquePishnihadstate(initialValues);
                  }}
                  className="print-button btn bg-primary px-5"
                >
                  مخکنۍ صفحه/ صفحه قبلی
                </button>
              </div>
              <div className="col-8 text-left">
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
                  className="print-button btn bg-primary px-5 ml-5"
                >
                  پرنت و ثبت
                </button>
              </div>
            </div>
          )}
          {pishnihadId?.length < 15 && (
            <div className="container print_btn_div text-right mr-5 ">
              <button
                onClick={() => {
                  window.history.go(-1);
                }}
                className="print-button-view btn bg-primary px-5 mr-3 "
              >
                مخکنۍ صفحه/ صفحه قبلی
              </button>
            </div>
          )}
        </>
      )}
    </Sidebar>
  );
};

export default Pishnihad;
