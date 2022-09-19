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
      window.location.href = AppRoutes.driverDashboard;
    });
  };

  return (
    <DarkLayout>
      <section>
        <Container fluid className="vh-100">
        <Link
             to={AppRoutes.admin}
              role="button"
             className="link-primary">
             <span>&#60;</span>
              back
            </Link>
             {/* <span >
            <button><span>&#60;</span> Back</button>
         </span>  */}
          <Row className="vh-100">
            <Col lg="3" className="p-0">
              <LeftSection />
            </Col>
            <Col
              lg="9"
              className="d-flex align-items-center justify-content-center" >
              <div className="w-100">
                <div className="row w-100 justify-content-center ">
                  <div className="mb-4 col-9 col-lg-6 mx-md-n6  ">
                    <h2>
                      Welcome to<br/>the  Taxi Admin App
                    </h2>
                  </div>
                </div> 
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="row w-100 justify-content-center">
                    <div className="col-6 col-12 col-lg-6">
                      <div className="row">
                        <div className="col mb-4 ">
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
                        <div className="col mb-3 ">
                          <input
                            type="password "
                            className="form-control bi bi-eye-slash"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password "
                          />
                        </div>
                      </div>
                      <div className="row mb-3 ">
                        <div className="col col-6 ">
                          <Link to="#" className="link-primary">
                            Forgot Password
                          </Link>
                        </div>
                        <div className="col text-end">
                          <Link
                            to={AppRoutes.signInOtp}
                            className="link-primary"
                          >
                            Sign in with Mobile
                          </Link>
                        </div>
                      </div>
                      <div className="row mb-5  btn-lg btn-block" >
                        <button type="submit" className="btn btn-primary mb-5 mt-1 ">
                          Sign In
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-12 pt-5 d-flex justify-content-end">
                          New User? {" "} 

                           <Link to={AppRoutes.signUp} className="link-primary">
                            Sign Up
                          </Link>
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
