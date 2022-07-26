import React from "react";
import { Modal, Table } from "react-bootstrap";
import { getAddress } from "../../core/common.functions";
import { verificationKeys } from "../../shared/constant";

export const Verification = (props) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{props.verify === verificationKeys.verifyDriver ? "Driver" : "Vehicle"} Verification </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            <h5>{props.verifyDocuments.LongName}</h5>
            <hr />
            {getAddress(props.verifyDocuments)}
            <p>
              Mobile: {props.verifyDocuments.PhoneNumber}, DOB: {props.verifyDocuments.DateOfBirth}
            </p>
            <hr />
            <p>Date Of Joining: {props.verifyDocuments.DateOfJoining}</p>
            <hr />
            <h5>Uploaded Documents</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Document Number</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {props.verifyDocuments.DriverDocuments?.map((x) => {
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
                          <button className="btn btn-primary btn-sm" onClick={() => props.onUpdate(x.Id, "driver_documents")}>
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
