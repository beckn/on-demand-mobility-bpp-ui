import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { AppRoutes } from "../../../core/constant";
import "../Login.scss";

export const Login = (props) => {
  const [Name, setName] = useState("");
  const [Password1, setPassword1] = useState("");

  useEffect(() => {
    document.title = `taxi BPP`;
    console.log(props);
    // spinnerService.show("mySpinner");
  });

  return (
    <section>
      <Container fluid className="vh-100">
        <Row className="vh-100">
          <Col xxl="3" className="position-relative bg-dark left-section">
            <div className="round-1"></div>
            <div className="round-2"></div>
          </Col>
          <Col xxl="9" className="d-flex align-items-center">
            <div className="w-100">
              <div className="row w-100 justify-content-center">
                <div className="col-6 mb-5">
                  <h1>
                    Welcome <br /> to the Taxi Admin App
                  </h1>
                </div>
              </div>
              <div className="row w-100 justify-content-center">
                <div className="col-6">
                  <div className="row">
                    <div className="col mb-3">
                      <input type="text" className="form-control" placeholder="Enter Email ID" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-3">
                      <input type="text" className="form-control" placeholder="Enter Password" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <a href="#.">Forgot Password</a>
                    </div>
                    <div className="col text-end">
                      <a href={AppRoutes.signInOtp}>Sign in with Mobile</a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <a href={AppRoutes.admin} className="btn d-block btn-secondary">
                        cancel
                      </a>
                    </div>
                    <div className="col-6 d-grid">
                      <button className="btn btn-primary">Sign In</button>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      New User? <a href={AppRoutes.signUp}>Sign Up</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
