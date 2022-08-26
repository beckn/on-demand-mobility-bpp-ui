import React,{useState} from "react";
import DriverAppHeader from "./components/Header/Header";
import DriverAppFooter from "./components/NavFooter/NavFooter";
import {usePosition} from "./hooks/usePosition";
import CustomMap from "./Maps/CustomMap";

function DriverDashboard() {
 
  
  return (
    <div>
      <DriverAppHeader/> 
      <div>
    <CustomMap />
      </div>
      <DriverAppFooter />
    </div>
  );
}

export default DriverDashboard;
