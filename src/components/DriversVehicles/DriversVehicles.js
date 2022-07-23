import { useEffect, useState } from "react";
import { Tab, Tabs, Modal, Table } from "react-bootstrap";
import { getAddress } from "../../core/common.functions";
import { AppRoutes, commonMsg } from "../../core/constant";
import { DriverGrid, verificationKeys } from "../../shared/constant";
import TableGridDriver from "../../shared/TableGrid/TableGridDriver";
import { getUsers } from "../Dashboard/Dashboard.Services";
import AddDriver from "./AddDriver";
import { toast } from "react-toastify";
import { verify } from "./DriversVehicles.Services";
import DriverVerification from "./DriverVerification";

export const DriversVehicles = (prop) => {
  const [driverList, setDriverList] = useState("");
  const [selectedDriver, setSelectedDriver] = useState({});
  const [drivers, setDrivers] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [driversVerified, setDriversVerified] = useState(0);
  const [driversPending, setDriversPending] = useState(0);
  const [isAddDriver, setIsAddDriver] = useState(false);
  const [driverEdit, setDriverEdit] = useState("");
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
    prop.summaries.UserSummaries?.forEach((user) => {
      if (user.Role?.Name?.toLowerCase() === "driver") {
        setDrivers(+user.UserCount);
        setDriversVerified((+user.UserCount - +user.UnverifiedUserCount).toFixed("00"));
        setDriversPending(+user.UnverifiedUserCount);
      }
    });
    prop.summaries.VehicleSummaries?.forEach((user) => {
      if (user.Role?.Name?.toLowerCase() === "driver") {
        setVehicles(user.UserCount);
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
      UpDriverList.forEach((v) => {
        Data.push({
          LongName: v.LongName,
          DocumentNumber: (v.DriverDocuments && v.DriverDocuments.find((x) => x.Document === "Licence").DocumentNumber) || commonMsg.NoValue,
          Verified: v.Verified,
          Location: (v.City && v.City.Name) || commonMsg.NoValue,
          Status: (v.DriverDocuments && v.DriverDocuments.find((x) => x.Document === "Licence").Verified) || commonMsg.NoValue,
          DOJ: v.DateOfJoining || commonMsg.NoValue,
          Item: v,
        });
      });
      setDriverList(TableData);
      console.log("Driver List", UpDriverList, TableData);
    });
  };

  const toggleAddDriver = (e, k) => {
    e.preventDefault();
    setDriverEdit(null);
    setIsAddDriver(k);
    setDeriversList();
  };

  const handleVerifyDriver = (e, k) => {
    e.preventDefault();
    setSelectedDriver(k);
  };

  const verifyDocument = (id) => {
    verify(id).then((res) => {
      console.log(res.data.DriverDocument);
      let updateDocument = selectedDriver.DriverDocuments;
      updateDocument.map((x) => {
        if (x.Id === res.data.DriverDocument.Id) {
          return res.data.DriverDocument;
        }
      });
      toast.success("Document Verified Successfully!");
      setSelectedDriver("");
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
                  <h2>{drivers}</h2>
                </div>
                <div className="col">
                  <p>Verified Vehicles</p>
                  <h2>{driversVerified}</h2>
                </div>
                <div className="col">
                  <p>Vehicles Verification Pending</p>
                  <h2>{driversPending}</h2>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col text-end">
                    <a href={AppRoutes.addVehicle} className="btn btn-primary">
                      Add New
                    </a>
                  </div>
                </div>
              </div>
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
