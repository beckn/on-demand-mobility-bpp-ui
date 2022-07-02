import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../core/constant";
import "../Login.scss";

export const Login = (props) => {
  const [App, setApp] = useState(0);

  useEffect(() => {
    document.title = `taxi BPP`;
    let appTitle = (window.location.pathname === "/" && "Driver") || (window.location.pathname === AppRoutes.admin && "Taxi Admin");
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
            <div className="row w-100 justify-content-center">
              <div className="col-6">
                <h1>
                  Welcome <br /> to the {App} App
                </h1>
                 <Link to={AppRoutes.signInPassword} className="btn btn-outline-primary w-100 d-block">
                  Sign In with Email ID
                </Link>
                <Link to={AppRoutes.signInOtp} className="btn btn-outline-primary w-100 d-block mt-2">
                  Sign In with Mobile number
                </Link>
                <p className="mt-5">
                  New User? <Link to={AppRoutes.signUp}>Sign Up</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
