import React from "react";
import "./Header.css";
import {useNavigate} from "react-router-dom";

function DriverAppHeader({title}) {
  const navigate = useNavigate();
  return (
    <>
       <div className='top-bar'>
         <span className='icon_back'>
            <button className='back-button' onClick={() => navigate(-1)}><span>&#60;</span> Back</button>
         </span>
         <span class="header-push text-white">
            {title}
         </span>
      </div>
      {/*<div className="header fixed-top">
        <h3 className="header-text">Home</h3>
        <div className="Arrow">
          <BackArrowIcon />
          <button className="Btn">Back</button>
        </div>
<<<<<<< HEAD
      </div>
      <div className="radio fixed-top">
        <SwitchButton />
      </div>
=======
      </div>*/}

    </>
  );
}

export default DriverAppHeader;
