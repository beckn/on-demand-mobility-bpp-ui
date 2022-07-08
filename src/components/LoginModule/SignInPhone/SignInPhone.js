import { useEffect } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { isAuthenticated } from "../../../core/common.functions";
import { AppRoutes, LocalKey } from "../../../core/constant";
import "../Login.scss";

export const SignInPhone = (props) => {
  useEffect(() => {
    isAuthenticated();
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
                      <input type="text" className="form-control" placeholder="Enter your Mobile number" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <a href={AppRoutes.admin} className="btn d-block btn-secondary">
                        cancel
                      </a>
                    </div>
                    <div className="col d-grid">
                      <button className="btn btn-primary">Send Otp</button>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      New User? <a href={AppRoutes.signUp}>Sign Up</a>
                    </div>
                    <div className="col text-end">
                      <a href={AppRoutes.signInPassword}>Sign in with Email</a>
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

export default SignInPhone;
