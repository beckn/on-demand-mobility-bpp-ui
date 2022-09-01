import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MapPin } from "react-feather";
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { LocationIcon } from "../../../../shared/icons/Location";


function StartRide() {
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
          Ride Started
          </Modal.Title>
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
            <span className="MapPin">
        <MapPin color="#D22323" className="map" />
        Shaniwar wada
      </span>
          </div>
          <p className="sub">Raja Dinkar Kelkar Museum</p>
          <hr className="hrs" />
          <h6 className="hd">Total Fare:</h6>
          <h6 className="rs">Rs.200</h6>
          <p className="ps">To be collected at the end of the ride</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StartRide