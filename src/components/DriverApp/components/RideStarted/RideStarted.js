import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReadyStartData, RideStartedData } from "../DriveData";
import "./RideStarted.css";
import Rectanglebar from '../Navigate/Rectangle-bar.png';
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { MapPin } from "react-feather";
import { LocationIcon } from "../../../../shared/icons/Location";

function RideStarted() {
  const [smShow, setSmShow] = useState(false);
  const [rideDetail, setRideDetail] = useState(false);

  return (
    <>
      {
        smShow ? 
          <div className="bottomModal">
            <div className="rectangle-bar" onClick={() => setRideDetail(!rideDetail)}>
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
            <RideStartedExpand rideDetail={rideDetail} setRideDetail={setRideDetail}/>
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


function RideStartedExpand({rideDetail,setRideDetail}) {

    return (
      <>
        {
          rideDetail ?
          <div className="bottomModal-R">
             <div className="rectangle-bar-R" onClick={()=>setRideDetail(false)}>
                <button class="recbar-R">
                  <img
                    src={Rectanglebar}
                    alt="Rectangle bar"
                  />
                </button>                  
             </div>
             <div className="nevigate-body-R">
                <div>
                  <div>
                    <div className="titlle-R" id="example-modal-sizes-title-sm">
                        {RideStartedData.title}
                    </div>
                    <div className="carLog-R">
                      <CarLogIcon />
                    </div>
                    <div className="callLog-R">
                      <CallLogIcon />
                    </div>
                    <h6 className="h6-R">
                        <div>
                            You are on your way towards
                        </div>
                            the drop locations
                    </h6>
                  </div>
  
                  <div>
                    <hr className="hr-RS" />
                  </div>
                  
                  <div className="loc-RS">
                    <span className="SourceAddress-RS">
                      <LocationIcon />
                      <p className="sub-RS">{ReadyStartData.Location}</p>
                    </span>
                    <span className="MapPin-RS">
                      <MapPin color="#D22323" className="map-RS" />
                      <p className="dest-RS">{ReadyStartData.Address}</p>
                    </span>
                  </div>
                  
                  <hr className="hrs-RS" />
                  <h6 className="hd-RS">{ReadyStartData.TotalRide} :</h6>
                  <h6 className="rs-RS">{ReadyStartData.Amount}</h6>
                  <p className="ps-RS">{ReadyStartData.Colletion}</p>
                  <hr className="Cancelridehr-RS" />
                  
                </div>
             </div>
          </div> :
          <div>
  
          </div>
        }
        
        {/*<Modal
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
        </Modal>*/}
      </>
    );
  }
