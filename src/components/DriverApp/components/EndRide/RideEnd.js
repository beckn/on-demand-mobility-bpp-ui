import React from "react";
import { MapPin } from "react-feather";
import { LocationIcon } from "../../../../shared/icons/Location";
import CustomMap from "../../Maps/CustomMap";
import { EndRideData } from "../DriveData";
import "./RideEnd.css";

function RideEnd() {
  return (
    <div>
      <h1 className="titleP">{EndRideData.title}</h1>
      <p className="subP">{EndRideData.Subtitle}</p>
      <h2 className="Rp">{EndRideData.Rupues}</h2>
      <hr className="hrp" />
      <h6 className="date">{EndRideData.Date}</h6>
      <h6 className="dist">{EndRideData.Distance}</h6>
      <h6 className="tm">{EndRideData.Time}</h6>
      <div className="locationI">
        <LocationIcon />
        <p className="LP">{EndRideData.addres}</p>
        <div className="MaP">
          <MapPin color="#D22323" />
          <p className="Mpin">{EndRideData.LocationPin}</p>
        </div>
      </div>
      {/* <CustomMap customHeight={"450px"} /> */}
      <button className="End fixed-bottom">Search Another Ride</button>
    </div>
  );
}

export default RideEnd;
