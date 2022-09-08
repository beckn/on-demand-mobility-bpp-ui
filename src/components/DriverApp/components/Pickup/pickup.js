import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { LocationIcon } from "../../../../shared/icons/Location";
import "./pickup.css";
import Rectanglebar from '../Navigate/Rectangle-bar.png';

function NavigateButton() {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      {
        smShow ? 
          <div className="bottomModal-P">
            <div className="rectangle-bar-P" onClick={() => setSmShow(!smShow)}>
              <button class="recbar-P">
                <img
                  src={Rectanglebar}
                  alt="Rectangle bar"
                />
              </button>                  
            </div>
            <div className="nevigate-body-P">
              <div className="titlle-P" id="example-modal-sizes-title-sm">
                Going for Pickup
              </div>
              <div>
                <div className="carLog-P">
                  <CarLogIcon />
                </div>
                <div className="callLog-P">
                  <CallLogIcon />
                </div>
                <h6 className="h6-P">Reach pick up location in 5 mins.</h6>
                <br/>
                <div className="">
                <br/>
                <hr className="hr-P"/>
                  <div className="loc-P">
                    <LocationIcon />
                  </div>
                  <div className="sub-P">Raja Dinkar Kelkar Museum</div>
                  <div>
                    <span className="min-P">5 min away</span>
                    <span className="kms-P">2.5kms</span>
                  </div>
                </div>
              </div>
            </div>
          
          </div> :
          <div>
          </div>
      }
      {<Button onClick={() => setSmShow(!smShow)} className="me-2 fixed-bottom">
        Navigate
    </Button>}
      {/*<Modal
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="popupbottom"
      >
          <Modal.Title className="titlle" id="example-modal-sizes-title-sm">
          Going for Pickup
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
          </div>
          <p className="sub">Raja Dinkar Kelkar Museum</p>
          <h6 className="min">5 min away</h6>
          <h6 className="kms">2.5kms</h6>
        </Modal.Body>
  </Modal>*/}
    </>
  );
}

export default NavigateButton;