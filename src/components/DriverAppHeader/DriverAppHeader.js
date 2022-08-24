import React from "react";
import './DriverAppHeader.css'
import { BackArrowIcon } from "../../shared/icons/BackArrow";
import NavigateButton from "../Navigate/NavigateButton";
import SwitchButton from "../SwitchBotton/SwitchButton";

function DriverAppHeader() {
  return (
    <>
    <div className="header">
      <h3 className="header-text">Home</h3>
      <div className="Arrow">
        <BackArrowIcon />
        <button className="Btn">Back</button>
      </div>
    </div>
    <div className="radio">
    <SwitchButton />
    </div>
    <div className="navigate"><NavigateButton />
    </div>
    </>
  );
}

export default DriverAppHeader;
