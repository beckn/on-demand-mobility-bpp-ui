import React, { useState } from "react";
import "./NavFooter.css";
import { CarIcon } from "../../../../shared/icons/Car";
import { HomeIcon } from "../../../../shared/icons/Home";
import { ProfileIcon } from "../../../../shared/icons/Profile";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes, LocalKey } from "../../../../core/constant";

function DriverAppFooter({ title }) {
  const navigate = useNavigate();
  const isHomeActive = title === "Home";
  const AccountActiveColor = () => {
    navigate(AppRoutes.accountRegistration);
  };

  const HomeActiveColor = () => {
    navigate(AppRoutes.driverDashboard);
  };
  return (
    <div className="Container fixed-bottom1">
      <div className="homeicon" onClick={() => HomeActiveColor()}>
        <HomeIcon fill={isHomeActive ? "#3c65f8" : "#00000066"} />
      </div>
      <div className="caricon">
        <CarIcon fill="black" />
      </div>
      <div className="profileicon" onClick={() => AccountActiveColor()}>
        <ProfileIcon fill={!isHomeActive ? "#9DAFF0" : "#00000066"} />
      </div>
    </div>
  );
}
export default DriverAppFooter;
