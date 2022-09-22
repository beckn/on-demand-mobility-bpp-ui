/* eslint-disable no-undef */
import React, { useEffect, useState, useCallback, useRef } from "react";
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
import { toast } from "react-toastify";
import { useAddress } from "../../hooks/useAddress";

const { Title } = Modal;

const SwitchButton = ({ latitude, longitude }) => {
  const User = JSON.parse(getCookie(LocalKey.saveUser)) || null;
  const [value, setValue] = useState(false);
  const [alertModalShow, setAlertModal] = useState(false);
  const [modalShow, setModalShow] = useState(true);
  const [rideModalShow, setRideModalShow] = useState(value);
  const [driverLoginId, setDriverLoginId] = useState();

  const [trip, setTrip] = useState(undefined);
  const { driverAddress, pickupAddress } = useAddress(trip);

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
      try {
        if (!value) {
          const loginDetails = await getDriverOnline(User.Id);
          loginDetails && setDriverLoginId(loginDetails.Id);
        }
      } catch (err) {
        console.log(" I am the error", err);
        toast.error("Something Went wrong");
        setValue(false);
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

  useEffect(() => {
    let rideData;
    let timerRef;
    let counter = 0;
    if (value && driverLoginId) {
      timerRef = setInterval(async () => {
        // do stuff here
        counter = counter + 1;
        console.log({ counter });
        if (counter === 8) {
          clearInterval(timerRef);
          toast.error("No trips found in this location");
          setValue(false);
        }
        rideData = await getTrips(driverLoginId, {
          latitude,
          longitude,
        });
        if (rideData.length === 1) {
          setTrip(rideData[0]);
          console.log({ rideData });
          setRideModalShow(!rideModalShow);
          clearInterval(timerRef);
        } else {
          //toast.error("Oops..!  No Trips Found in your area");
          toast.info("Looking for ride", {
            autoClose: 2000,
          });
        }
      }, 4000);
    }
    return () => {
      console.log("I am getting cleaned");
      clearInterval(timerRef);
    };
  }, [driverLoginId, value]);

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
