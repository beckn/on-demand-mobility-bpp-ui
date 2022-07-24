import { useEffect, useState } from "react";
import { Tab, Tabs, Modal, Table } from "react-bootstrap";
import { getAddress, getStingToObject } from "../../core/common.functions";
import { AppRoutes, commonMsg, LocalKey } from "../../core/constant";
import { DriverGrid, VehicleGrid, verificationKeys } from "../../shared/constant";
import TableGridDriver from "../../shared/TableGrid/TableGridDriver";
import { getUsers } from "../Dashboard/Dashboard.Services";
import AddDriver from "./AddDriver";
import { toast } from "react-toastify";
import { getVehicles, verify } from "./DriversVehicles.Services";
import DriverVerification from "./DriverVerification";
import { getCookie } from "../../core/CookiesHandler";
import TableGridVehicle from "../../shared/TableGrid/TableGridVehicle";
import AddVehicle from "./AddVehicle/AddVehicle";

export const DriversVehicles = (prop) => {
  const [logUser] = useState(JSON.parse(getCookie(LocalKey.saveUser)));
  const [driverList, setDriverList] = useState("");
  const [vehicleList, setVehicleList] = useState("");
  const [selectedDriver, setSelectedDriver] = useState({});
  const [drivers, setDrivers] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [vehiclesVerified, setVehiclesVerified] = useState(0);
  const [vehiclesPending, setVehiclesPending] = useState(0);
  const [driversVerified, setDriversVerified] = useState(0);
  const [driversPending, setDriversPending] = useState(0);
  const [isAddDriver, setIsAddDriver] = useState(false);
  const [isAddVehicle, setIsAddVehicle] = useState(false);
  const [driverEdit, setDriverEdit] = useState("");
  const [vehicleEdit, setVehicleEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [verifyKey, setVerifyKey] = useState("");

  const handleModalClose = () => {
    setModalShow(false);
    setDeriversList();
  };
  const handleModalShow = () => {
    setModalShow(true);
  };

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setDeriversList();
    setVehiclesList();
    console.log("summary", prop.summaries);
    prop.summaries.UserSummaries?.forEach((user) => {
      if (user.Role?.Name?.toLowerCase() === "driver") {
        setDrivers(+user.UserCount);
        setDriversVerified(+user.UserCount - +user.UnverifiedUserCount);
        setDriversPending(+user.UnverifiedUserCount);
      }
    });
    prop.summaries.VehicleSummaries?.forEach((vh) => {
      if (vh.Company?.Id?.toLowerCase() === logUser.Company.Id) {
        setVehicles(+vh.VehicleCount);
        setVehiclesVerified(+vh.VehicleCount - +vh.UnverifiedVehicleCount);
        setVehiclesPending(+vh.UnverifiedVehicleCount);
      }
    });
  };

  const handleClick = (e, driverDetails) => {
    e.preventDefault();
    const { name } = e.target;
    console.log("Verify Driver", name);
    switch (name) {
      case verificationKeys.verifyDriver:
        setModalShow(true);
        setVerifyKey(name);
        setSelectedDriver(driverDetails);
        console.log("verify", driverDetails);
        break;

      default:
        setDriverEdit(driverDetails);
        setIsAddDriver(true);
        break;
    }
    // console.log("handleEdit = Parent =", e, driverDetails);
  };

  const setDeriversList = () => {
    getUsers().then((res) => {
      let TableData = DriverGrid;
      let Data = DriverGrid.ColumnsData;
      let UpDriverList = res.data.Users.filter((x) => x.Staff === "N" || (x.UserRoles && x.UserRoles[0].Role.Id === "2") || x.Company);
      DriverGrid.ColumnsData = UpDriverList;
      setDriverList(TableData);
      // console.log("Driver List", UpDriverList, TableData);
    });
  };

  const setVehiclesList = () => {
    getVehicles().then((res) => {
      let TableData = VehicleGrid;
      VehicleGrid.ColumnsData = res.data.Vehicles;
      setVehicleList(TableData);
      console.log("setVehiclesList", TableData);
    });
  };

  const toggleAddDriver = (e, k) => {
    e.preventDefault();
    setDriverEdit(null);
    setIsAddDriver(k);
    setDeriversList();
  };

  const toggleAddVehicle = (e, k) => {
    e.preventDefault();
    setVehicleEdit(null);
    setIsAddVehicle(k);
    setVehiclesList();
  };

  const handleVerifyDriver = (e, k) => {
    e.preventDefault();
    setSelectedDriver(k);
  };

  const verifyDocument = (id, type) => {
    verify(id, type).then((res) => {
      console.log(res.data.DriverDocument);
      let updateDocument = selectedDriver.DriverDocuments;
      updateDocument.map((x) => {
        if (x.Id === res.data.DriverDocument.Id) {
          return res.data.DriverDocument;
        }
      });
      toast.success("Document Verified Successfully!");
      setSelectedDriver(null);
      handleModalClose();
      setDeriversList();
    });
  };

  const getModalComponent = (key) => {
    switch (key) {
      case verificationKeys.verifyDriver:
        return <DriverVerification selectedDriver={selectedDriver} onUpdate={verifyDocument} />;

      default:
        break;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <Tabs defaultActiveKey="driver" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="driver" title="Total Drivers">
              <div className="row">
                <div className="col">
                  <p>Total Drivers</p>
                  <h2>{drivers}</h2>
                </div>
                <div className="col">
                  <p>Verified Drivers</p>
                  <h2>{driversVerified}</h2>
                </div>
                <div className="col">
                  <p>Driver Verification Pending</p>
                  <h2>{driversPending}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col text-end">
                  {!isAddDriver && (
                    <button className="btn btn-primary" onClick={(e) => toggleAddDriver(e, true)}>
                      {!isAddDriver ? "Add New" : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
              {!isAddDriver ? (
                <Tabs defaultActiveKey="allDriver" id="driver-filtered" className="mb-3">
                  <Tab eventKey="allDriver" title="All">
                    <TableGridDriver GridData={driverList} onClick={(e, k) => handleClick(e, k)} />
                  </Tab>
                  <Tab eventKey="verifiedDriver" title="Verified">
                    <TableGridDriver GridData={driverList} onClick={(e, k) => handleClick(e, k)} Status="Y" />
                  </Tab>
                  <Tab eventKey="unVerifiedDriver" title="Verification Pending">
                    <TableGridDriver GridData={driverList} onClick={(e, k) => handleClick(e, k)} Status="N" />
                  </Tab>
                </Tabs>
              ) : (
                <>
                  <AddDriver NewUser={false} EditUser={driverEdit || {}} onChange={(e, k) => toggleAddDriver(e, k)} />
                </>
              )}
            </Tab>
            <Tab eventKey="vehicle" title="Total Vehicles">
              <div className="row">
                <div className="col">
                  <p>Total Vehicles</p>
                  <h2>{vehicles}</h2>
                </div>
                <div className="col">
                  <p>Verified Vehicles</p>
                  <h2>{vehiclesVerified}</h2>
                </div>
                <div className="col">
                  <p>Vehicles Verification Pending</p>
                  <h2>{vehiclesPending}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col text-end">
                  {!isAddVehicle && (
                    <button className="btn btn-primary" onClick={(e) => toggleAddVehicle(e, true)}>
                      {!isAddVehicle ? "Add New" : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
              {!isAddVehicle ? (
                <Tabs defaultActiveKey="allDriver" id="driver-filtered" className="mb-3">
                  <Tab eventKey="allDriver" title="All">
                    <TableGridVehicle GridData={vehicleList} />
                  </Tab>
                  <Tab eventKey="verifiedDriver" title="Verified">
                    <TableGridVehicle GridData={vehicleList} Status="Y" />
                  </Tab>
                  <Tab eventKey="unVerifiedDriver" title="Verification Pending">
                    <TableGridVehicle GridData={vehicleList} Status="N" />
                  </Tab>
                </Tabs>
              ) : (
                <>
                  <AddVehicle onChange={(e, k) => toggleAddVehicle(e, k)} />
                </>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal show={modalShow} size="lg" onHide={handleModalClose} centered>
        {getModalComponent(verifyKey)}
      </Modal>
    </>
  );
};

export default DriversVehicles;
