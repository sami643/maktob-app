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
import { maktobValidationSchema } from "./../assets/data/validation.js";
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
      const allPresidencyItems = presidencies.map((item) => ({
        label: item.label,
        value: item.value,
      }));
      setSelectedPresidencies(allPresidencyItems);
    }
  };

  const handleCheckboxChange = (label, value) => {
    const selectedItem = { label, value };

    if (selectedPresidencies.find((item) => item.label === label)) {
      // If the checkbox is already selected, remove it from the selectedPresidencies state
      setSelectedPresidencies((prevSelected) =>
        prevSelected.filter((item) => item.label !== label)
      );
    } else {
      // Otherwise, add it to the selectedPresidencies state
      setSelectedPresidencies((prevSelected) => [
        ...prevSelected,
        selectedItem,
      ]);
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

  const onSubmitForm_1 = (values) => {
    console.log("values", values);
    console.log("selectedPresidencies", selectedPresidencies);
    console.log("NewAddedItemsToCopy", inputFields);

    navigate("/maktobview", {
      state: {
        formData: values,
        checkedPresidencies: selectedPresidencies,
        newpresidencies: inputFields,
      },
    });
  };

  const presidenciesOpoptions = [
    { value: "نصاب", label: "ریاست نصاب" },
    { value: "بشری", label: "ریاست منابع بشری" },
    { value: "پلان", label: "ریاست پلان" },
  ];

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
          onSubmit={onSubmitForm_1}
          // validationSchema={maktobValidationSchema}
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
                      type="number"
                      id="maktobNo"
                      name="maktobNo"
                      className={`form-control ${
                        errors.maktobNo && touched.maktobNo ? "is-invalid" : ""
                      }`}
                      value={values.maktobNo}
                      onChange={(e) =>
                        setFieldValue("maktobNo", e.target.value)
                      }
                      onBlur={() => setFieldTouched("maktobNo", true)}
                    />
                    {errors.maktobNo && touched.maktobNo ? (
                      <div className="invalid-feedback d-block errorMessageStyle mr-2">
                        {errors.maktobNo}
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
                          errors.maktobDate && touched.maktobDate
                            ? "1px solid red"
                            : ""
                        }`,
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
                    {errors.maktobDate && touched.maktobDate ? (
                      <div className="invalid-feedback d-block errorMessageStyle mr-2">
                        {errors.maktobDate}
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
                      {presidenciesOpoptions.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
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
                      {column.map((item, itemIndex) => {
                        const checkboxId = `flexCheckDefault${itemIndex}`;
                        const isChecked = selectedPresidencies.some(
                          (selectedItem) => selectedItem.label === item.label
                        );

                        return (
                          <div className="form-outline" key={itemIndex}>
                            <div className="form-check mr-5">
                              <div className="">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={checkboxId}
                                  checked={isChecked}
                                  onChange={() =>
                                    handleCheckboxChange(item.label, item.value)
                                  }
                                />
                              </div>
                              <label
                                className="form-check-label mr-5"
                                htmlFor={checkboxId}
                              >
                                {item.label}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <a
                    className="btn bg-primary mt-3 mb-3 mr-5 ml-2"
                    onClick={handleAddField}
                    style={{ fontWeight: "bolder" }}
                  >
                    +
                  </a>
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
                  <button
                    onClick={handleSubmit}
                    className="btn bg-primary button-1"
                  >
                    ثبت
                  </button>
                  <button
                    // onClick={handleSubmit}
                    type="submit"
                    className="btn bg-primary button-1"
                  >
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
