import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import { Formik, Field, Form } from "formik";
import { Checkbox, Divider } from "@material-ui/core";
import { message } from "antd";
import axios from "axios";

import {
  higherAuthorityOptions,
  presidenciesForSelectOptions,
  userTypesOptions,
  higherAuthorityOptionsPashto,
} from "./../assets/data/data.js";
import {
  addingAmiryatValidationSchema,
  addingPresidencyValidationSchema,
} from "./../assets/data/validation";

const SignUp = () => {
  const [isBtnChecked, setIsBtnChecked] = useState(false);

  const [userRole, setUserRole] = useState("presidency");

  const addUserValidationSchema = {
    higherAuthority: [],
    higherAuthorityPashto: [],
    presidencyName: "",
    presidencyNamePashto: "",
    positionTitle: "",
    positionTitlePashto: "",
    presidentName: "",
    phoneNo: "",
    email: "",
    userId: "",
    password: "",
    userType: [],
    director: "",
    directorate: "",
    directoratePashto: "",
  };

  const SubmitForm = async (values) => {
    console.log("fomre");

    await axios
      .post("/api/user/adduser", {
        data: {
          higherAuthority: values.higherAuthority,
          higherAuthorityPashto: values.higherAuthorityPashto,
          presidencyName: values.presidencyName,
          presidencyNamePashto: values.presidencyNamePashto,
          positionTitle: values.positionTitle,
          positionTitlePashto: values.positionTitlePashto,
          presidentName: values.presidentName,
          phoneNo: values.phoneNo,
          email: values.email,
          userId: values.presidencyId,
          password: values.password,
          userType: values.userType,
          director: values.director,
          directorate: values.directorate,
          directoratePashto: values.directoratePashto,
          directorateId: values.directorateId,
        },
      })
      .then((res) => {
        console.log("response", res.data);
        message.success({
          content: res.data.message,
          className: "error_custom_message",
        });
      })
      .catch((err) => {
        console.log("ErorrMessage: ", err.response);
        message.error({
          content: err.response.data.message,
          className: "error_custom_message",
        });
      });
  };

  const addUserInitialValue = {
    higherAuthority: "",
    higherAuthorityPashto: "",
    presidencyName: "",
    presidencyNamePashto: "",
    positionTitle: "",
    positionTitlePashto: "",
    presidentName: "",
    phoneNo: "",
    email: "",
    presidencyId: "",
    password: "",
    userType: "",
    director: "",
    directorate: "",
    directoratePashto: "",
    directorateId: "",
  };

  return (
    <Sidebar>
      <Header />
      <div className="main-container text-right">
        <h1 className="container-header">اکونت جدید</h1>
        <Divider />
        <Formik
          onSubmit={SubmitForm}
          initialValues={addUserInitialValue}
          validationSchema={
            userRole === "presidency"
              ? addingPresidencyValidationSchema
              : addingAmiryatValidationSchema
          }
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
              <>
                <div className="row mb-4">
                  {/* Defining The User */}
                  <div className="form-outline col-md-6">
                    <label className="form-label mr-3" htmlFor="subject">
                      د اکونت ډول/ نوع اکونت
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
                      onChange={(e) => {
                        setFieldValue("userType", e.target.value);
                        setUserRole(e.target.value);
                      }}
                      className={`form-control form-select-lg ${
                        errors.userType && touched.userType
                          ? "is-invalid form-select-lg    "
                          : ""
                      }`}
                      aria-label=".form-select-lg example"
                    >
                      <option>وټاکئ/انتخاب</option>
                      {userTypesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
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

                {userRole === "presidency" ? (
                  <>
                    <div className="row mb-4">
                      <div className="form-outline col-md-6">
                        <label className="form-label mr-3" htmlFor="subject">
                          مقام بلندپایه
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
                          id="higherAuthority"
                          value={values.higherAuthority}
                          name="higherAuthority"
                          style={{ height: "35px" }}
                          onChange={(e) => {
                            setFieldValue("higherAuthority", e.target.value);
                          }}
                          className={`form-control form-select-lg ${
                            errors.higherAuthority && touched.higherAuthority
                              ? "is-invalid form-select-lg    "
                              : ""
                          }`}
                          aria-label=".form-select-lg example"
                        >
                          <option value="" selected={true} disabled>
                            وټاکئ/ انتخاب
                          </option>
                          {higherAuthorityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.higherAuthority && touched.higherAuthority ? (
                          <div className="invalid-feedback  errorMessageStyle mr-2 mb-3 mt-0">
                            {errors.higherAuthority}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-outline col-md-6">
                        <label className="form-label mr-3" htmlFor="subject">
                          لوړپوړی مقام
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
                          id="higherAuthorityPashto"
                          value={values.higherAuthorityPashto}
                          name="higherAuthorityPashto"
                          style={{ height: "35px" }}
                          onChange={(e) => {
                            setFieldValue(
                              "higherAuthorityPashto",
                              e.target.value
                            );
                          }}
                          className={`form-control form-select-lg ${
                            errors.higherAuthorityPashto &&
                            touched.higherAuthorityPashto
                              ? "is-invalid form-select-lg    "
                              : ""
                          }`}
                          aria-label=".form-select-lg example"
                        >
                          <option value="" selected={true} disabled>
                            وټاکئ/ انتخاب
                          </option>
                          {higherAuthorityOptionsPashto.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.higherAuthorityPashto &&
                        touched.higherAuthorityPashto ? (
                          <div className="invalid-feedback  errorMessageStyle mr-2 mb-3 mt-0">
                            {errors.higherAuthorityPashto}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-4">
                      {!isBtnChecked ? (
                        <div className="form-outline col-md-6">
                          <label className="form-label mr-3" htmlFor="subject">
                            نام ریاست (دری)
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
                            id="presidencyName"
                            value={values.presidencyName}
                            name="presidencyName"
                            style={{ height: "35px" }}
                            onChange={(e) =>
                              setFieldValue("presidencyName", e.target.value)
                            }
                            className={`form-control form-select-lg ${
                              errors.presidencyName && touched.presidencyName
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
                                  if (option.label !== 1) {
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
                          {errors.presidencyName && touched.presidencyName ? (
                            <div className="invalid-feedback  errorMessageStyle mr-2 mb-3 mt-0">
                              {errors.presidencyName}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label
                              className="form-label mr-3"
                              htmlFor="maktobNo"
                            >
                              نام ریاست (دری)
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
                              id="presidencyName"
                              name="presidencyName"
                              onChange={(e) =>
                                setFieldValue("presidencyName", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("presidencyName", true)
                              }
                              className={`form-control ${
                                errors.presidencyName && touched.presidencyName
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.presidencyName && touched.presidencyName ? (
                              <div className="invalid-feedback d-block errorMessageStyle mr-2">
                                {errors.presidencyName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}

                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            د ریاست نوم (پښتو)
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
                            id="presidencyNamePashto"
                            placeholder="نوم/نام"
                            name="presidencyNamePashto"
                            onChange={(e) =>
                              setFieldValue(
                                "presidencyNamePashto",
                                e.target.value
                              )
                            }
                            onBlur={() =>
                              setFieldTouched("presidencyNamePashto", true)
                            }
                            className={`form-control ${
                              errors.presidencyNamePashto &&
                              touched.presidencyNamePashto
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.presidencyNamePashto &&
                          touched.presidencyNamePashto ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.presidencyNamePashto}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="form-check  mb-4">
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
                    <div className="row mb-4">
                      {/* presidentName & Presidency + presisdent */}
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            رئیس + نام ریاست(دری)
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
                            id="positionTitle"
                            placeholder="رئیس منابع بشري"
                            name="positionTitle"
                            onChange={(e) =>
                              setFieldValue("positionTitle", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("positionTitle", true)
                            }
                            className={`form-control ${
                              errors.positionTitle && touched.positionTitle
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.positionTitle && touched.positionTitle ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.positionTitle}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            د ریاست نوم + رئیس (پښتو)
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
                            id="positionTitlePashto"
                            placeholder="رئیس منابع بشري"
                            name="positionTitlePashto"
                            onChange={(e) =>
                              setFieldValue(
                                "positionTitlePashto",
                                e.target.value
                              )
                            }
                            onBlur={() =>
                              setFieldTouched("positionTitlePashto", true)
                            }
                            className={`form-control ${
                              errors.positionTitlePashto &&
                              touched.positionTitlePashto
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.positionTitlePashto &&
                          touched.positionTitlePashto ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.positionTitlePashto}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* نام ریس */}
                    <div className="row mb-4">
                      {/* نام ریس */}
                      <div className="col-md-6 col-sm-12">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            د رئیس نوم/ نام رئیس
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
                            id="presidentName"
                            placeholder="نوم/نام"
                            name="presidentName"
                            onChange={(e) =>
                              setFieldValue("presidentName", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("presidentName", true)
                            }
                            className={`form-control ${
                              errors.presidentName && touched.presidentName
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.presidentName && touched.presidentName ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.presidentName}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* Contact and Email */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            د ریاست د تلفن شمیره/ شماره تماس ریاست
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
                            id="phoneNo"
                            placeholder="0700000000000"
                            name="phoneNo"
                            onChange={(e) =>
                              setFieldValue("phoneNo", e.target.value)
                            }
                            onBlur={() => setFieldTouched("phoneNo", true)}
                            className={`form-control ${
                              errors.phoneNo && touched.phoneNo
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.phoneNo && touched.phoneNo ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.phoneNo}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            د ریاست برښنالیک/ ایمیل آدرس ریاست
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
                            type="email"
                            id="email"
                            dir="ltr"
                            placeholder="hr@tveta.gov.af"
                            name="email"
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            onBlur={() => setFieldTouched("email", true)}
                            className={`form-control ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                          />
                          {errors.email && touched.email ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.email}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row mb-4">
                      {userRole === "directorate" && (
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label
                              className="form-label mr-3"
                              htmlFor="director"
                            >
                              د آمر نوم / نام آمر
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
                              id="director"
                              placeholder="نوم/نام"
                              name="director"
                              onChange={(e) =>
                                setFieldValue("director", e.target.value)
                              }
                              onBlur={() => setFieldTouched("director", true)}
                              className={`form-control ${
                                errors.director && touched.director
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.director && touched.director ? (
                              <div className="invalid-feedback d-block errorMessageStyle mr-2">
                                {errors.director}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label
                            className="form-label mr-3"
                            htmlFor="directorateId"
                          >
                            د آمریت آیډی / آیدی آمریت
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
                            id="directorateId"
                            placeholder="arzyabi-dir@tveta.gov.af"
                            name="directorateId"
                            onChange={(e) =>
                              setFieldValue("directorateId", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("directorateId", true)
                            }
                            className={`form-control ${
                              errors.director && touched.director
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.directorateId && touched.directorateId ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.directorateId}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label
                            className="form-label mr-3"
                            htmlFor="directorate"
                          >
                            نام آمریت (دری)
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
                            id="directorate"
                            placeholder="آمریت ارزیابی"
                            name="directorate"
                            onChange={(e) =>
                              setFieldValue("directorate", e.target.value)
                            }
                            onBlur={() => setFieldTouched("directorate", true)}
                            className={`form-control ${
                              errors.directorate && touched.directorate
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.directorate && touched.directorate ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.directorate}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            د آمریت نوم (پښتو)
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
                            id="directoratePashto"
                            placeholder="د ارزونې آمریت"
                            name="directoratePashto"
                            onChange={(e) =>
                              setFieldValue("directoratePashto", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("directoratePashto", true)
                            }
                            className={`form-control ${
                              errors.directoratePashto &&
                              touched.directoratePashto
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.directoratePashto &&
                          touched.directoratePashto ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.directoratePashto}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="password">
                            نام آمریت (دری)
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
                            id="password"
                            placeholder=" *******"
                            name="password"
                            onChange={(e) =>
                              setFieldValue("password", e.target.value)
                            }
                            onBlur={() => setFieldTouched("password", true)}
                            className={`form-control ${
                              errors.password && touched.password
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.password && touched.password ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-outline">
                          <label className="form-label mr-3" htmlFor="">
                            د ریاست آیډی/ آیدی ریاست
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
                            id="directoratePashto"
                            placeholder="د ارزونې آمریت"
                            name="directoratePashto"
                            onChange={(e) =>
                              setFieldValue("directoratePashto", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("directoratePashto", true)
                            }
                            className={`form-control ${
                              errors.directoratePashto &&
                              touched.directoratePashto
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {errors.directoratePashto &&
                          touched.directoratePashto ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.directoratePashto}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div> */}
                  </>
                )}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-outline" dir="ltr">
                      <label className="form-label mr-3" htmlFor="presidencyId">
                        د ریاست آیډی/ ایدی ریاست
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
                        id="presidencyId"
                        placeholder="hr@tveta.gov.af"
                        name="presidencyId"
                        onChange={(e) =>
                          setFieldValue("presidencyId", e.target.value)
                        }
                        onBlur={() => setFieldTouched("presidencyId", true)}
                        className={`form-control ${
                          errors.presidencyId && touched.presidencyId
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {errors.presidencyId && touched.presidencyId ? (
                        <div className="invalid-feedback d-block errorMessageStyle mr-2">
                          {errors.presidencyId}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-outline">
                      <label className="form-label mr-3" htmlFor="password">
                        پسورد
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
                        type="password"
                        id="password"
                        placeholder="**********"
                        name="password"
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                        onBlur={() => setFieldTouched("password", true)}
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback d-block errorMessageStyle mr-2">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <>
                  <div className="row">
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
