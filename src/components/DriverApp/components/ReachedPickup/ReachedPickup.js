import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { startRide, endRide } from "../SwitchButton/Driver.Services";
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { LocationIcon } from "../../../../shared/icons/Location";
import "../Pickup/pickup.css";
import Rectanglebar from '../Navigate/Rectangle-bar.png';

function StartRideButton({ trip, location }) {
  const [smShow, setSmShow] = useState({ status: false, data: undefined });
  console.log("pickup",trip,location);
  const [rideDetail, setRideDetail] = useState(false);
  const handleStartRide = async () => {
    const res = await startRide(trip.Id).then((response) => response.data);
    setSmShow({ status: !smShow.status, data: res.Trip });
  };
  const handleEndRide = async () => {
    !isTripEnded && (await endRide(trip.Id).then((response) => response.data));
    //setSmShow({ status: !smShow.status, data: res.Trip });
    isTripEnded && window.location.reload();
    
  };
  const status = smShow.data ? smShow.data.DisplayStatus : "Not Confirmed";
  const isTripEnded = trip.DisplayStatus === "Ended" ? true : false;
  return (
    <>
      {
        smShow.status ? 
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
                Reached Pickup
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
                    <LocationIcon fill="#80BC48" />
                  </div>
                  <div className="sub-P">{location.driverAddress}</div>
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
      {status === "Not Confirmed" ? (
        <Button onClick={handleStartRide} className="me-2 fixed-bottom">
          Nevigate
        </Button>
      ) : (
        <Button onClick={handleEndRide} className="me-2 fixed-bottom">
          {isTripEnded ? "Ride Started" : "Start Ride"}
        </Button>
      )}
    </>
  );
}

export default StartRideButton;
