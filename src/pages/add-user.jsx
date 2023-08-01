import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import { Formik, Field, Form } from "formik";
import { Button, Modal, Upload, Select } from "antd";
import { Checkbox, Divider } from "@material-ui/core";
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";

import {
  presidencies,
  userTypeOptions,
  presidenciesForSelectOptions,
  presidenciesSendingDocumentSelectionOption,
  prsidentsSigns,
} from "./../assets/data/data.js";

const SignUp = () => {
  const [isBtnChecked, setIsBtnChecked] = useState(false);
  const addUserInitialValue = { userId: "" };
  return (
    <Sidebar>
      <Header />
      <div className="main-container text-right">
        <h1 className="container-header">نوی اکونت</h1>
        <Divider />
        <Formik
          // onSubmit={onSubmitForm_1}
          initialValues={addUserInitialValue}
          // validationSchema={addUserValidationSchema}
          enableReinitialize={true}
        >
          {({
            values,
            setFieldValue,
            setFieldTouched,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Form className="m-5">
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label mr-3" htmlFor="maktobNo">
                      آیدی
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
                      id="userId"
                      name="userId"
                      onChange={(e) => setFieldValue("userId", e.target.value)}
                      onBlur={() => setFieldTouched("userId", true)}
                      className={`form-control ${
                        errors.userId && touched.userId ? "is-invalid" : ""
                      }`}
                    />
                    {errors.userId && touched.userId ? (
                      <div className="invalid-feedback d-block errorMessageStyle mr-2">
                        {errors.userId}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="form-outline col">
                  <label className="form-label mr-3" htmlFor="subject">
                    ډول/ نوع
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
                    id="userType"
                    value={values.userType}
                    name="userType"
                    style={{ height: "35px" }}
                    onChange={(e) => setFieldValue("userType", e.target.value)}
                    className={`form-control form-select-lg ${
                      errors.userType && touched.userType
                        ? "is-invalid form-select-lg    "
                        : ""
                    }`}
                    aria-label=".form-select-lg example"
                  >
                    {userTypeOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.userType && touched.userType ? (
                    <div className="invalid-feedback  errorMessageStyle mr-2 mb-3 mt-0">
                      {errors.userType}
                    </div>
                  ) : null}
                </div>
              </div>
              {/*  */}

              <div className="row ">
                {!isBtnChecked ? (
                  <div className="form-outline col">
                    <label className="form-label mr-3" htmlFor="subject">
                      معاونیت/ریاست/سکرتریت
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
                      <option selected>وټاکئ/انتخاب</option>

                      {presidenciesForSelectOptions.map((group) => (
                        <optgroup key={group.optgroup} label={group.optgroup}>
                          {group.options.map((option) => {
                            return (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            );
                            return null; // Skip rendering this option for the current user
                          })}
                        </optgroup>
                      ))}
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
                    onChange={(e) => setFieldValue("subject", e.target.value)}
                    onBlur={() => setFieldTouched("subject", true)}
                  />
                  {errors.subject && touched.subject ? (
                    <div className="invalid-feedback d-block errorMessageStyle mr-2">
                      {errors.subject}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-check ">
                <div style={{ marginTop: "-12px", marginRight: "4px" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                    onChange={(e) => setIsBtnChecked(e.target.checked)}
                  />
                </div>
                <label
                  className="form-check-label"
                  htmlFor="flexCheckIndeterminate"
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
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </Sidebar>
  );
};

export default SignUp;
