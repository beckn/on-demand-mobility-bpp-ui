import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReadyStartData, RideStartedData } from "../DriveData";


function RideStarted() {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className="me-2 fixed-bottom">
        Navigate
      </Button>
      <Modal
        className="popup"
        size="md"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
          <Modal.Title className="titlle" id="example-modal-sizes-title-sm">
      {RideStartedData.title}
          </Modal.Title>
        <Modal.Body>
          <h6 className="h5">{RideStartedData.subtitle}</h6>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RideStarted