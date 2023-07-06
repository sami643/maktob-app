import React from "react";
import { createContext, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
import { Checkbox, Divider } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import { presidencies, maktobTypeOptions } from "./../assets/data/data.js";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { maktobValidationSchema } from "./../assets/data/validation.js";
import { Spin, message } from "antd";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";
import axios from "axios";
import "./pages.css";
message.config({
  top: 100,
  maxCount: 5,
});

const Maktob = (props) => {
  const { maktobId } = useParams();
  // Retrieving data from the LocalStorage
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));
  const [formData, setFormData] = useState("");
  const [initialValues, setInitialValues] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [isFormState, setIsFromState] = useState(true);
  const [uniquemaktob, setUniquemaktob] = useState();
  const [btnChecked, setBtnChecked] = useState(false);
  const [fetchedCopyTo, setfetchedCopyTo] = useState([]);
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

  const presidenciesOpoptions = [
    { value: "نصاب", label: "ریاست نصاب" },
    { value: "بشری", label: "ریاست منابع بشری" },
    { value: "پلان", label: "ریاست پلان" },
  ];

  selectedPresidencies?.sort((a, b) => a.value - b.value);
  const copyToRecipentsJustLabel = selectedPresidencies?.map(
    (obj) => obj.label
  );
  let listOfpresidenciesJustValue = [];
  if (maktobId) listOfpresidenciesJustValue = fetchedCopyTo?.value || [];
  else
    listOfpresidenciesJustValue = selectedPresidencies?.map((obj) => obj.value);
  let copyToRecipentsJustLabel_1 = [];
  if (maktobId) copyToRecipentsJustLabel_1 = fetchedCopyTo?.label || [];
  else
    copyToRecipentsJustLabel_1 = copyToRecipentsJustLabel.concat(inputFields);
  let arrayA = [];
  let arrayB = [];
  let arrayC = [];
  let counter = 0;
  let counter_1 = 0;
  let counter_2 = 0;
  let isDeputOrAdvisoryChecked = false;
  //display the checkbox
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

  const handlePrint = () => {
    window.print();
  };

  // Integration
  const onStoreData = () => {
    axios
      .post("/api/maktob/new-maktob", {
        data: {
          maktobNo: formData.maktobNo,
          maktobDate: formData.maktobDate,
          recipent: formData.recipent,
          subject: formData.subject,
          context: formData.context,
          userId: userData.userId,
          presidencyName: userData.presidencyName,
          maktobType: formData.maktobType,
          copyTo: {
            label: copyToRecipentsJustLabel_1,
            value: listOfpresidenciesJustValue,
          },
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
        console.log("ErorrMessage: ", err.response.data.message);
        message.error({
          content: err.response.data.message,
          className: "error_custom_message",
        });
      });
  };

  const [totalMaktob, setTotalMaktob] = useState("");
  // getting MaktobNo
  useEffect(() => {
    axios
      .post("/api/maktob/maktobs", {
        data: {
          userId: userData.userId,
          presidencyName: userData.presidencyName,
        },
      })
      .then((res) => {
        setTotalMaktob(parseInt(res.data.Maktobs_List_data.length + 1));
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  }, [totalMaktob]);

  const onSubmitForm_1 = (values) => {
    console.log("values", values);
    setFormData(values);
    setIsFromState(false);
    setInitialValues(values);
    console.log("selectedPresidencies", selectedPresidencies);
    console.log("NewAddedItemsToCopy", inputFields);
  };

  // message after submission
  const openConfirmation = () => {
    setVisibility(true);
    setShowConfirmation(true);
  };
  const handleCancel = () => {
    setShowConfirmation(false);
    setVisibility(false);
  };
  const handleConfirmation = () => {
    setShowConfirmation(false);
    setVisibility(false);
  };

  const gettingSpecificMaktob = () => {
    axios
      .post("/api/maktob/uniquemaktob", {
        data: {
          maktobId,
        },
      })
      .then((res) => {
        console.log("Unique MaktobData: ", res.data.uniqueMaktob);
        setUniquemaktob(res.data.uniqueMaktob);
        setfetchedCopyTo(res.data.uniqueMaktob.CopyTo[0]);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };

  useEffect(() => {
    gettingSpecificMaktob();
  }, []);

  return (
    <Sidebar>
      {isFormState && !maktobId ? (
        <>
          <Header />
          {/* Form Part */}
          <div className="main-container text-right">
            <h1 className="container-header">مکتوب</h1>
            <Divider />
            {totalMaktob ? (
              <Formik
                initialValues={{
                  maktobNo: initialValues?.maktobNo || totalMaktob,
                  maktobDate: initialValues?.maktobDate,
                  maktobType: initialValues?.maktobType,
                  recipent: initialValues?.recipent,
                  subject: initialValues?.subject,
                  context: initialValues?.context,
                }}
                onSubmit={onSubmitForm_1}
                validationSchema={maktobValidationSchema}
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
                            ګڼه/شماره
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
                              errors.maktobNo && touched.maktobNo
                                ? "is-invalid"
                                : ""
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
                          id="maktobType"
                          value={values.maktobType}
                          name="maktobType"
                          style={{ height: "35px" }}
                          onChange={(e) =>
                            setFieldValue("maktobType", e.target.value)
                          }
                          className={`form-control form-select-lg ${
                            errors.maktobType && touched.maktobType
                              ? "is-invalid form-select-lg    "
                              : ""
                          }`}
                          aria-label=".form-select-lg example"
                        >
                          {/* <option selected disabled>
                            وټاکئ/ انتخاب
                          </option> */}
                          {maktobTypeOptions.map((option) => (
                            <option key={option.value} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.maktobType && touched.maktobType ? (
                          <div className="invalid-feedback  errorMessageStyle mr-2 mb-3 mt-0">
                            {errors.maktobType}
                          </div>
                        ) : null}
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label
                            className="form-label mr-3"
                            htmlFor="maktobDate"
                          >
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
                            <option selected>وټاکئ/انتخاب</option>
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
                            errors.subject && touched.subject
                              ? "is-invalid"
                              : ""
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

                    <div className="form-check ">
                      <div style={{ marginTop: "-12px", marginRight: "4px" }}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckIndeterminate"
                          onChange={(e) => setBtnChecked(e.target.checked)}
                        />
                      </div>
                      <label
                        className="form-check-label"
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
                        onChange={(e) =>
                          setFieldValue("context", e.target.value)
                        }
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

                    <div>
                      <h3>کاپي:</h3>
                    </div>
                    {/* Copy to */}
                    <div className="pb-5">
                      <div className="form-check mr-4 bg-primary p-1 rounded pr-3">
                        <input
                          className="form-check-input my-3"
                          type="checkbox"
                          id="selectAllCheckbox"
                          checked={
                            selectedPresidencies.length === presidencies.length
                          }
                          onChange={selectAllPresidencies}
                        />
                        <label
                          className="form-check-label mr-4 my-2  "
                          htmlFor="selectAllCheckbox"
                        >
                          د ټولو انتخاب/ انتخاب همه
                        </label>
                      </div>
                      <div className="row copy_input_body_main_div mr-5 mt-2 ">
                        {columns.map((column, columnIndex) => (
                          <div
                            className="col copy_input_body"
                            key={columnIndex}
                          >
                            {column.map((item, itemIndex) => {
                              const checkboxId = `flexCheckDefault${itemIndex}`;
                              const isChecked = selectedPresidencies.some(
                                (selectedItem) =>
                                  selectedItem.label === item.label
                              );

                              return (
                                <div className="form-outline" key={itemIndex}>
                                  <div className="form-check">
                                    <div className="">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={checkboxId}
                                        checked={isChecked}
                                        onChange={() =>
                                          handleCheckboxChange(
                                            item.label,
                                            item.value
                                          )
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
                        <label className="">نور/ دیگر</label>
                      </div>

                      {inputFields.map((value, index) => (
                        <div className="col" key={index}>
                          <div className="input-group options-input mr-4 ">
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
                          type="submit"
                          className="btn bg-primary button-1"
                        >
                          مخته/بعدی
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="text-center pt-5 mt-5">
                <Spin />
              </div>
            )}
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className="main_container">
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

            <div className="date_type_no_div col-12 ">
              <div className="maktob_no col-4 align-self-end">
                <label>ګڼه:</label>
                <p>
                  &#160;
                  {maktobId ? uniquemaktob?.MaktobNo : formData.maktobNo}
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
                    {maktobId ? uniquemaktob?.MaktobDate : formData.maktobDate}
                  </p>
                </div>
                <div className="maktob_type_div d-flex justify-content-end">
                  <div className="maktob_type text-left">
                    <div className="px-2">
                      <label className="">عادی</label>

                      <input
                        className="maktob-type-check m-1 "
                        type="checkbox"
                        value=""
                        id="matkobType"
                        checked={
                          maktobId
                            ? uniquemaktob?.MaktobType === "عادی"
                            : formData.maktobType === "عادی" ||
                              formData.maktobType === undefined
                        }
                      />
                    </div>
                    <div className="px-2">
                      <label className="">عاجل</label>

                      <input
                        className="maktob-type-check m-1 "
                        type="checkbox"
                        value=""
                        id="matkobType"
                        checked={
                          maktobId
                            ? uniquemaktob?.MaktobType === "عاجل"
                            : formData.maktobType === "عاجل"
                        }
                      />
                    </div>
                    <div className="px-2">
                      <label className="">محرم</label>

                      <input
                        className="maktob-type-check m-1 "
                        type="checkbox"
                        value=""
                        id="matkobType"
                        checked={
                          maktobId
                            ? uniquemaktob?.MaktobType === "محرم"
                            : formData.maktobType === "محرم"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider">
              <Divider className="divider" />
            </div>

            <div className="body_of_maktob ">
              <div className="audiance">
                {" "}
                <p>{maktobId ? uniquemaktob?.Recipent : formData.recipent}</p>
              </div>
              <div className="greating">
                <p>ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ ً </p>
              </div>

              <div className="subject_of_maktob">
                <label> موضوع </label>
                <p>
                  :&#160;&#160;{" "}
                  {maktobId ? uniquemaktob?.Subject : formData.subject}{" "}
                </p>
              </div>
              <div className="mohtarama">
                <p>محترما:</p>
              </div>
              <div className="matktob_context">
                <p>{maktobId ? uniquemaktob?.Context : formData.context}</p>
              </div>

              <br />
              <div className="closing_signature">
                <p>والسلام</p>
                <p>{userData.presidentName}</p>
                <p>{userData.presidencyName}</p>
              </div>
            </div>

            <div className="copy_to_div d-flex align-items-start flex-column ">
              {copyToRecipentsJustLabel_1.length > 0 ? (
                <div className="copy_to_title align-self-start">
                  <p>کاپي :</p>
                </div>
              ) : null}
              <div className="copy_to_body ">
                {isDeputOrAdvisoryChecked ? (
                  <>
                    <div className="copy_body_item">
                      {arrayA.map((item, index) => (
                        <p key={index} className="copy_body_item_text">
                          {item}
                        </p>
                      ))}
                    </div>
                    <div className="copy_body_item">
                      {arrayB.map((item, index) => (
                        <p key={index} className="copy_body_item_text">
                          {item}
                        </p>
                      ))}
                    </div>

                    <div className="copy_body_item">
                      {arrayC.map((item, index) => (
                        <p key={index} className="copy_body_item_text">
                          {item}
                        </p>
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
                          <p key={index} className="copy_body_item_text">
                            {item}
                          </p>
                        ))}
                    </div>
                    <div className="copy_body_item">
                      {copyToRecipentsJustLabel_1
                        .slice(8, 16)
                        .map((item, index) => (
                          <p key={index} className="copy_body_item_text">
                            {item}
                          </p>
                        ))}
                    </div>
                    <div className="copy_body_item">
                      {copyToRecipentsJustLabel_1
                        .slice(16, 24)
                        .map((item, index) => (
                          <p key={index} className="copy_body_item_text">
                            {item}
                          </p>
                        ))}
                    </div>
                  </>
                )}
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
          {showConfirmation && (
            <div className="confirmation-modal">
              <p>وتل/ خروج</p>
              <div className="button-container">
                <button
                  className="cancel-button bg-primary"
                  onClick={handleCancel}
                >
                  نه/نخیر
                </button>
                <button
                  className="confirm-button bg-primary"
                  onClick={handleConfirmation}
                >
                  هو/ بلی
                </button>
              </div>
            </div>
          )}
          {!maktobId && (
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
                  openConfirmation();
                  gettingSpecificMaktob();
                }}
              >
                ثبت
              </button>

              <button
                onClick={() => {
                  handlePrint();
                  onStoreData();
                }}
                className="print-button btn bg-primary px-5 ml-5"
              >
                پرنت و ثبت
              </button>
            </div>
          )}
          {maktobId && (
            <div className="container print_btn_div text-right  ">
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

export default Maktob;
