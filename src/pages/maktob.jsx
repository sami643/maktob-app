import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Divider } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

import "./pages.css";
const Maktob = () => {
  return (
    <>
      <Header />

      <div className="main-container">
        {" "}
        <h1 className="container-header">مکتوب</h1> <Divider />
        <Formik
          initialValues={{ name: "Rahimi", email: "sdfsdf" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <Row className="form-body">
              <Col>
                {" "}
                <Field name="name" type="text" />
              </Col>
              <Col>
                {" "}
                <textarea name="email" type="email" />
              </Col>
              <Col>
                {" "}
                <Button type="submit">ذخیره وپرنت</Button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </div>

      <Footer />
    </>
  );
};

export default Maktob;
