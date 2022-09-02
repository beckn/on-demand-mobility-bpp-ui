import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReadyStartData, RideStartedData } from "../DriveData";
import "./ReadyStarted.css";
import Rectanglebar from '../Navigate/Rectangle-bar.png';
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";

function RideStarted() {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      {
        smShow ? 
          <div className="bottomModal">
            <div className="rectangle-bar" onClick={() => setSmShow(!smShow)}>
              <button class="recbar">
                <img
                  src={Rectanglebar}
                  alt="Rectangle bar"
                />
              </button>                  
           </div>
            <div className="titlle" id="example-modal-sizes-title-sm">
              {RideStartedData.title}
            </div>
            <div>
              <div className="titlle-text" id="example-modal-sizes-title-sm">
                <div>
                  You are on your way towards
                </div>
                the drop locations
              </div>
            </div>
            <div className="carLog">
              <CarLogIcon />
            </div>
            <div className="callLog">
              <CallLogIcon />
            </div>
          </div>:
          <div></div>
      }
      <Button onClick={() => setSmShow(!smShow)} className="me-2 fixed-bottom">
        Navigate
      </Button>
      {/*<Modal
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
  </Modal>*/}
    </>
  );
}

export default RideStarted