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
import "./pages.css";

const Maktob = () => {
  const handleChange = (values) => {
    console.log("Values", values);
    var input = document.getElementById("maktobDate");
    console.log("Input", input.value);
  };

  const [btnChecked, setBtnChecked] = useState(false);
  const [selectedPresidencies, setSelectedPresidencies] = useState([]);

  const selectAllPresidencies = () => {
    if (selectedPresidencies.length === presidencies.length) {
      // If all checkboxes are already selected, unselect all
      setSelectedPresidencies([]);
    } else {
      // Otherwise, select all checkboxes
      const allPresidencyLabels = presidencies.map((item) => item.label);
      setSelectedPresidencies(allPresidencyLabels);
    }
  };

  const handleCheckboxChange = (label) => {
    if (selectedPresidencies.includes(label)) {
      // If the checkbox is already selected, remove it from the selectedPresidencies state
      setSelectedPresidencies(
        selectedPresidencies.filter((item) => item !== label)
      );
    } else {
      // Otherwise, add it to the selectedPresidencies state
      setSelectedPresidencies([...selectedPresidencies, label]);
    }
  };

  const columns = [];
  const itemsPerColumn = 7;

  for (let i = 0; i < presidencies.length; i += itemsPerColumn) {
    const columnItems = presidencies.slice(i, i + itemsPerColumn);
    columns.push(columnItems);
  }

  return (
    <>
      <Header />

      <div className="main-container text-right">
        <h1 className="container-header">استعلام</h1>
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
                      داستعلام ګڼه/شماره
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
                  className="form-control"
                  id="context"
                  name="context"
                  rows="4"
                  value={values.context}
                  onChange={(e) => setFieldValue("context", e.target.value)}
                  onBlur={() => setFieldTouched("context", true)}
                ></textarea>
              </div>

              <div className="row ">
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
  );
};

export default Maktob;
