import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../core/constant";
import "../Login.scss";

export const SignUp = (props) => {
  const [App, setApp] = useState(0);

  useEffect((prop) => {
    document.title = `taxi BPP`;
    let appTitle = (window.location.pathname === "/" && "Driver") || (window.location.pathname === AppRoutes.admin && "Taxi Admin") || "Taxi Admin";
    setApp(appTitle);
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
                <div className="col-10">
                  <h1 className="mb-4">
                    Welcome <br /> to the {App} App
                  </h1>
                </div>
              </div>
              <div className="row w-100 justify-content-center">
                <div className="col-5 mb-3">
                  <input type="text" className="form-control" placeholder="First Name" />
                </div>
                <div className="col-5  mb-3">
                  <input type="text" className="form-control" placeholder="Last Name" />
                </div>
                <div className="col-5 mb-3">
                  <select name="" id="" className="form-select">
                    <option value="" selected disabled>
                      Select Association Name
                    </option>
                  </select>
                </div>
                <div className="col-5  mb-3">
                  <select name="" id="" className="form-select">
                    <option value="" selected disabled>
                      Select your role
                    </option>
                  </select>
                </div>
                <div className="col-5 mb-3">
                  <input type="text" className="form-control" placeholder="Enter Mobile Number" />
                </div>
                <div className="col-5  mb-3">
                  <input type="text" className="form-control" placeholder="Enter Email ID" />
                </div>
                <div className="col-5 mb-3">
                  <input type="text" className="form-control" placeholder="Create New Password" />
                </div>
                <div className="col-5  mb-3">
                  <input type="text" className="form-control" placeholder="Confirm Password" />
                </div>
              </div>
              <div className="row w-100 justify-content-center">
                <div className="col-5 d-grid">
                  <a href={AppRoutes.admin} className="btn btn-secondary">
                    cancel
                  </a>
                </div>
                <div className="col-5 d-grid">
                  <button className="btn btn-primary">submit</button>
                </div>
              </div>
              <div className="row w-100 justify-content-center">
                <div className="col-10">
                  <p className="mt-5">
                    Existing User? <Link to={AppRoutes.admin}>Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;
