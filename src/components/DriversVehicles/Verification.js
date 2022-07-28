import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { getAddress, getKeyValueFromString } from "../../core/common.functions";
import { DocumentType } from "../../core/constant";
import { verificationKeys } from "../../shared/constant";

export const Verification = (props) => {
  useEffect(() => {
    if (props.verify === verificationKeys.verifyVehicle) {
      console.log("Verification", props);
    }
  }, [props]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{props.verify === verificationKeys.verifyDriver ? "Driver" : "Vehicle"} Verification </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            {props.verify === verificationKeys.verifyDriver ? (
              <>
                <h5>{props.verifyDocuments?.LongName}</h5>
                <hr />
                <div><b>Address:</b> {props.verifyDocuments && getAddress(props.verifyDocuments)}</div>
                <div><b>Mobile:</b> {props.verifyDocuments?.PhoneNumber}</div>
                <div><b>DOB:</b> {props.verifyDocuments?.DateOfBirth}</div>
                <div><b>Date Of Joining:</b> {props.verifyDocuments?.DateOfJoining}</div>
              </>
            ) : (
              <>
                <h5>
                  {props.verifyDocuments?.VehicleNumber} | <span className="small text-muted">Date of Registration: {props.verifyDocuments?.VehicleDocuments?.find((x) => x.Document === DocumentType.RC).ValidFrom}</span>
                </h5>
                <hr />
                <div><b>Make:</b> {getKeyValueFromString("Make", props.verifyDocuments?.Tags)}</div>
                <div><b>Name of Model:</b> {getKeyValueFromString("NameOfModel", props.verifyDocuments?.Tags)}</div>
                <div><b>Fuel Type:</b> {getKeyValueFromString("FuelType", props.verifyDocuments?.Tags)}</div>
                <div><b>Vehicle Type:</b> {getKeyValueFromString("VehicleType", props.verifyDocuments?.Tags)}</div>

              </>
            )}
            <hr />
            <h5>Uploaded Documents</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Document Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.verifyDocuments && props.verifyDocuments[props.verify === verificationKeys.verifyVehicle ? "VehicleDocuments" : "DriverDocuments"]?.map((x) => {
                  return (
                    <tr>
                      <td>{x.Document}</td>
                      <td>
                        <a href={x.ImageUrl} rel="noreferrer" target="_blank">
                          {x.DocumentNumber}
                        </a>
                      </td>
                      <td>
                        {x.Verified === "Y" ? (
                          "Verified"
                        ) : (
                          <button className="btn btn-primary btn-sm" onClick={() => props.onUpdate(x.Id, props.verify === verificationKeys.verifyDriver ? "driver_documents" : "vehicle_documents")}>
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleModalClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={handleVerifyDriver}>
          Save Changes
        </button>
      </Modal.Footer> */}
    </>
  );
};

export default Verification;
