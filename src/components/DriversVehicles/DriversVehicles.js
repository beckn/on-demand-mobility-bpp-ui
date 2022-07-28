import { useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import { LocalKey } from "../../core/constant";
import { getCookie } from "../../core/CookiesHandler";
import { DriverGrid, VehicleGrid, verificationKeys } from "../../shared/constant";
import TableGridDriver from "../../shared/TableGrid/TableGridDriver";
import TableGridVehicle from "../../shared/TableGrid/TableGridVehicle";
import { getUsers } from "../Dashboard/Dashboard.Services";
import AddDriver from "./AddDriver";
import AddVehicle from "./AddVehicle/AddVehicle";
import { getVehicles, verify } from "./DriversVehicles.Services";
import Verification from "./Verification";
import "./DriversVehicles.scss";
import { ChevronRight, Plus } from "react-feather";

export const DriversVehicles = (prop) => {
  const [tabKey, setTabKey] = useState(prop.activeScreenId || 'Tdrvier');
  const [logUser] = useState(JSON.parse(getCookie(LocalKey.saveUser)));
  const [driverList, setDriverList] = useState("");
  const [vehicleList, setVehicleList] = useState("");
  const [selectedDriver, setSelectedDriver] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [drivers, setDrivers] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [vehiclesVerified, setVehiclesVerified] = useState(0);
  const [vehiclesPending, setVehiclesPending] = useState(0);
  const [driversVerified, setDriversVerified] = useState(0);
  const [driversPending, setDriversPending] = useState(0);
  const [isAddDriver, setIsAddDriver] = useState(false);
  const [isAddVehicle, setIsAddVehicle] = useState(false);
  const [driverEdit, setDriverEdit] = useState("");
  const [vehicleEdit, setVehicleEdit] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [verifyKey, setVerifyKey] = useState("");

  useEffect(()=>{
    setTabKey(prop.activeScreenId || 'Tdrvier')
  },[prop.activeScreenId])

  const handleModalClose = () => {
    setModalShow(false);
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

  const handleClick = (e, Details) => {
    e.preventDefault();
    const { name } = e.target;
    console.log("Verify Driver", name);
    switch (name) {
      case verificationKeys.verifyDriver:
        setModalShow(true);
        setVerifyKey(name);
        setSelectedDriver(Details);
        console.log("verify", Details);
        break;
      case verificationKeys.verifyVehicle:
        setModalShow(true);
        setVerifyKey(name);
        setSelectedVehicle(Details);
        console.log("verify", Details);
        break;
      case verificationKeys.editVehicle:
        setVehicleEdit(Details);
        setIsAddVehicle(true);
        console.log("verify", verificationKeys.editVehicle, Details, vehicleEdit);
        break;

      default:
        setDriverEdit(Details);
        setIsAddDriver(true);
        break;
    }
    // console.log("handleEdit = Parent =", e, driverDetails);
  };

  const setDeriversList = () => {
    getUsers().then((res) => {
      let TableData = DriverGrid;
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

  const verifyDocument = (id, type) => {
    verify(id, type).then((res) => {
      toast.success("Document Verified Successfully!");
      setSelectedDriver(null);
      handleModalClose();
      type === "driver_documents" ? setDeriversList() : setVehicleList();
    });
  };

  return (
    <>
      <div className="row drivers-vehicles">
        <div className="col">
          <Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)} className="mb-3">
            <Tab eventKey="Tdrvier" title="Total Drivers" className="main-tab-content">
              <div className="row mb-5">
                <div className="col arrow-right">
                  <div>
                  <h4 className="fs-6 fw-normal">Total Drivers</h4>
                  <p className="fs-2 fw-semibold">{drivers}</p>
                  </div>
                  <div className="icon"><ChevronRight size={64} /></div>
                </div>
                <div className="col line-right">
                  <div>
                  <h4 className="fs-6 fw-normal">Verified Drivers</h4>
                  <p className="fs-2 fw-semibold">{driversVerified}</p>
                  </div>
                  <div className="icon"></div>
                </div>
                <div className="col">
                  <h4 className="fs-6 fw-normal">Driver Verification Pending</h4>
                  <p className="fs-2 fw-semibold">{driversPending}</p>
                </div>
              </div>

              {!isAddDriver ? (
              <div className="nested-tabs">
                <button className="ms-auto btn btn-icon shift-down" onClick={(e) => toggleAddDriver(e, true)}>
                  <Plus size={24}/>
                  <span>New</span>
                </button>
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
              </div>
              ) : (
                <>
                  <AddDriver NewUser={false} EditUser={driverEdit || {}} onChange={(e, k) => toggleAddDriver(e, k)} />
                </>
              )}
            </Tab>

            <Tab eventKey="Tvehicle" title="Total Vehicles" className="main-tab-content">
              <div className="row mb-5">
                <div className="col arrow-right">
                  <div>
                  <h4 className="fs-6 fw-normal">Total Vehicles</h4>
                  <p className="fs-2 fw-semibold">{vehicles}</p>
                  </div>
                  <div className="icon"><ChevronRight size={64} /></div>
                </div>
                <div className="col line-right">
                  <div>
                  <h4 className="fs-6 fw-normal">Verified Vehicles</h4>
                  <p className="fs-2 fw-semibold">{vehiclesVerified}</p>
                  </div>
                  <div className="icon"></div>
                </div>
                <div className="col">
                  <h4 className="fs-6 fw-normal">Vehicles Verification Pending</h4>
                  <p className="fs-2 fw-semibold">{vehiclesPending}</p>
                </div>
              </div>

              {!isAddVehicle ? (
              <div className="nested-tabs">
                <button className="ms-auto btn btn-icon shift-down" onClick={(e) => toggleAddVehicle(e, true)}>
                  <Plus size={24}/>
                  <span>New</span>
                </button>
                <Tabs defaultActiveKey="allDriver" id="driver-filtered" className="mb-3">
                  <Tab eventKey="allDriver" title="All">
                    <TableGridVehicle GridData={vehicleList} onClick={(e, k) => handleClick(e, k)} />
                  </Tab>
                  <Tab eventKey="verifiedDriver" title="Verified">
                    <TableGridVehicle GridData={vehicleList} onClick={(e, k) => handleClick(e, k)} Status="Y" />
                  </Tab>
                  <Tab eventKey="unVerifiedDriver" title="Verification Pending">
                    <TableGridVehicle GridData={vehicleList} onClick={(e, k) => handleClick(e, k)} Status="N" />
                  </Tab>
                </Tabs>
              </div>
              ) : (
                <>
                  <AddVehicle vehicleEdit={vehicleEdit || {}} onChange={(e, k) => toggleAddVehicle(e, k)} onUpdateVehicle={()=>setVehiclesList()} />
                </>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal show={modalShow} size="lg" onHide={handleModalClose} centered>
        <Verification verifyDocuments={verifyKey === verificationKeys.verifyDriver ? selectedDriver : selectedVehicle} verify={verifyKey} onUpdate={verifyDocument} />
      </Modal>
    </>
  );
};

export default DriversVehicles;
