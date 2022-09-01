import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MapPin } from "react-feather";
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { LocationIcon } from "../../../../shared/icons/Location";
import { ReadyStartData } from "../DriveData";


function ReadyStart(props) {
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
        {ReadyStartData.title}
        </Modal.Title>
        <Modal.Body>
          <div className="carLog">
            <CarLogIcon />
          </div>
          <div className="callLog">
            <CallLogIcon />
          </div>
          <h6 className="h6">{ReadyStartData.Subtitle}</h6>
          <hr className="hr" />
          <div className="loc">
            <LocationIcon />
            <span className="MapPin">
        <MapPin color="#D22323" className="map" />
      {ReadyStartData.Address}
      </span>
          </div>
          <p className="sub">{ReadyStartData.Location}</p>
          <hr className="hrs" />
          <h6 className="hd">{ReadyStartData.TotalRide}</h6>
          <h6 className="rs">{ReadyStartData.Amount}</h6>
          <p className="ps">{ReadyStartData.Colletion}</p>
          <h6 className="ride">{ReadyStartData.Ride}</h6>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReadyStart