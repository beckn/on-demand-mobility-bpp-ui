import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes, LocalKey } from "../../../core/constant";
import "../Login.scss";
import { getCompanies, getRoles, userRegister } from "../Login.services";

export const SignInPassword = () => {
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
    if (Associations === null) {
      init();
    }
    console.log("useEffect");
  }, []);

  const init = () => {
    document.title = `taxi BPP Sing up`;
    !Associations && getRequiredList();
    // spinnerService.show(LocalKey.spinnerKey);
  };

  const getRequiredList = () => {
    let initData = [getCompanies("companies"), getRoles("roles")];
    Promise.all(initData).then((allData) => {
      console.log("All Predata", allData);
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
    const x = [FirstName, LastName, Company, Role, PhoneNumber, Name, Password1, Password2];
    console.log(
      "formData = ",
      x.reduce((a, v) => ({ ...a, [v]: v }), {}),
      data
    );
    userRegister(path, data).then((res) => {
      console.log("alksdfjlkasdf", res.data);
      // window.location.href = AppRoutes.adminDashboard;
    });
  };

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
                    <input type="text" name="FirstName" id="FirstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" placeholder="First Name" />
                  </div>
                  <div className="col-5  mb-3">
                    <input type="text" name="LastName" id="LastName" value={LastName} onChange={(e) => setLastName(e.target.value)} className="form-control" placeholder="Last Name" />
                  </div>
                  <div className="col-5 mb-3">
                    <select name="Company" id="Company" defaultValue={Company} onChange={(e) => setCompany(e.target.value)} className="form-select">
                      <option value="" selected disabled>
                        Select Association Name
                      </option>
                      {Associations && Associations.map((x) => <option value={x.Id}>{x.Name}</option>)}
                    </select>
                  </div>
                  <div className="col-5  mb-3">
                    <select name="Role" id="Role" defaultValue={Role} onChange={(e) => setRole(e.target.value)} className="form-select">
                      <option value="" selected disabled>
                        Select your role
                      </option>
                      {Roles && Roles.map((x) => <option value={x.Id}>{x.Name}</option>)}
                    </select>
                  </div>
                  <div className="col-5 mb-3">
                    <input type="text" name="PhoneNumber" id="PhoneNumber" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" placeholder="Enter Mobile Number" />
                  </div>
                  <div className="col-5  mb-3">
                    <input type="text" name="Name" id="Name" value={Name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Email ID" />
                  </div>
                  <div className="col-5 mb-3">
                    <input type="password" name="Password1" id="Password1" value={Password1} onChange={(e) => setPassword1(e.target.value)} className="form-control" placeholder="Create New Password" />
                  </div>
                  <div className="col-5  mb-3">
                    <input type="password" name="Password2" id="Password2" value={Password2} onChange={(e) => setPassword2(e.target.value)} className="form-control" placeholder="Confirm Password" />
                  </div>
                </div>
                <div className="row w-100 justify-content-center">
                  <div className="col-5 d-grid">
                    <a href={AppRoutes.admin} role="button" type="reset" className="btn btn-secondary">
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

export default SignInPassword;
