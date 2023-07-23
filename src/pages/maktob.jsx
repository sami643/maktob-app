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
import { Button, Modal, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  presidencies,
  maktobTypeOptions,
  presidenciesForSelectOptions,
  presidenciesSendingDocumentSelectionOption,
} from "./../assets/data/data.js";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  maktobValidationSchema,
  recipentPresidenciesSchema,
  malahizaShodValidationSchema,
} from "./../assets/data/validation.js";
import { Spin, message } from "antd";
import Logo from "./../assets/img/logo.jpg";
import ImratName from "./../assets/img/Imarat_Name.jpg";
import ImratName_Pashto from "./../assets/img/Imarat_Name_Pashto.jpg";
import Imarat_Logo from "./../assets/img/imarat_logo.png";
import Tickmark from "./../assets/img/tickmark.png";
import axios from "axios";
import "./pages.css";
message.config({
  top: 100,
  maxCount: 5,
});

const Maktob = () => {
  const { maktobId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const IsMaktobSent = searchParams.get("isMaktobSent");
  const PresidencyNameFromReceivedMaktobList = searchParams.get("PN");

  // Retrieving data from the LocalStorage
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));
  // const localStorage = JSON.parse(localStorage)
  const [formData, setFormData] = useState("");
  const [initialValues, setInitialValues] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isFormState, setIsFromState] = useState(true);
  const [uniquemaktob, setUniquemaktob] = useState({});
  const [btnChecked, setBtnChecked] = useState(false);
  const [fetchedCopyTo, setfetchedCopyTo] = useState([]);
  const [selectedPresidencies, setSelectedPresidencies] = useState([]);
  const [totalMaktob, setTotalMaktob] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sentMatkobSuccessResponse, setSentMatkobSuccessResponse] =
    useState(null);
  const [
    selectedPresidencieswhileSendigMaktob,
    setSelectedPresidencieswhileSendigMaktob,
  ] = useState([]);
  const [islangPashto, setIsLangPashto] = useState(false);
  const [loading, setloading] = useState(true);

  // if (IsMaktobSent === "recievedMaktobs") {
  //   setUserData();
  // }

  const presidenciesSendingDocumentselectingOption =
    presidenciesSendingDocumentSelectionOption.filter(
      (option) => option.label !== userData.PresidencyName
    );
  const filteredPresidencies = presidencies.filter(
    (option) => option.label !== userData.PresidencyName
  );

  const selectAllPresidencies = () => {
    if (selectedPresidencies.length === filteredPresidencies.length) {
      // If all checkboxes are already selected, unselect all
      setSelectedPresidencies([]);
    } else {
      // Otherwise, select all checkboxes
      const allPresidencyItems = filteredPresidencies.map((item) => ({
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
  for (let i = 0; i < filteredPresidencies.length; i += itemsPerColumn) {
    const columnItems = filteredPresidencies.slice(i, i + itemsPerColumn);
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
          listOfpresidenciesJustValue[j] === 17 ||
          listOfpresidenciesJustValue[j] === 18 ||
          listOfpresidenciesJustValue[j] === 19 ||
          listOfpresidenciesJustValue[j] === 20 ||
          listOfpresidenciesJustValue[j] === 21
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

  // Adding and updating maktobs
  const onStoreData = () => {
    axios
      .post("/api/maktob/new-maktob", {
        data: {
          maktobId: maktobId ? maktobId : "newMaktob",
          maktobNo: formData.maktobNo,
          maktobDate: formData.maktobDate,
          recipent: formData.recipent,
          subject: formData.subject,
          context: formData.context,
          userId: userData.UserId,
          presidencyName: userData.PresidencyName,
          maktobType: formData.maktobType ? formData.maktobType : "عادی",
          copyTo: {
            label: copyToRecipentsJustLabel_1,
            value: listOfpresidenciesJustValue,
          },
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
        openDeleteConfirmation();
        setSubmissionMessage(res.data.message);
      })
      .catch((err) => {
        console.log("ErorrMessage: ", err.response.data.message);
        message.error({
          content: err.response.data.message,
          className: "error_custom_message",
        });
      });
  };

  // getting MaktobNo
  useEffect(() => {
    axios
      .post("/api/maktob/maktob-no", {
        data: {
          userId: userData.UserId,
          presidencyName: userData.PresidencyName,
        },
      })
      .then((res) => {
        setTotalMaktob(parseInt(res.data.MaktobNoPlusOne));
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  }, [totalMaktob]);

  //formSubmit and Updating the maktob
  const onSubmitForm_1 = (values) => {
    setIsFromState(false);
    setFormData(values);
    setInitialValues(values);

    // Language Detecter
    console.log("innerPart si Called");
    const charactersToDetect = "ټډږړښڅځېۍڼګ";
    const inputedvalue = values.context
      .split("")
      .filter((char) => charactersToDetect.includes(char))
      .join("");
    if (inputedvalue.length > 0) {
      setIsLangPashto(true);
    } else {
      setIsLangPashto(false);
    }
  };

  // message after submission
  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  console.log(
    "PresidencyNameFromReceivedMaktobList",
    PresidencyNameFromReceivedMaktobList
  );
  const gettingSpecificMaktob = () => {
    axios
      .post("/api/maktob/uniquemaktob", {
        data: {
          maktobId,
          userId:
            IsMaktobSent === "ItsReceivedMaktob"
              ? PresidencyNameFromReceivedMaktobList
              : userData.UserId,
        },
      })
      .then((res) => {
        console.log("Unique MaktobData: ", res.data);
        setUniquemaktob(res.data.uniqueMaktob);
        setfetchedCopyTo(res.data.uniqueMaktob.CopyTo[0]);
        // console.log("copyTo Value: ", res.data.uniqueMaktob.CopyTo[0].label);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };

  const gettingUserDataForRecievedMaktob = () => {
    axios
      .post("/api/user/receivedMaktob-userData", {
        data: {
          userId: PresidencyNameFromReceivedMaktobList,
        },
      })
      .then((res) => {
        setUserData(res.data.receviveMaktobUserData);
        setloading(false);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };
  useEffect(() => {
    if (maktobId) gettingSpecificMaktob();
    if (PresidencyNameFromReceivedMaktobList) {
      gettingUserDataForRecievedMaktob();
    }
  }, []);

  const updateInitialValues = {
    maktobNo: uniquemaktob.MaktobNo || uniquemaktob.maktobNo,
    maktobDate: uniquemaktob.MaktobDate || uniquemaktob.maktobDate,
    maktobType: uniquemaktob.MaktobType || uniquemaktob.maktobType,
    recipent: uniquemaktob.Recipent || uniquemaktob.recipent,
    subject: uniquemaktob.Subject || uniquemaktob.subject,
    context: uniquemaktob.Context || uniquemaktob.context,
    copyTo: uniquemaktob.CopyTo || uniquemaktob.copyTo,
  };
  const initialStateValue = {
    maktobNo: initialValues.maktobNo || totalMaktob,
    maktobDate: initialValues.maktobDate,
    maktobType: initialValues.maktobType,
    recipent: initialValues.recipent,
    subject: initialValues.subject,
    context: initialValues.context,
  };

  // Select Options
  const handleMaktobRecievers = (value) => {
    console.log("cacsdafds0", value);
    setSelectedPresidencieswhileSendigMaktob(value);
  };

  const handleSendMaktob = async () => {
    console.log(selectedFile, "handleUploadFile");
    if (selectedPresidencieswhileSendigMaktob.length === 0) {
      setErrorMessage(
        "لطفا خپل مخاطب انتخاب کړئ/ لطفا مخاطب تانرا انتخاب نمایید"
      );
    } else {
      const formData = new FormData();
      selectedFile.forEach((file) => formData.append("selectedFile", file));
      try {
        await axios({
          method: "post",
          url: "/api/maktob/file-upload",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          console.log("response: ", response);
          axios
            .post("/api/maktob/send-matkob", {
              data: {
                userId: userData.UserId,
                maktobNo: maktobId,
                presidencyName: userData.PresidencyName,
                allReceivers: selectedPresidencieswhileSendigMaktob,
                attachedDocmuents: response.data.file_urls,
              },
            })
            .then((res) => {
              console.log("SentManktob: ", res.data);
              setSentMatkobSuccessResponse("Maktob Sent successfully");
            })
            .catch((err) => {
              console.log("send Maktob Error Is called: ", err.response);
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  let molihizaShodServerData = false;
  const handleMolahizaShod = () => {
    console.log(
      "handleMoalhizasdfgdgsdfgsfdddddddddd23333333333333333333333333333333333333333333333333333333333333333"
    );
  };
  return (
    <Sidebar>
      {isFormState && (!maktobId || maktobId?.length > 15) ? (
        <>
          <Header />
          {/* Form Part */}
          <div className="main-container text-right">
            <h1 className="container-header">مکتوب</h1>
            <Divider />
            <Formik
              onSubmit={onSubmitForm_1}
              initialValues={maktobId ? updateInitialValues : initialStateValue}
              validationSchema={maktobValidationSchema}
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
                          value={values.maktobNo}
                          onChange={(e) =>
                            setFieldValue("maktobNo", e.target.value)
                          }
                          onBlur={() => setFieldTouched("maktobNo", true)}
                          className={`form-control ${
                            errors.maktobNo && touched.maktobNo
                              ? "is-invalid"
                              : ""
                          }`}
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
                  {/* mokhaatib */}
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

                          {presidenciesForSelectOptions.map((group) => (
                            <optgroup
                              key={group.optgroup}
                              label={group.optgroup}
                            >
                              {group.options.map((option) => {
                                // Check if the option value matches the current user's value
                                if (option.label !== userData.PresidencyName) {
                                  return (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  );
                                }
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
                          selectedPresidencies.length ===
                          filteredPresidencies.length
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
                        <div className="col copy_input_body" key={columnIndex}>
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
                  <hr />
                  {maktobId ? (
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
          {loading ? (
            <>
              {/* <div className=" text-center p-5" style={{ marginTop: "20%" }}>
                <Spin />
              </div> */}
              <div
                className="text-center "
                style={{
                  marginTop: "22%",
                }}
              >
                <div
                  className="spinner-grow text-primary "
                  role="status"
                  style={{ width: "80px", height: "80px" }}
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="main_container">
                <div className="header-body">
                  <div className=" pashto_headling_div col-md-4 col-xl-4 col-sm-6">
                    <div className=" pastho-side ">
                      <div className="  tvet_logo ">
                        <img
                          src={Imarat_Logo}
                          alt=""
                          min-width="100"
                          height="80"
                        />
                      </div>
                    </div>
                    <div className="pashto-text-div-inner">
                      <img
                        src={ImratName_Pashto}
                        className="pashto_heading_img"
                      />
                      <p className="m-0 text-right  pashto_headline_text">
                        د تخنیکي او مسلکي زده کړو اداره
                      </p>
                    </div>
                  </div>

                  <div className=" pt-4  english_headline_div   col-md-4">
                    <h4 className=" text-center m-0 english_headline_text">
                      Islamic Imarat of Afghanistan Technical & Vocational
                      Education Training Authority
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
                    <label>{islangPashto ? "ګڼه" : "شماره"}:</label>
                    <p>
                      &#160;
                      {maktobId && maktobId.length < 15
                        ? uniquemaktob?.MaktobNo
                        : formData.maktobNo}
                    </p>
                  </div>

                  <div className="owner col-4">
                    <div>
                      {islangPashto
                        ? userData.HigherAuthorityPashto
                        : userData.HigherAuthority}
                    </div>
                    <div>
                      {islangPashto
                        ? userData.PresidencyNamePashto
                        : userData.PresidencyName}
                    </div>
                    <div>{userData.Directorate}</div>

                    <div>
                      {islangPashto ? " اجرائیه مدیریت" : "مدیریت اجرائیه"}
                    </div>
                  </div>

                  <div className=" col-4 date_type_div align-self-end ">
                    <div className="date d-flex justify-content-end  ">
                      <label htmlFor="">
                        {islangPashto ? "نیټه" : "تاریخ"}:
                      </label>
                      <p>
                        &#160;
                        {maktobId && maktobId.length < 15
                          ? uniquemaktob?.MaktobDate
                          : formData.maktobDate}
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
                              maktobId && maktobId.length < 15
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
                              maktobId && maktobId.length < 15
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
                              maktobId && maktobId.length < 15
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
                    <p>
                      {" "}
                      {maktobId && maktobId.length < 15
                        ? uniquemaktob?.Recipent
                        : formData.recipent}
                    </p>
                  </div>
                  <div className="greating">
                    <p>
                      ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ وَبَرَكَاتُهُ ً{" "}
                    </p>
                  </div>

                  <div className="subject_of_maktob">
                    <label> موضوع </label>
                    <p>
                      :&#160;&#160;{" "}
                      {maktobId && maktobId.length < 15
                        ? uniquemaktob?.Subject
                        : formData.subject}{" "}
                    </p>
                  </div>
                  <div className="mohtarama">
                    <p>محترما:</p>
                  </div>
                  <div className="matktob_context">
                    <p>
                      {" "}
                      {maktobId && maktobId.length < 15
                        ? uniquemaktob?.Context
                        : formData.context}
                    </p>
                  </div>

                  <br />
                  <div className="closing_signature d-flex">
                    <div className="col-4">
                      {IsMaktobSent === "ItsReceivedMaktob" &&
                        molihizaShodServerData === true && (
                          <div className="text-right ">
                            <div className="text-center molahizashod mt-5">
                              ملا حظه شد
                            </div>
                            <p
                              style={{
                                fontSize: "15px",
                                fontFamily: "sans-serif",
                              }}
                              className="text-center"
                            >
                              12-24-1444
                            </p>

                            <p
                              style={{
                                fontSize: "15px",
                                fontFamily: "sans-serif",
                              }}
                            >
                              آمریت محترم نظارت و ارزیابی در زمینه اجرات اصولی
                              نماید
                            </p>
                          </div>
                        )}
                    </div>
                    <div className="col-4">
                      <p>والسلام</p>

                      <p>
                        {islangPashto
                          ? userData.PresidentNamePashto
                          : userData.PresidentName}
                      </p>
                      <p>
                        {islangPashto
                          ? userData.PositionTitlePashto
                          : userData.PositionTitle}
                      </p>
                    </div>
                    <div className="col-4"></div>
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
                      {islangPashto
                        ? "پته: کارته چهار، د لوړو زده کړو وزارت څیرمه- کابل- افغانستان "
                        : "آدرس: کارته چهار، جوار وزارت تحصیلات عالی- کابل- افغانستان "}

                      {/* */}
                    </div>
                    <div className="footer-item">Email: {userData.Email}</div>
                    <div className="footer-item">Tel: {userData.PhoneNo}</div>
                  </div>
                </div>
              </div>

              {IsMaktobSent === "ItsReceivedMaktob" &&
                molihizaShodServerData === false && (
                  <div className="col-  main_container border rounded">
                    <Formik
                      onSubmit={handleMolahizaShod}
                      initialValues={{
                        molihizaTitle: "ملاحظه شد",
                        molahizaContext:
                          "آمریت مربوطه در زمینه اجرأت اصولی نمایید",
                      }}
                      validationSchema={malahizaShodValidationSchema}
                      enableReinitialize={true}
                    >
                      {({
                        values,
                        setFieldValue,
                        setFieldTouched,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        errors,
                        touched,
                      }) => (
                        <Form>
                          <div className="form-outline  col text-right">
                            <label
                              className="form-label mr-3"
                              htmlFor="subject"
                            >
                              عنوان
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
                              id="molihizaTitle"
                              name="molihizaTitle"
                              className={`form-control form-select-lg ${
                                errors.molihizaTitle && touched.molihizaTitle
                                  ? "is-invalid form-select-lg    "
                                  : ""
                              }`}
                              value={values.molihizaTitle}
                              onChange={(e) =>
                                setFieldValue("molihizaTitle", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("molihizaTitle", true)
                              }
                            />
                            {errors.molihizaTitle && touched.molihizaTitle ? (
                              <div className="invalid-feedback d-block errorMessageStyle mr-2">
                                {errors.molihizaTitle}
                              </div>
                            ) : null}
                          </div>

                          <div className="form-outline  col text-right my-5">
                            <label
                              className="form-label mr-3"
                              htmlFor="subject"
                            >
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
                              type="textarea"
                              rows={4}
                              id="molahizaContext"
                              name="molahizaContext"
                              className={`form-control form-select-lg ${
                                errors.molahizaContext &&
                                touched.molahizaContext
                                  ? "is-invalid form-select-lg    "
                                  : ""
                              }`}
                              value={values.molahizaContext}
                              onChange={(e) =>
                                setFieldValue("molahizaContext", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("molahizaContext", true)
                              }
                            />
                            {errors.molahizaContext &&
                            touched.molahizaContext ? (
                              <div className="invalid-feedback d-block errorMessageStyle mr-2">
                                {errors.molahizaContext}
                              </div>
                            ) : null}
                          </div>

                          <div className="row">
                            <div className="text-left col"></div>
                            <div className="text-left col">
                              <button
                                type="submit"
                                className=" btn-sm btn bg-primary  px-5 py-2 ml-5"
                              >
                                ثبت
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              {(!maktobId || maktobId?.length > 15) && (
                <div className=" d-flex container  print_btn_div ">
                  <div className=" col-4 text-right ">
                    <button
                      onClick={() => {
                        setIsFromState(true);
                        setUniquemaktob(initialValues);
                      }}
                      className=" print-button btn bg-primary px-5"
                    >
                      مخکنۍ صفحه/ صفحه قبلی
                    </button>
                  </div>
                  <div className="col-8 text-left">
                    <button
                      className="print-button btn bg-primary px-5"
                      onClick={() => {
                        onStoreData();
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
                </div>
              )}
              {maktobId?.length < 15 && (
                <>
                  <div className="container d-flex  print_btn_div   ">
                    <div className=" col-6 text-right">
                      <button
                        onClick={() => {
                          {
                            window.history.go(-1);
                          }
                        }}
                        className="print-button-view btn bg-primary px-5 "
                      >
                        مخکنۍ صفحه/ صفحه قبلی
                      </button>
                    </div>
                    <div className="text-left col-6">
                      {IsMaktobSent === "No" && (
                        <button
                          className=" text-right btn bg-primary px-5  mx-4 "
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          لیږل / ارسال
                        </button>
                      )}

                      <button
                        onClick={() => {
                          {
                            handlePrint();
                          }
                        }}
                        className=" text-right btn bg-primary px-5  "
                      >
                        پرنت
                      </button>
                    </div>
                  </div>
                </>
              )}
              {/* Modal for Sending Maktob */}
              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  class="modalDialog modal-dialog-center mt-5"
                  role="document"
                >
                  <div class="modal-content px-5 ">
                    <div class="modalHeader px-5 mt-4">
                      <h1 class="modalTitle" id="exampleModalLongTitle">
                        د مکتبول لیږل/ارسال مکتوب
                      </h1>
                    </div>
                    <hr />
                    <div class="modal-body mb-5">
                      <div className="form-outline col text-right mb-4">
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
                        <Select
                          dropdownRender={(menu) => (
                            <div style={{ textAlign: "right" }}>
                              {React.cloneElement(menu, {
                                style: { textAlign: "right" },
                              })}
                            </div>
                          )}
                          mode="tags"
                          style={{
                            width: "100%",
                          }}
                          onChange={handleMaktobRecievers}
                          onClick={() => {
                            setErrorMessage(null);
                          }}
                          tokenSeparators={[","]}
                          options={presidenciesSendingDocumentselectingOption}
                        />
                        {errorMessage ? (
                          <div className="invalid-feedback d-block errorMessageStyle mr-2">
                            {errorMessage}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-outline  col text-right my-5 ">
                        <div>
                          <label for="formFileLg" class="form-label">
                            لطفا استاد ضمیمه کړئ/ لطفا اسناد را ضمیمه نماید!
                          </label>

                          <input
                            class="form-control form-control-lg"
                            id="formFileLg"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setSelectedFile([...e.target.files]);
                            }}
                          />
                        </div>
                      </div>
                      <hr />
                      <br />
                      <br />
                      <br />
                      <div class="d-flex text-right p-5 mx-5 mb-5 mt-5 row">
                        <div className="text-right  ml-5 pl-5 col">
                          <button
                            type="button"
                            class="btn bg-primary text-right px-5 ml-5"
                            data-dismiss="modal"
                            onClick={() => {
                              setSentMatkobSuccessResponse(null);
                            }}
                          >
                            ټرل/ بستن
                          </button>
                        </div>
                        {sentMatkobSuccessResponse !==
                        "Maktob Sent successfully" ? (
                          <div className="text-left  col">
                            <button
                              onClick={() => {
                                handleSendMaktob();
                              }}
                              class="btn bg-primary text "
                            >
                              لیږل / ارسال
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button className="btn disabled">
                              مکتبوب په بریالیتوب سره ولیږل سو/مکتوب موفقانه
                              ارسال شد
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showDeleteConfirmation && (
                <div className="divForBackDrop">
                  <div className="confirmation-modal">
                    <p className="">{submissionMessage}</p>
                    <div className="button-container">
                      <button
                        className="confirm-button bg-primary"
                        onClick={() => {
                          handleDeleteConfirmation();
                          window.location.reload(true);
                        }}
                      >
                        بیرته / برگشت
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Sidebar>
  );
};

export default Maktob;
