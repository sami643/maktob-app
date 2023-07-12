import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import "./pages.css";
import ProfilePhoto from "../assets/img/profile.png";
import HeaderNav from "../components/header-nav";
import { Checkbox, Divider } from "@material-ui/core";
import { useState } from "react";
import { Formik, Field, Form } from "formik";

const Profile = () => {
  const [isProfileState, setIsisProfileState] = useState(true);
  const [isChangePasswordState, setIsChangePasswordState] = useState(false);

  const handleState = (event) => {
    setIsisProfileState(event);
  };
  const handleUpdateForm = (event) => {
    console.log("this handle page Called");
  };
  return (
    <Sidebar>
      <Header />
      {/* <HeaderNav /> */}

      <div className="main-container  text-right p-5">
        <h1 className="display-3 pr-5 pb-2 profileHeader ">پروفایل</h1>
        <Divider />
        {isProfileState ? (
          <>
            <div class="col-lg-4 col-md-12  ">
              <div class="car mb-4">
                <div class="card-body text-center">
                  <img
                    src={ProfilePhoto}
                    alt="avatar"
                    class="rounded-circle img-fluid"
                    style={{ width: "150px  " }}
                  />
                  <h5 class="my-3">احمد هلال </h5>
                  <p class="text-muted mb-1">د بشری سرچینو د ریاست رئیس</p>
                  <p class="text-muted mb-4">رئیس منابع بشری </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12  mb-5 ">
              <div className="mb-5 mt-5">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">نوم/ نام</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">سمیع الله رحیمی</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">دنده/ وظیفه</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">رئیس</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">د ریاست نوم/ نام ریاست</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">ریاست منابع بشری</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">د اړیکې شمیره/ شماره تماس</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(098) 765-4321</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">برښنالیک/ ایمیل آدرس</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">hr@tveta.gov.af</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-left  profileEditButtonDiv  ">
              <button
                type="button"
                className="btn bg-primary button-1  ml-5"
                onClick={() => {
                  handleState(false);
                }}
              >
                تغیر
              </button>
            </div>
          </>
        ) : (
          <>
            <Formik
              initialValues={{
                userName: "d",
                contactNo: "Job",
                email: "10",
              }}
              onSubmit={handleUpdateForm}
              // enableReinitialize={true}
              // validationSchema={pishnihaadValidationSchema}
            >
              {({
                values,
                setFieldValue,
                setFieldTouched,
                touched,
                errors,
              }) => (
                <Form className="m-5">
                  <div className="row mb-4 ">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-outline">
                        <label className="form-label mr-3" htmlFor="maktobNo">
                          نوم / نام
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
                          id="jobTitle"
                          name="jobTitle"
                          className={`form-control ${
                            errors.jobTitle && touched.jobTitle
                              ? "is-invalid"
                              : ""
                          }`}
                          value={values.jobTitle}
                          onChange={(e) =>
                            setFieldValue("jobTitle", e.target.value)
                          }
                          onBlur={() => setFieldTouched("jobTitle", true)}
                        />
                        {errors.jobTitle && touched.userName ? (
                          <div className="invalid-feedback d-block errorMessageStyle mr-2">
                            {errors.jobTitle}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-outline">
                        <label className="form-label mr-3" htmlFor="maktobNo">
                          د تلفن شمیره/ شماره تماس
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
                          className={`form-control ${
                            errors.userId && touched.userId ? "is-invalid" : ""
                          }`}
                          value={values.userId}
                          onChange={(e) =>
                            setFieldValue("userId", e.target.value)
                          }
                          onBlur={() => setFieldTouched("userId", true)}
                        />
                        {errors.userId && touched.userId ? (
                          <div className="invalid-feedback d-block errorMessageStyle mr-2">
                            {errors.userId}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4 ">
                    <div className="col-lg-6 ">
                      <div className="form-outline">
                        <label className="form-label mr-3" htmlFor="maktobNo">
                          برښنالیک/ ایمیل
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
                          id="jobTitle"
                          name="jobTitle"
                          className={`form-control ${
                            errors.jobTitle && touched.jobTitle
                              ? "is-invalid"
                              : ""
                          }`}
                          value={values.jobTitle}
                          onChange={(e) =>
                            setFieldValue("jobTitle", e.target.value)
                          }
                          onBlur={() => setFieldTouched("jobTitle", true)}
                        />
                        {errors.jobTitle && touched.userName ? (
                          <div className="invalid-feedback d-block errorMessageStyle mr-2">
                            {errors.jobTitle}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div class="form-check mr-5 mb-4" style={{ marginTop: "6%" }}>
                    <label
                      className="form-check-label"
                      for="flexCheckChecked mr-5"
                    >
                      د پسورد بدلول/ تغیر پسورد
                    </label>
                    <input
                      className="form-check-input mr-3"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      onChange={(e) =>
                        setIsChangePasswordState(e.target.checked)
                      }
                    />
                  </div>
                  {isChangePasswordState && (
                    <>
                      <div className="row  mx-5 mb-3">
                        {" "}
                        <div className="col-6">
                          <div className="form-outline">
                            <label
                              className="form-label mr-3"
                              htmlFor="maktobNo"
                            >
                              اوسنی پسورد / پسورد فعلی
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
                              id="jobTitle"
                              name="jobTitle"
                              className={`form-control ${
                                errors.jobTitle && touched.jobTitle
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={values.jobTitle}
                              onChange={(e) =>
                                setFieldValue("jobTitle", e.target.value)
                              }
                              onBlur={() => setFieldTouched("jobTitle", true)}
                            />
                            {errors.jobTitle && touched.userName ? (
                              <div className="invalid-feedback d-block errorMessageStyle mr-2">
                                {errors.jobTitle}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row mx-5  mb-3">
                        {" "}
                        <div className="col-6">
                          <div className="form-outline">
                            <label
                              className="form-label mr-3"
                              htmlFor="maktobNo"
                            >
                              نوی پسورد/ پسورد جدید
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
                              id="jobTitle"
                              name="jobTitle"
                              className={`form-control ${
                                errors.jobTitle && touched.jobTitle
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={values.jobTitle}
                              onChange={(e) =>
                                setFieldValue("jobTitle", e.target.value)
                              }
                              onBlur={() => setFieldTouched("jobTitle", true)}
                            />
                            {errors.jobTitle && touched.userName ? (
                              <div className="invalid-feedback d-block errorMessageStyle mr-2">
                                {errors.jobTitle}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row mx-5  mb-3">
                        {" "}
                        <div className="col-6">
                          <div className="form-outline">
                            <label
                              className="form-label mr-3"
                              htmlFor="maktobNo"
                            >
                              د نوی پسورد تائید / تائید پسورد جدید
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
                              id="jobTitle"
                              name="jobTitle"
                              className={`form-control ${
                                errors.jobTitle && touched.jobTitle
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={values.jobTitle}
                              onChange={(e) =>
                                setFieldValue("jobTitle", e.target.value)
                              }
                              onBlur={() => setFieldTouched("jobTitle", true)}
                            />
                            {errors.jobTitle && touched.userName ? (
                              <div className="invalid-feedback d-block errorMessageStyle mr-2">
                                {errors.jobTitle}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className=" row   print_btn_div   ">
                    <div className=" col text-right">
                      <button
                        onClick={() => {
                          handleState(true);
                        }}
                        className=" btn  bg-primary button-1 px-5 m-2 p-2"
                      >
                        مخکنۍ صفحه/ صفحه قبلی
                      </button>
                    </div>

                    <div
                      className=" col text-left "
                      style={{ marginLeft: "6%" }}
                    >
                      <button
                        className="btn bg-primary button-1 px-5 m-2 p-2 "
                        onClick={() => {}}
                      >
                        ثبت
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}{" "}
      </div>

      <Footer />
    </Sidebar>
  );
};

export default Profile;
