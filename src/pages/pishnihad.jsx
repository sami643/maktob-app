import React from "react";
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Divider } from "@material-ui/core";
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

  return (
    <>
      <Header />

      <div className="main-container text-right">
        <h1 className="container-header">پیشنهاد</h1>
        <Divider />
        <Formik
          initialValues={{
            maktobNo: "23423",
            maktobDate: "",
            subject: "ALmart",
            context: "contect",
          }}
          onSubmit={handleChange}
        >
          {({ values, setFieldValue, setFieldTouched }) => (
            <Form className="m-5">
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label mr-3" htmlFor="maktobNo">
                      د پیشنهاد ګڼه/شماره
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
              <div className="row mb-4">
                <div className="form-outline mb-4 col">
                  <label className="form-label mr-3" htmlFor="subject">
                    مخاطب
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
                    موضوع
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
              <div className="form-outline mb-4">
                <label className="form-label mr-3" htmlFor="context">
                  متن
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

              <div className="text-left">
                <button type="submit" className="btn btn-success button-1">
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
