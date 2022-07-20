import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { AppRoutes, commonMsg } from "../../core/constant";
import Account from "../Account/Account";
import { getUsers } from "../Dashboard/Dashboard.Services";
import AddDriver from "./AddDriver";

export const DriversVehicles = (prop) => {
  const [driverList, setDriverList] = useState(prop.driverList);
  const [drivers, setDrivers] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [driversVerified, setDriversVerified] = useState(0);
  const [driversPending, setDriversPending] = useState(0);
  const [isAddDriver, setIsAddDriver] = useState(false);
  const [driverEdit, setDriverEdit] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    let DriverList = prop.driverList && prop.driverList.filter((x) => x.Staff === "N" && x.UserRoles && x.UserRoles[0].Role.Name.toLowerCase() === "driver" && x.Company);
    setDriverList(DriverList);
    console.log("Driver List", DriverList);
    prop.summaries.UserSummaries?.forEach((user) => {
      if (user.Role.Name.toLowerCase() === "driver") {
        setDrivers(+user.UserCount);
        setDriversVerified((+user.UserCount - +user.UnverifiedUserCount).toFixed("00"));
        setDriversPending(+user.UnverifiedUserCount);
      }
    });
    prop.summaries.VehicleSummaries?.forEach((user) => {
      if (user.Role.Name.toLowerCase() === "driver") {
        setVehicles(user.UserCount);
      }
    });
  };

  const handleEdit = (e, driverDetails) => {
    e.preventDefault();
    setDriverEdit(driverDetails);
    setIsAddDriver(true);
    console.log(e, driverDetails)
  }

  const toggleAddDriver = (e, k) => {
    e.preventDefault();
    setDriverEdit(null);
    setIsAddDriver(k);
    getUsers().then(res => {
      setDriverList(res[1].data.Users);
    })
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
                <table className="table table-striped mt-4">
                  <tr>
                    <th>Name of Driver</th>
                    <th>Licence number</th>
                    <th>Verification Status</th>
                    <th>Location</th>
                    <th>Documents Status</th>
                    <th>Date of joining</th>
                    <th>Action</th>
                  </tr>
                  {driverList &&
                    driverList
                      .filter((x) => x.Staff === "N")
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.LongName}</td>
                            <td>{(item.DriverDocuments && item.DriverDocuments.find((x) => x.Document === "Licence").DocumentNumber) || commonMsg.NoValue}</td>
                            <td>{item.Verified}</td>
                            <td>{(item.City && item.City.Name) || commonMsg.NoValue}</td>
                            <td>{(item.DriverDocuments && item.DriverDocuments.find((x) => x.Document === "Licence").Verified) || commonMsg.NoValue}</td>
                            <td>{item.DateOfJoining || commonMsg.NoValue}</td>
                            <td>
                              <button className="btn btn-sm btn-link" onClick={(e) => handleEdit(e, item)}>Edit</button>
                            </td>
                          </tr>
                        );
                      })}
                </table>
              ) : (
                <>
                  {/* <Account NewUser={true} User={null} onChange={(e, k) => dispatchEvent(e, k)} /> */}
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
    </>
  );
};

export default DriversVehicles;
