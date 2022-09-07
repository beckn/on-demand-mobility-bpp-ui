import React, { useState } from "react";
import "./NavFooter.css";
import { CarIcon } from "../../../../shared/icons/Car";
import { HomeIcon } from "../../../../shared/icons/Home";
import { ProfileIcon } from "../../../../shared/icons/Profile";
import { Link } from "react-router-dom";
import { AppRoutes, LocalKey } from "../../../../core/constant";

function DriverAppFooter() {
  const [accountActive, setAccountColor] = useState("gray");
  const [rideActive, setRideColor] = useState("black");
  const [homeActive, setHomeColor] = useState("gray");
  const AccountActiveColor=()=>{
    setHomeColor("gray");
    setRideColor("black");
    setAccountColor("#9DAFF0");
  };
  const RideActiveColor=()=>{
    setHomeColor("gray");
    setAccountColor("gray");
    setRideColor("#3c65f8");
  };
  const HomeActiveColor=()=>{
    setAccountColor("gray");
    setRideColor("black");
    setHomeColor("#3c65f8");
  };
  return (
    <div className="Container fixed-bottom">
      <div className="homeicon" onClick={()=>HomeActiveColor()}>
        {" "}
        <HomeIcon fill={homeActive}/>
      </div>
      <div className="caricon" onClick={()=>RideActiveColor()}>
        <Link to={AppRoutes.driverDashboard} >
          <CarIcon fill={rideActive} />
        </Link>
      </div>
      <div className="profileicon" onClick={()=>AccountActiveColor()}>
        <Link to={AppRoutes.accountRegistration}> 
          <ProfileIcon fill={accountActive} />
        </Link>
      </div>
    </div>
  );
}
export default DriverAppFooter;