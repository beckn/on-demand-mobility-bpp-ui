import LocationIcon from "./location.png";
import Modal from "react-bootstrap/Modal";
import { OfflineIcon } from "../../../../shared/icons/Offline";
import { MarkerIcon } from "../../../../shared/icons/Marker";
import { MapPin } from "react-feather";

const { Title } = Modal;

export const OfflineModalContent = () => {
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

export const RideRequest = ({ onAccept, onReject, address, reject }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3 ">
      {!reject ? (
        <Title id="contained-modal-title-vcenter">New Ride Request!</Title>
      ) : (
        <Title id="contained-modal-title-vcenter text-danger">
          Request Declined!
        </Title>
      )}
      <span className="p-2">
        <MarkerIcon />
      </span>
      <div className="d-flex">
        <p>5 min away </p>

        <ul>
          <span className="dot"></span>2.5 kms
        </ul>
      </div>
      <div>
        <span className="d-flex mt-3 align-left">
          <MapPin color="#80BC48" />
          {address.driverAddress}
        </span>
        <span className="d-flex mt-3">
          <MapPin color="#D22323" />
          {address.pickupAddress}
        </span>
      </div>
      {!reject && (
        <>
          <button
            type="button"
            onClick={onAccept}
            class="w-100 btn btn-primary btn-lg btn-block mt-3 accept-button"
          >
            Accept
          </button>
          <button onClick={onReject} type="button" class="btn decline-button">
            Decline
          </button>
        </>
      )}
    </div>
  );
};

export const AlertModalContent = () => {
  return (
    <div className="d-flex justify-content-center p-2">
      <span className="p-2">
        <img src={LocationIcon} className="locationicon" />
      </span>
      <div className="p-2 alertdata">
        <Title id="contained-modal-title-vcenter">
          Your Location Is Not Enabled
        </Title>
        <p>Please enable your location to receive trip requests. </p>
      </div>
    </div>
  );
};
