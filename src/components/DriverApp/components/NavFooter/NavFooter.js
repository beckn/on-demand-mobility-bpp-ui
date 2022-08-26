import React from "react";
import "./NavFooter.css";
import { CarIcon } from "../../../../shared/icons/Car";
import { HomeIcon } from "../../../../shared/icons/Home";
import { ProfileIcon } from "../../../../shared/icons/Profile";

function DriverAppFooter() {
  return (
    <div className="Container fixed-bottom">
      <div className="homeicon">
        {" "}
        <HomeIcon />
      </div>
      <dniv className="caricon">
        <CarIcon />
      </dniv>
      <div className="profileicon">
        <ProfileIcon />
      </div>
    </div>
  );
}
export default DriverAppFooter;
