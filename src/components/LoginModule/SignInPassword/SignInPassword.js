import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { isAuthenticated } from "../../../core/common.functions";
import { AppRoutes } from "../../../core/constant";
import { LeftSection } from "../../../shared/graphics/LeftSection";
import { DarkLayout } from "../../../shared/layout/DarkLayout";
import "../Login.scss";
import { userAction } from "../Login.services";

export const Login = (props) => {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    isAuthenticated();
    document.title = `taxi BPP`;
    // console.log(props);
    // spinnerService.show("mySpinner");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let path = "login";
    let data = {
      User: {
        Name: Name,
        Password: Password,
      },
    };
    userAction(path, data).then((res) => {
      window.location.href = AppRoutes.adminDashboard;
    });
  };

  return (
    <DarkLayout>
      <section>
        <Container fluid className="vh-100">
          <Row className="vh-100">
            <Col lg="3" className="p-0">
              <LeftSection />
            </Col>
            <Col lg="9" className="d-flex align-items-center">
              <div className="w-100">
                <div className="row w-100 justify-content-center">
                  <div className="col-6 mb-5">
                    <h1>
                      Welcome <br /> to the Taxi Admin App
                    </h1>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="row w-100 justify-content-center">
                    <div className="col-6">
                      <div className="row">
                        <div className="col mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Email ID"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-3">
                          <input
                            type="password"
                            className="form-control"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <Link to="#" className="link-primary">Forgot Password</Link>
                        </div>
                        <div className="col text-end">
                          <Link to={AppRoutes.signInOtp} className="link-primary">
                            Sign in with Mobile
                          </Link>
                        </div>
                      </div>
                      <div className="row">
                        <button type="submit" className="btn btn-primary">Sign In</button>
                        <Link to={AppRoutes.admin} role="button" type="reset" className="link-primary">
                          Cancel
                        </Link>
                      </div>
                      <div className="row mt-5">
                        <div className="col">
                          New User? <Link to={AppRoutes.signUp} className="link-primary">Sign Up</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </DarkLayout>
  );
};

export default Login;
