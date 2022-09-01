import React from "react";
import "./NavFooter.css";
import { CarIcon } from "../../../../shared/icons/Car";
import { HomeIcon } from "../../../../shared/icons/Home";
import { ProfileIcon } from "../../../../shared/icons/Profile";
import { Link } from "react-router-dom";
import { AppRoutes, LocalKey } from "../../../../core/constant";

function DriverAppFooter() {
  return (
    <div className="Container fixed-bottom">
      <div className="homeicon">
        {" "}
        <HomeIcon />
      </div>
      <dniv className="caricon">
        <Link to={AppRoutes.driverDashboard} className="link-primary">
          <CarIcon />
        </Link>
      </dniv>
      <div className="profileicon">
        <Link to={AppRoutes.accountRegistration} className="link-primary">
          <ProfileIcon />
        </Link>
      </div>
    </div>
  );
}
export default DriverAppFooter;
