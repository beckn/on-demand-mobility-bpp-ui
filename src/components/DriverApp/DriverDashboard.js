import React, { useState, useEffect } from "react";
import DriverAppHeader from "./components/Header/Header";
import DriverAppFooter from "./components/NavFooter/NavFooter";
import NavigateButton from "./components/Navigate/NavigateButton";
import ReadyStart from "./components/ReadyStart/ReadyStart";
import { usePosition } from "./hooks/usePosition";
import CustomMap from "./Maps/CustomMap";

function DriverDashboard() {
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    document.title = `Driver App`;
  };

  return (
    <div>
      <DriverAppHeader />
      <div>
        <CustomMap />
      </div>
       <NavigateButton />
      <DriverAppFooter />
    </div>
  );
}

export default DriverDashboard;
