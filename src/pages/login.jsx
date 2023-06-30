import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Divider } from "@material-ui/core";
import axios from "axios";
import "./pages.css";
const Login = () => {
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
                <div class="card-body p-5 text-center">
                  <h3 class="mb-5">ننوتل</h3>

                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typeEmailX-2">
                      ایمیل
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typePasswordX-2">
                      رمز/ پسورډ
                    </label>
                  </div>

                  <button class="btn bg-primary btn-lg btn-block" type="submit">
                    Login
                  </button>
                  <br />
                  <div class="form-check d-flex justify-content-start mb-4">
                    <a href="#" className="pr-5">
                      تاسو خپل رمز هیر کړی؟
                    </a>
                  </div>
                  <hr class="my-4" />
                </div>
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
