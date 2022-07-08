import { spinnerService } from "@simply007org/react-spinners";
import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { getAddress } from "../../core/common.functions";
import { LocalKey } from "../../core/constant";
import { getCookie } from "../../core/CookiesHandler";
import "./Dashboard.scss";

export const Dashboard = () => {
  const [activeScreen, setActiveScreen] = useState("home");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    document.title = `taxi BPP DashBoard`;
    // getScreen();
  };

  const getScreen = () => {
    let user = JSON.parse(getCookie(LocalKey.saveUser));
    if (isEmpty(getAddress(user)) || user.Verified === "N") {
      setActiveScreen("account");
      !isEmpty(getAddress(user)) && user.Verified === "N" && spinnerService.show(LocalKey.spinnerKey);
    }
  };

  return (
    <section>
      <Container fluid className="vh-100">
        <Row>
          <Col>
            <Tab.Container onSelect={(k) => setActiveScreen(k)} activeKey={activeScreen}>
              <Row className="vh-100">
                <Col xxl={2} lg={2} className="position-relative bg-dark left-section rounded-0">
                  <Nav variant="pills" className="flex-column mt-4 me-n3">
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="home">
                        Home
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="drivers">
                        Drivers / Vehicles
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="documents">
                        Documents
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="verification">
                        Verification
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="account">
                        Account
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="support">
                        Support
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="round-2"></div>
                </Col>
                <Col xxl={10} sm={10} className="py-3">
                  <Tab.Content>
                    <Tab.Pane eventKey="home">
                      <div className="row w-100 justify-content-left">
                        <div className="col-3 mb-3">
                          <div class="card text-white bg-dark" role={"button"}>
                            <div class="row g-0">
                              <div class="col-md-4 bg-white bg-opacity-10">Icon</div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">Total Drivers</h5>
                                  <h6>21</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 mb-3">
                          <div class="card text-white bg-dark" role={"button"}>
                            <div class="row g-0">
                              <div class="col-md-4 bg-white bg-opacity-10">Icon</div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">Total Drivers</h5>
                                  <h6>21</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 mb-3">
                          <div class="card text-white bg-dark" role={"button"}>
                            <div class="row g-0">
                              <div class="col-md-4 bg-white bg-opacity-10">Icon</div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">Total Drivers</h5>
                                  <h6>21</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 mb-3">
                          <div class="card text-white bg-dark" role={"button"}>
                            <div class="row g-0">
                              <div class="col-md-4 bg-white bg-opacity-10">Icon</div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">Total Drivers</h5>
                                  <h6>21</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 mb-3">
                          <div class="card text-white bg-dark" role={"button"}>
                            <div class="row g-0">
                              <div class="col-md-4 bg-white bg-opacity-10">Icon</div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">Total Drivers</h5>
                                  <h6>21</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 mb-3">
                          <div class="card text-white bg-dark" role={"button"}>
                            <div class="row g-0">
                              <div class="col-md-4 bg-white bg-opacity-10">Icon</div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">Total Drivers</h5>
                                  <h6>21</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="drivers">Drivers / Vehicles</Tab.Pane>
                    <Tab.Pane eventKey="documents">Documents</Tab.Pane>
                    <Tab.Pane eventKey="verification">Verification</Tab.Pane>
                    <Tab.Pane eventKey="account">
                      <form onSubmit={(e) => {}}>
                        <h4>Personal Information:</h4>
                        <hr className="my-4" />
                        <div className="row w-100 justify-content-left">
                          <div className="col-5 mb-3">
                            <input type="text" name="FirstName" id="FirstName" className="form-control" placeholder="First Name" />
                          </div>
                          <div className="col-5  mb-3">
                            <input type="text" name="LastName" id="LastName" className="form-control" placeholder="Last Name" />
                          </div>
                        </div>
                        <div className="row w-100 justify-content-left">
                          <div className="col-5 mb-3">
                            <input type="text" name="FirstName" id="FirstName" className="form-control" placeholder="First Name" />
                          </div>
                          <div className="col-5  mb-3">
                            <input type="text" name="LastName" id="LastName" className="form-control" placeholder="Last Name" />
                          </div>
                        </div>
                        <h4 className="mt-3">Personal Documents:</h4>
                        <hr className="my-4" />
                        <div className="row w-100 justify-content-left">
                          <div className="col-5 mb-3">
                            <input type="text" name="FirstName" id="FirstName" className="form-control" placeholder="First Name" />
                          </div>
                          <div className="col-5  mb-3">
                            <input type="text" name="LastName" id="LastName" className="form-control" placeholder="Last Name" />
                          </div>
                        </div>
                        <div className="row w-100 justify-content-left">
                          <div className="col-5 mb-3">
                            <input type="text" name="FirstName" id="FirstName" className="form-control" placeholder="First Name" />
                          </div>
                          <div className="col-5  mb-3">
                            <input type="text" name="LastName" id="LastName" className="form-control" placeholder="Last Name" />
                          </div>
                        </div>
                        <div className="row w-100 justify-content-center">
                          <div className="col-5 d-grid">
                            <button className="btn btn-primary" type="submit">
                              Next
                            </button>
                          </div>
                        </div>
                      </form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="support">Support</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
