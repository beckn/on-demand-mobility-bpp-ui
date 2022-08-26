import React from "react";
import "./Header.css";
import { BackArrowIcon } from "../../../../shared/icons/BackArrow";
import NavigateButton from "../Navigate/NavigateButton";
import SwitchButton from "../SwitchButton/SwitchButton";

function DriverAppHeader() {
  return (
    <>
      <div className="header fixed-top">
        <h3 className="header-text">Home</h3>
        <div className="Arrow">
          <BackArrowIcon />
          <button className="Btn">Back</button>
        </div>
      </div>
      <div className="radio fixed-top">
        <SwitchButton />
      </div>
      <div className="fixed-bottom">
        <NavigateButton />
      </div>
    </>
  );
}

export default DriverAppHeader;
