import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { Formik, Field, Form } from "formik";
import Footer from "../components/footer";
import { Divider } from "@material-ui/core";
import { LoginValidationSchema } from "../assets/data/validation";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./pages.css";
import { UserContext } from "../context/userContext";
const Login = () => {
  const { setUser } = useContext(UserContext);
  const [initialValues, setInitialValues] = useState("");
  const [userIdErrorMessage, setuserIdErrorMessage] = useState("");
  const [confirmSessionExpiration, setConfirmSessionExpiration] =
    useState(false);
  const onSubmitForm_1 = (values) => {
    setInitialValues(values);
    console.log("valuse", values);
    axios
      .post("/api/user/login", {
        data: {
          userId: values.userId,
          password: values.password,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data.token);
        const userData = jwtDecode(res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        // setConfirmSessionExpiration(true);
        setTimeout(() => {
          window.location.href = "/";
          localStorage.removeItem("user");
          setUser(null);
        }, 60 * 60 * 60 * 1000);
      })
      .catch((err) => {
        setuserIdErrorMessage(err.response.data.message);
      });
  };

  const handleSessionExpiration = () => {
    setConfirmSessionExpiration(false);
  };

  return (
    <>
      <Header />{" "}
      <section class="py-5">
        <div class="container py-5 h-10 ">
          <div class="row d-flex justify-content-center align-items-center h-100 ">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5 ">
              <div
                class="card shadow-2-strong shadow"
                style={{ borderRadius: "1rem" }}
              >
                <Formik
                  initialValues={{
                    userId: "",
                    password: "",
                  }}
                  onSubmit={onSubmitForm_1}
                  validationSchema={LoginValidationSchema}
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
                      <div class="card-body p-5 text-center">
                        {userIdErrorMessage ? (
                          <div
                            style={{
                              color: "white",
                              backgroundColor: "red",
                              borderRadius: "1rem",
                              padding: "2px",
                            }}
                          >
                            {userIdErrorMessage}
                          </div>
                        ) : null}
                        <h3 class="mb-5">logo</h3>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="typeEmailX-2">
                            ایمیل
                          </label>
                          <input
                            // type="email"
                            id="userId"
                            name="userId"
                            class="form-control form-control-lg"
                            value={values.userId}
                            onChange={(e) =>
                              setFieldValue("userId", e.target.value)
                            }
                            onBlur={() => setFieldTouched("subject", true)}
                          />

                          {errors.userId && touched.userId ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.userId}
                            </div>
                          ) : null}
                        </div>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="typePasswordX-2">
                            رمز/ پسورډ
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-control form-control-lg"
                            value={values.password}
                            onChange={(e) =>
                              setFieldValue("password", e.target.value)
                            }
                            onBlur={() => setFieldTouched("password", true)}
                          />

                          {errors.password && touched.password ? (
                            <div className="invalid-feedback d-block errorMessageStyle mr-2">
                              {errors.password}
                            </div>
                          ) : null}
                        </div>

                        <button
                          class="btn bg-primary btn-lg btn-block mt-5"
                          // onClick={onSubmitForm_1}
                          type="submit"
                        >
                          ننوتل/ ورود
                        </button>
                        <br />
                        <div class="form-check d-flex justify-content-start mb-4">
                          <a href="#" className="pr-5">
                            پسورډ مو هیر کړی/ پسورد تانرا فراموش کرده اید؟
                          </a>
                        </div>
                        <hr class="my-4" />
                      </div>
                    </Form>
                  )}
                </Formik>
                {confirmSessionExpiration && (
                  <>
                    <div className="confirmation-modal">
                      <p>
                        ستاسو د لاگن وخت پوره دی په مهربانۍ سره بیا ځلي دننه شي
                      </p>
                      <p>وخت لاگن مسلسل شما تمام است لطفا دوباره لاگن شوید</p>
                      <div className="button-container">
                        <button
                          className="confirm-button bg-primary"
                          onClick={handleSessionExpiration}
                        >
                          تائید
                        </button>
                      </div>
                    </div>
                    <div className="backDrop_div"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
