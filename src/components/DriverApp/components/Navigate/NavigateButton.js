import React, { useState } from "react";
import Pickup from "../GoingForPickup/Pickup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { LocationIcon } from "../../../../shared/icons/Location";
import ReadyStart from "../ReadyStart/ReadyStart";
import RideCompleted from "../RideCompleted/RideCompleted";
import RideStart from "../StartRide/StartRide";
import RideStarted from "../RideStarted/RideStarted";
//import "./NavigateButton.css";
//import "../ReadyStart/ReadyStart.css";
import StartRide from "../StartRide/StartRide";
import Rectanglebar from './Rectangle-bar.png';

function NavigateButton() {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
       {/* <Pickup/> */}
       {<ReadyStart />}
       {/* <RideStarted /> */}
       {/* <RideCompleted /> */}
       {/* <StartRide /> */}
    </>
  );
}

export default NavigateButton;
