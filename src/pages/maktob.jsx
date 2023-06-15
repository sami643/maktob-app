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
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./pages.css";

const Maktob = (props) => {
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

  // For addin new copy options
  const handleInputChange = (e, index) => {
    const values = [...inputFields];
    values[index] = e.target.value;
    setInputFields(values);
  };

  const handleRemoveField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };
  const [inputFields, setInputFields] = useState([]); // Initialize with one empty input field
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log("Values", values);
    var maktobDate = document.getElementById("maktobDate");
    console.log("maktobDate", maktobDate.value);
    navigate("/maktobview", {
      state: { formData: values, date: maktobDate.value },
    });
  };

  const onSubmitForm = (values) => {
    console.log("values", values);
  };

  return (
    <>
      <Header />

      <div className="main-container text-right">
        <h1 className="container-header">مکتوب</h1>
        <Divider />
        <Formik
          initialValues={{
            maktobNo: "",
            maktobDate: "",
            recipent: "",
            subject: "",
            context: "",
          }}
          onSubmit={onSubmitForm}
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
                      onChange={(e) =>
                        setFieldValue(
                          "maktobDate",
                          e.year + "/" + e.month.number + "/" + e.day
                        )
                      }
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
                      id="recipent"
                      value={values.recipent}
                      name="recipent"
                      style={{ height: "35px" }}
                      onChange={(e) =>
                        setFieldValue("recipent", e.target.value)
                      }
                      className="form-control form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="نصاب">ریاست نصاب</option>
                      <option value="بشری">ریاست منابع بشری</option>
                      <option value="پلان">ریاست پلان</option>
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
                      id="recipent"
                      name="recipent"
                      className="form-control"
                      value={values.recipent}
                      onChange={(e) =>
                        setFieldValue("recipent", e.target.value)
                      }
                      onBlur={() => setFieldTouched("recipent", true)}
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
              <div>
                <h3>کاپي:</h3>
              </div>
              {/* Copy to */}
              <div className="pb-5">
                <div className="form-check mr-4 bg-primary p-1 rounded pr-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="selectAllCheckbox"
                    checked={
                      selectedPresidencies.length === presidencies.length
                    }
                    onChange={selectAllPresidencies}
                  />
                  <label
                    className="form-check-label mr-4 mb-2  "
                    htmlFor="selectAllCheckbox"
                  >
                    د ټولو انتخاب
                  </label>
                </div>
                <div className="row">
                  {columns.map((column, columnIndex) => (
                    <div className="col" key={columnIndex}>
                      {column.map((item, itemIndex) => (
                        <div className="form-outline" key={itemIndex}>
                          <div className="form-check mr-5">
                            <div className="">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={`flexCheckDefault${itemIndex}`}
                                checked={selectedPresidencies.includes(
                                  item.label
                                )}
                                onChange={() =>
                                  handleCheckboxChange(item.label)
                                }
                              />
                            </div>
                            <label
                              className="form-check-label mr-5"
                              htmlFor={`flexCheckDefault${itemIndex}`}
                            >
                              {item.label}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <button
                    className="btn bg-primary mt-3 mb-3 mr-5 ml-2"
                    onClick={handleAddField}
                    style={{ fontWeight: "bolder" }}
                  >
                    +
                  </button>
                  <label className="">نور ریاستونه/آمریتونه</label>
                </div>

                {inputFields.map((value, index) => (
                  <div className="col" key={index}>
                    <div class="input-group options-input mr-4 ">
                      <div>
                        <input
                          type="text"
                          id="other"
                          name="other"
                          className="form-control"
                          onChange={(e) => handleInputChange(e, index)}
                          value={value}
                        />
                      </div>
                      <div>
                        <button
                          className="btn bg-primary"
                          onClick={() => handleRemoveField(index)}
                          style={{ fontWeight: "bolder" }}
                        >
                          حذف
                        </button>
                      </div>{" "}
                    </div>
                  </div>
                ))}
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
