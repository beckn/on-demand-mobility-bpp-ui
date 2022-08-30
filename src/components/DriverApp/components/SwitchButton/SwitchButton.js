/* eslint-disable no-undef */
import React, { useState } from "react";
import "./SwitchButton.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { OfflineIcon } from "../../../../shared/icons/Offline";
import { MarkerIcon } from "../../../../shared/icons/Marker";
import { CustomSwitch } from "./CustomSwitch";
import { CustomModal } from "../Modal/Modal";
import { MapPin } from "react-feather";

const { Title } = Modal;
const SwitchButton = () => {
  const [value, setValue] = useState(false);
  const [modalShow, setModalShow] = useState(true);
  const [rideModalShow, setRideModalShow] = useState(value);

  const handleSwitch = () => {
    setValue(!value);
    value && setModalShow(!modalShow);
    !value && setRideModalShow(!rideModalShow);
  };
  return (
    <div>
      <div>
        <h2 className="title">Bharat Ganapathy</h2>
        <h3 className="text">Driver - Beckn One</h3>
      </div>

      <CustomSwitch isOn={value} handleToggle={handleSwitch} />
      <CustomModal show={modalShow} onHide={() => setModalShow(false)}>
        <OfflineModalContent></OfflineModalContent>
      </CustomModal>
      <CustomModal show={rideModalShow} onHide={() => setRideModalShow(false)}>
        <RideRequest></RideRequest>
      </CustomModal>
    </div>
  );
};

export default SwitchButton;

const OfflineModalContent = () => {
  return (
    <div className="d-flex justify-content-center p-2">
      <span className="p-2">
        <OfflineIcon />
      </span>
      <div className="p-2">
        <Title id="contained-modal-title-vcenter">You’re Offline</Title>
        <p>You’re currently offline. Go online to recieve trip requests. </p>
      </div>
    </div>
  );
};

const RideRequest = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <Title id="contained-modal-title-vcenter">New Ride Request!</Title>
      <span className="p-2">
        <MarkerIcon />
      </span>
      <div className="d-flex">
        <p>5 min away </p>

        <ul>
          <span className="dot"></span>2.5 kms
        </ul>
      </div>
      <span className="d-flex mt-3">
        <MapPin color="#80BC48" />
        Raja Dinkar Kelkar Museum
      </span>
      <span className="d-flex mt-3">
        <MapPin color="#D22323" />
        Shaniwar wada
      </span>
      <button
        type="button"
        class="w-100 btn btn-primary btn-lg btn-block mt-3 accept-button"
      >
        Accept
      </button>
      <button type="button" class="btn decline-button">
        Decline
      </button>
    </div>
  );
};
