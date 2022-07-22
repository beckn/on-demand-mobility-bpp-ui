/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../core/common.functions";
import { AppRoutes } from "../../../core/constant";
import { LeftSection } from "../../../shared/graphics/LeftSection";
import { DarkLayout } from "../../../shared/layout/DarkLayout";
import "../Login.scss";
import { getCompanies, getRoles, userAction } from "../Login.services";

export const SignInPassword = () => {
  const navigate = useNavigate();
  const [Associations, setAssociation] = useState(null);
  const [Roles, setRoles] = useState(0);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Company, setCompany] = useState("");
  const [Role, setRole] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Name, setName] = useState("");
  const [Password1, setPassword1] = useState("");
  const [Password2, setPassword2] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    isAuthenticated();
    document.title = `taxi BPP - Sign up`;
    !Associations && getRequiredList();
    // spinnerService.show(LocalKey.spinnerKey);
  };

  const navigateTo = (key) => navigate(key);

  const getRequiredList = () => {
    let initData = [getCompanies("companies"), getRoles("roles")];
    Promise.all(initData).then((allData) => {
      // console.log("All Predata", allData);
      setAssociation(allData[0].data.Companies);
      setRoles(allData[1].data.Roles);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // window.location.href = AppRoutes.adminDashboard;
    let path = "login";
    let data = {
      User: {
        Name: Name,
        Password: Password1,
        Password2: Password2,
        LongName: FirstName.concat(" ", LastName),
        PhoneNumber: PhoneNumber,
        Company: {
          Id: Company,
        },
        UserRole: {
          Id: Role,
        },
      },
    };
    userAction(path, data).then((res) => {
      navigateTo(AppRoutes.adminDashboard);
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
                  <div className="col-10">
                    <h1 className="mb-4">
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
                    <div className="col-5 mb-3">
                      <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-5  mb-3">
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-5 mb-3">
                      <select
                        name="Company"
                        id="Company"
                        defaultValue={Company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="form-select"
                      >
                        <option value="" selected disabled>
                          Select Association Name
                        </option>
                        {Associations &&
                          Associations.map((x) => (
                            <option value={x.Id} key={x.Id}>
                              {x.Name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-5  mb-3">
                      <select
                        name="Role"
                        id="Role"
                        defaultValue={Role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-select"
                      >
                        <option value="" selected disabled>
                          Select your role
                        </option>
                        {Roles &&
                          Roles.map((x) => (
                            <option value={x.Id} key={x.Id}>
                              {x.Name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-5 mb-3">
                      <input
                        type="text"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        value={PhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="form-control"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                    <div className="col-5  mb-3">
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        placeholder="Enter Email ID"
                      />
                    </div>
                    <div className="col-5 mb-3">
                      <input
                        type="password"
                        name="Password1"
                        id="Password1"
                        value={Password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        className="form-control"
                        placeholder="Create New Password"
                      />
                    </div>
                    <div className="col-5  mb-3">
                      <input
                        type="password"
                        name="Password2"
                        id="Password2"
                        value={Password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        className="form-control"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                  <div className="row w-100 justify-content-center">
                    <div className="col-5 d-grid">
                      <a
                        href={AppRoutes.admin}
                        role="button"
                        type="reset"
                        className="btn btn-dark"
                      >
                        cancel
                      </a>
                    </div>
                    <div className="col-5 d-grid">
                      <button className="btn btn-primary" type="submit">
                        submit
                      </button>
                    </div>
                  </div>
                </form>
                <div className="row w-100 justify-content-center">
                  <div className="col-10">
                    <p className="mt-5">
                      Existing User? <Link to={AppRoutes.admin} className="link-primary">Sign In</Link>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </DarkLayout>
  );
};

export default SignInPassword;
