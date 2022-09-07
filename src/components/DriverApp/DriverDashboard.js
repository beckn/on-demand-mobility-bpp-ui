import React, { useState, useEffect } from "react";
import DriverAppHeader from "./components/Header/Header";
import DriverAppFooter from "./components/NavFooter/NavFooter";
import { usePosition } from "./hooks/usePosition";
import CustomMap from "./Maps/CustomMap";
import SwitchButton from "./components/SwitchButton/SwitchButton";
import NavigateButton from "./components/Navigate/NavigateButton";
import EndRide from "./components/EndRide/RideEnd";
import RideEnd from "./components/EndRide/RideEnd";

function DriverDashboard() {
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    document.title = `Driver App`;
  };

  return (
    <div>
       <DriverAppHeader title={"Home"}/>
      <div> 
         <div className="radio fixed-top">
          <SwitchButton />
        </div>  
         <CustomMap /> 
         <div className="fixed-bottom">
          <NavigateButton />
        </div> 
      </div>
      <DriverAppFooter />
      {/* <RideEnd /> */}
    </div>
  );
}

export default DriverDashboard;
