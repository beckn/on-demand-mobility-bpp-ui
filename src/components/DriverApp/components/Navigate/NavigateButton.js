import React, { useState } from "react";
import { useNavigate } from "react-router";
import Pickup from "../Pickup/pickup";
import ReadyStart from "../ReadyToStart/ReadyToStart";
import RideCompleted from "../RideCompleted/RideCompleted";
import RideStarted from "../RideStarted/RideStarted";
import { getTripStatus } from "../SwitchButton/Driver.Services";
import { useInterval } from "../../hooks/useInterval";
import { AppRoutes } from "../../../../core/constant";
import { setActiveRide } from "../../../../core/common.functions";
import { round } from "../../utils/utils";

function NavigateButton({ location, trip }) {
  const navigate = useNavigate();
  const { DisplayStatus } = trip;
  const [ride, setRide] = useState(trip);
  const getRideData = async () => {
    const res = await getTripStatus(trip.Id).then((res) => res.data.Trip);
    if (DisplayStatus !== res.DisplayStatus) {
      setRide(res);
      setActiveRide({
        res,
        location,
        distance: trip?.TripStops[1]?.DistanceFromLastStop,
      });
    }
  };
  const isActive = ride.DisplayStatus === "Ended" ? false : true;

  useInterval(
    () => {
      getRideData();
    },
    isActive ? 4000 : null
  );
  console.log({ ride });
  if (!isActive) {
    navigate(AppRoutes.endRide);
  }

  return (
    <>
      <RideStarted location={location} trip={ride} />
    </>
  );
}

export default NavigateButton;
