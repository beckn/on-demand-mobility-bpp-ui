import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { LocationIcon } from "../../../../shared/icons/Location";
import "./NavigateButton.css";

function NavigateButton() {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className="me-2 fixed-bottom">
        Navigate
      </Button>
      <Modal
        className="popup"
        size="lg"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title className="titlle" id="example-modal-sizes-title-sm">
            Going for Pickup
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="carLog">
            <CarLogIcon />
          </div>
          <div className="callLog">
            <CallLogIcon />
          </div>
          <h6 className="h6">Reach pick up location in 5 mins.</h6>
          <hr className="hr" />
          <div className="loc">
            <LocationIcon />
          </div>
          <p className="sub">Raja Dinkar Kelkar Museum</p>
          <h6 className="min">5 min away</h6>
          <h6 className="kms">2.5kms</h6>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavigateButton;
