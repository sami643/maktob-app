import React from "react";
import { useState } from "react";
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

const Maktob = () => {
  const [btnChecked, setBtnChecked] = useState(false);
  const navigate = useNavigate();

  const onSubmitForm_1 = (values) => {
    console.log("values", values);
    navigate("/pishnihadview", {
      state: { formData: values },
    });
  };

  return (
    <>
      <Header />

      <div className="main-container text-right">
        <h1 className="container-header">پیشنهاد</h1>
        <Divider />
        <Formik
          initialValues={{
            pishnihadNo: "",
            pishnihadDate: "",
            subject: "",
            context: "",
            recipent: "",
          }}
          onSubmit={onSubmitForm_1}
          validationSchema={pishnihaadValidationSchema}
        >
          {({ values, setFieldValue, setFieldTouched, touched, errors }) => (
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

              {/* <div className="row ">
                <div className="form-outline col">
                  <label className="form-label mr-3" htmlFor="subject">
                    استونکی
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
                    className="form-control"
                    value={values.subject}
                    onChange={(e) => setFieldValue("subject", e.target.value)}
                    onBlur={() => setFieldTouched("subject", true)}
                  />
                </div>

                <div className="form-outline mb-4 col">
                  <label className="form-label mr-3" htmlFor="subject">
                    مرجع
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
                    // class=" "
                    style={{ height: "35px" }}
                    className="form-control form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div> */}
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
  );
};

export default Maktob;
