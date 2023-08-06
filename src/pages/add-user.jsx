import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import { Formik, Field, Form } from "formik";
import { Checkbox, Divider } from "@material-ui/core";

import {
  higherAuthorityOptions,
  presidenciesForSelectOptions,
  userTypesOptions,
  higherAuthorityOptionsPashto,
} from "./../assets/data/data.js";

const SignUp = () => {
  const [isBtnChecked, setIsBtnChecked] = useState(false);
  const addUserInitialValue = { userId: "" };
  const [userRole, setUserRole] = useState("");

  return (
    <Sidebar>
      <Header />
      <div className="main-container text-right">
        <h1 className="container-header">اکونت جدید</h1>
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
              <>
                <div className="row mb-4">
                  <div className="form-outline col">
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
                      {higherAuthorityOptions.map((option) => (
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
                  <div className="form-outline col">
                    <label className="form-label mr-3" htmlFor="subject">
                      مقام لوړپوړی
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
                      {higherAuthorityOptionsPashto.map((option) => (
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
                <div className="row mb-4">
                  {!isBtnChecked ? (
                    <div className="form-outline col-6">
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
                      {errors.recipent && touched.recipent ? (
                        <div className="invalid-feedback  errorMessageStyle mr-2 mb-3 mt-0">
                          {errors.recipent}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label mr-3" htmlFor="maktobNo">
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
                          id="userId"
                          name="userId"
                          onChange={(e) =>
                            setFieldValue("userId", e.target.value)
                          }
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
                  )}

                  <div className="col">
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
                        id="password"
                        placeholder="نوم/نام"
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
                  {/* PresidentName & Presidency + presisdent */}
                  <div className="col">
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
                        id="password"
                        placeholder="رئیس منابع بشري"
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

                  <div className="col">
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
                        id="password"
                        placeholder="رئیس منابع بشري"
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

                {/*  */}
                <div className="row mb-4">
                  {/* نام ریس */}
                  <div className="col-6">
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
                        id="password"
                        placeholder="نوم/نام"
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
                {/* Contact and Email */}
                <div className="row mb-4">
                  <div className="col">
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
                        id="password"
                        placeholder="0700000000000"
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
                  <div className="col">
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
                        id="password"
                        dir="ltr"
                        placeholder="hr@tveta.gov.af"
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
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline" dir="ltr">
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
                        placeholder="hr@tveta.gov.af"
                        name="userId"
                        onChange={(e) =>
                          setFieldValue("userId", e.target.value)
                        }
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

                  <div className="col">
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
                {/* Defineing UserRole */}
                <div className="row mb-4">
                  {/* Defining The User */}
                  <div className="form-outline col-6">
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
                      onChange={(e) => {
                        setFieldValue("maktobType", e.target.value);
                        setUserRole(e.target.value);
                      }}
                      className={`form-control form-select-lg ${
                        errors.maktobType && touched.maktobType
                          ? "is-invalid form-select-lg    "
                          : ""
                      }`}
                      aria-label=".form-select-lg example"
                    >
                      <option selected disabled>
                        وټاکئ/انتخاب
                      </option>
                      {userTypesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
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

                  {userRole === "directorate" && (
                    <div className="col-6">
                      <div className="form-outline">
                        <label className="form-label mr-3" htmlFor="password">
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
                          id="password"
                          placeholder="نوم/نام"
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
                  )}
                </div>
                {userRole === "directorate" && (
                  <>
                    {/* ِDirectorate */}
                    <div className="row mb-4">
                      <div className="col">
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
                            type="email"
                            id="password"
                            placeholder="آمریت ارزیابی"
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

                      <div className="col">
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
                            id="password"
                            placeholder="د ارزونې آمریت"
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
                  </>
                )}

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
