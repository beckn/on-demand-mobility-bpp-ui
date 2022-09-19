import React from "react";
import { useNavigate } from "react-router";
import { LocationIcon as MapPin } from "../../../../shared/icons/Location";
import DriverAppFooter from "../NavFooter/NavFooter";
import { LocationIcon } from "../../../../shared/icons/Location";
import { LocalKey, AppRoutes } from "../../../../core/constant";
import CustomMap from "../../Maps/CustomMap";
import { EndRideData } from "../DriveData";
import "./RideEnd.css";
import { getCookie, removeCookie } from "../../../../core/CookiesHandler";
import { round } from "../../utils/utils";
const formatDate = (date) => {
  return date.split(" ")[0] || "NA";
};
function RideEnd() {
  const navigate = useNavigate();
  const {
    res: rideSummary,
    location,
    distance,
  } = JSON.parse(getCookie(LocalKey.saveActiveRide)) || null;
  console.log({ rideSummary, distance });
  return (
    <>
      <div className="m-3">
        <h1 className="titleP">{EndRideData.title}</h1>
        <p className="subP">{EndRideData.Subtitle}</p>
        <h2 className="Rp">Rs. {round(rideSummary.SellingPrice) || 0}</h2>
        <hr className="hrp" />
        <div className="d-flex mt-5 justify-content-between px-3">
          <h6>{formatDate(rideSummary.CreatedAt)}</h6>
          <h6>
            Total Distance : <b>{round(distance) || 0} Kms</b>
          </h6>
        </div>

        {/* <h6 className="tm">{EndRideData.Time}</h6> */}

        <div className="mx-3">
          <span title="pickup point" className="d-flex mt-3 align-left gap-4">
            <MapPin fill="#80BC48" />
            {location.driverAddress}
          </span>
          <span title="destination point" className="d-flex mt-3 gap-4">
            <MapPin fill="#D22323" />
            {location.pickupAddress}
          </span>
        </div>
        <CustomMap mapType="end" />
        <button className="End fixed-bottom" onClick={() => navigate(-1)}>
          Search Another Ride
        </button>
      </div>
      <DriverAppFooter title="Home" />
    </>
  );
}

export default RideEnd;
