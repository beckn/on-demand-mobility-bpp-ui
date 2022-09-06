import React, { useState } from "react";
import Pickup from "../Pickup/pickup";
import ReadyStart from "../ReadyToStart/ReadyToStart";
import RideCompleted from "../RideCompleted/RideCompleted";
import RideStarted from "../RideStarted/RideStarted";

function NavigateButton() {
  return (
    <>
      {<Pickup />}
      {/* <ReadyStart /> */}
      {/* <RideStarted /> */}
      {/* <RideCompleted /> */}
      {/* <StartRide /> */}
    </>
  );
}

export default NavigateButton;
