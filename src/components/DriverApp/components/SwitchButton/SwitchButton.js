/* eslint-disable no-undef */
import React, { useEffect, useState, useCallback } from "react";
import "./SwitchButton.css";
import Modal from "react-bootstrap/Modal";
import { CustomSwitch } from "./CustomSwitch";
import { CustomModal } from "../Modal/Modal";
import { AlertModal } from "../Modal/alert";
import NavigateButton from "../Navigate/NavigateButton";
import { getCookie } from "../../../../core/CookiesHandler";
import { LocalKey } from "../../../../core/constant";
import {
  getUserVehicles,
  getDriverOnline,
  getTrips,
  acceptRide,
  rejectRide,
} from "./Driver.Services";
import {
  OfflineModalContent,
  AlertModalContent,
  RideRequest,
} from "./ModalContent";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBCau3ch7SSkscqQUl2El4ux9Au1Ur9jFo");
Geocode.setLocationType("ROOFTOP");

const coordinateToAddress = async ({ latitude, longitude }) => {
  const response = await Geocode.fromLatLng(latitude, longitude).then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(address);
      return address;
    },
    (error) => {
      console.error(error);
    }
  );
  const formatResponse = response.split(",");
  return formatResponse[0] + formatResponse[1] + formatResponse[2];
};
const { Title } = Modal;
const SwitchButton = ({ latitude, longitude }) => {
  const User = JSON.parse(getCookie(LocalKey.saveUser)) || null;
  const [value, setValue] = useState(false);
  const [alertModalShow, setAlertModal] = useState(false);
  const [modalShow, setModalShow] = useState(true);
  const [rideModalShow, setRideModalShow] = useState(value);
  const [trip, setTrip] = useState(undefined);

  const [driverAddress, setDriverAddress] = useState("NA");
  const [pickupAddress, setPickupAddress] = useState("NA");
  const [rideStatus, setRideStatus] = useState({
    accept: false,
    reject: false,
  });
  const handleSwitch = async () => {
    if (latitude == null || longitude == null) {
      //alert("please enable your location")
      setAlertModal(!alertModalShow);
    } else {
      setValue(!value);
      value && setModalShow(!modalShow);

      if (!value) {
        const loginDetails = await getDriverOnline(User.Id);
        const rideData = await getTrips(loginDetails.Id, {
          latitude,
          longitude,
        });
        setTrip(rideData);
        console.log({ rideData });
        const driverLocation = await coordinateToAddress({
          latitude: rideData?.TripStops[0].Lat,
          longitude: rideData?.TripStops[0].Lng,
        });
        setDriverAddress(driverLocation);
        const address = await coordinateToAddress({
          latitude: rideData?.TripStops[1].Lat,
          longitude: rideData?.TripStops[1].Lng,
        });
        setPickupAddress(address);
        setRideModalShow(!rideModalShow);
      }
    }
  };

  const handleAccept = useCallback(async (id) => {
    setRideModalShow(false);
    const res = await acceptRide(id);
    setRideStatus({ accept: true, reject: false });
  }, []);

  const handleReject = useCallback(async (id) => {
    const res = await rejectRide(id);
    console.log({ res });
    setRideStatus({ accept: false, reject: true });
  }, []);

  console.log({ driverAddress, pickupAddress });
  return (
    <div className="">
      <div>
        <h2 className="title">{User.LongName || ""}</h2>
        <h3 className="text">{User?.Company?.Name || ""}</h3>
      </div>
      {<CustomSwitch isOn={value} handleToggle={handleSwitch} />}

      <CustomModal show={modalShow} onHide={() => setModalShow(false)}>
        <OfflineModalContent />
      </CustomModal>
      {rideModalShow && (
        <CustomModal
          show={rideModalShow}
          onHide={() => setRideModalShow(false)}
        >
          <RideRequest
            onAccept={handleAccept}
            onReject={handleReject}
            rideStatus={rideStatus}
            trip={trip}
            address={{
              driverAddress,
              pickupAddress,
            }}
          />
        </CustomModal>
      )}
      <AlertModal show={alertModalShow} onHide={() => setAlertModal(false)}>
        <AlertModalContent />
      </AlertModal>
      {rideStatus.accept && (
        <div className="fixed-bottom">
          <NavigateButton
            location={{ driverAddress, pickupAddress }}
            trip={trip}
          />
        </div>
      )}
    </div>
  );
};

export default SwitchButton;
