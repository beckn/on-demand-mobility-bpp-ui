import React, { useState } from "react";
import Pickup from "../Pickup/pickup";
import ReadyStart from "../ReadyToStart/ReadyToStart";
import RideCompleted from "../RideCompleted/RideCompleted";
import RideStarted from "../RideStarted/RideStarted";
import { getTripStatus } from "../SwitchButton/Driver.Services";
import { useInterval } from "../../hooks/useInterval";

function NavigateButton({ location, trip }) {
  const { DisplayStatus } = trip;
  const [ride, setRide] = useState(trip);
  const getRideData = async () => {
    const res = await getTripStatus(trip.Id).then((res) => res.data.Trip);
    DisplayStatus !== res.DisplayStatus && setRide(res);
  };
  useInterval(() => {
    getRideData();
  }, 8000);
  console.log({ ride });
  return (
    <>
      {/* <Pickup /> */}
      {/* <ReadyStart /> */}
      {<RideStarted location={location} trip={ride} />}
      {/* <RideCompleted /> */}
      {/* <StartRide /> */}
    </>
  );
}

export default NavigateButton;
