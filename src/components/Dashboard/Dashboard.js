import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Modal, Nav, Row, Tab } from "react-bootstrap";
import { getAddress } from "../../core/common.functions";
import { LocalKey } from "../../core/constant";
import { getCookie } from "../../core/CookiesHandler";
import { AgentVerification, DriverIcon, VehicleIcon, AgentsIcon, RidesIcon, RevenueIcon } from "../../shared/icons";
import "./Dashboard.scss";
import { getUserSummaries } from "./Dashboard.Services";
const DriversVehicles = React.lazy(() => import("../DriversVehicles/DriversVehicles"));
const Account = React.lazy(() => import("../Account/Account"));

export const Dashboard = () => {
  const [activeScreen, setActiveScreen] = useState("home");
  const [screenId, setScreenId] = useState();
  const [user] = useState(JSON.parse(getCookie(LocalKey.saveUser)));
  const [summaries, setSummaries] = useState(0);
  const [drivers, setDrivers] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  // const [driverList, setDriverList] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    document.title = `taxi BPP DashBoard`;
    getScreen();
  };

  const getScreen = () => {
    if (isEmpty(getAddress(user)) || user.Verified === "N") {
      setActiveScreen("profile");
      isEmpty(getAddress(user)) && setShow(true);
      !isEmpty(getAddress(user)) && user.Verified === "N" && setShow(true);
    } else {
      getUserSummaries().then((res) => {
        setSummaries(res);
        res.UserSummaries.forEach((user) => {
          if (user.Role?.Name?.toLowerCase() === "driver") {
            setDrivers(+user.UserCount);
          }
        });
        res.VehicleSummaries?.forEach((vh) => {
          setVehicles(vh.VehicleCount);
        });
      });
    }
  };

  const navigateToScreen = (tabId, screenId) => {
    setActiveScreen(tabId);
    setScreenId(screenId);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <section className="dashboard">
      <Container fluid className="vh-100">
        <Row>
          <Col>
            <Tab.Container onSelect={(k) => setActiveScreen(k)} activeKey={activeScreen}>
              <Row className="vh-100">
                <Col xxl={2} lg={2} className="position-relative bg-dark left-section rounded-0">
                  <div className="round-2"></div>
                  <Nav variant="pills" className="flex-column mt-4 me-n3 position-relative">
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="home" disabled={user.Verified === "N"}>
                        Home
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="drivers" disabled={user.Verified === "N"}>
                        Drivers / Vehicles
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="agents" disabled>
                        Agents
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="documents" disabled>
                        Documents
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="verification" disabled>
                        Verification
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="profile">
                        User Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link role={"button"} eventKey="support" disabled>
                        Support
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col xxl={10} sm={10} className="py-3">
                  <Tab.Content>
                    <Tab.Pane eventKey="home">
                      <div className="row w-100 justify-content-left">
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => navigateToScreen("drivers","Tdrvier")}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><DriverIcon className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Total Drivers</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{drivers}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => navigateToScreen("drivers", "Tvehicle")}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><VehicleIcon className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Total Vehicles</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{+vehicles}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => {}}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><AgentsIcon className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Total Agents</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{0}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => {}}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><RidesIcon className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Total Rides</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{0}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => {}}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><RevenueIcon className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Total Revenue</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{0}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => {}}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><AgentVerification className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Agent Verification Pending</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{0}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => {}}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><DriverIcon className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Driver Verification Pending</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{0}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-3">
                          <div className="card bg-dark h-100 dashboard-card" role={"button"} onClick={(e) => {}}>
                            <div className="row g-0 h-100">
                              <div className="col-md-4 d-flex justify-content-center align-items-center icon-col"><VehicleIcon className="w-50"/></div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title fs-6 fw-normal">Vehicle Verification Pending</h5>
                                  <h6 className="fs-4 fw-semibold mt-auto">{0}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="drivers">{summaries && <DriversVehicles summaries={summaries} activeScreenId={screenId} />}</Tab.Pane>
                    <Tab.Pane eventKey="agents">Agents</Tab.Pane>
                    <Tab.Pane eventKey="documents">Documents</Tab.Pane>
                    <Tab.Pane eventKey="verification">Verification</Tab.Pane>
                    <Tab.Pane eventKey="profile">
                      <Account User={user} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="support">Support</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="text-center">
          {user.DriverDocuments && user.Verified === "N" ? (
            <>
              <h5>Verification Pending for document(s)</h5>
              <p className="text-muted">wait for confirmation to continue!</p>
            </>
          ) : (
            <>
              <h4>Please complete the registration</h4>
              <p className="text-muted">in order to continue!</p>
            </>
          )}
          <button className="btn btn-dark w-50" onClick={handleClose}>
            Account
          </button>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Dashboard;
