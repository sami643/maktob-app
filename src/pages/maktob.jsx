import React from "react";
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Checkbox, Divider } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import "./pages.css";

const Maktob = () => {
  const handleChange = (values) => {
    console.log("Values", values);
    var input = document.getElementById("maktobDate");
    console.log("Input", input.value);
  };

  const [btnChecked, setBtnChecked] = useState(false);

  return (
    <>
      <Header />

      <div className="main-container text-right">
        <h1 className="container-header">مکتوب</h1>
        <Divider />
        <Formik
          initialValues={{
            maktobNo: "23423",
            maktobDate: "",
            subject: "ALmart",
            context: "contect",
            recipient: "Recipient",
          }}
          onSubmit={handleChange}
        >
          {({ values, setFieldValue, setFieldTouched }) => (
            <Form className="m-5">
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label mr-3" htmlFor="maktobNo">
                      د مکتوب ګڼه/شماره
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
                      id="maktobNo"
                      name="maktobNo"
                      className="form-control"
                      value={values.maktobNo}
                      onChange={(e) =>
                        setFieldValue("maktobNo", e.target.value)
                      }
                      onBlur={() => setFieldTouched("maktobNo", true)}
                    />
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
                      }}
                      calendar={arabic}
                      locale={arabic_ar}
                      id="maktobDate"
                      name="maktobDate"
                      value={values.maktobDate}
                      onChange={setFieldValue}
                    />
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
                      id="recipient"
                      name="recipient"
                      className="form-control"
                      value={values.recipient}
                      onChange={(e) =>
                        setFieldValue("recipient", e.target.value)
                      }
                      onBlur={() => setFieldTouched("recipient", true)}
                    />
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
                    className="form-control"
                    value={values.subject}
                    onChange={(e) => setFieldValue("subject", e.target.value)}
                    onBlur={() => setFieldTouched("subject", true)}
                  />
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
                  په لست کې شتون نه لري
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
                  className="form-control"
                  id="context"
                  name="context"
                  rows="4"
                  value={values.context}
                  onChange={(e) => setFieldValue("context", e.target.value)}
                  onBlur={() => setFieldTouched("context", true)}
                ></textarea>
              </div>
              <div>
                <h3>کاپي:</h3>{" "}
              </div>
              <div class="form-check mr-4">
                <div className="mr-">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </div>
                <label
                  class="form-check-label mr-5 "
                  for="flexCheckDefault"
                  checked
                >
                  ریاست منابع بشری
                </label>
              </div>
              <div className="text-left">
                <button type="submit" className="btn btn-primary button-1">
                  ثبت او پرنت
                </button>
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
