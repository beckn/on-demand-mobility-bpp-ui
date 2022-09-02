import React, { useState, useEffect } from "react";
import "./Registration_css.css";
import Upload from "./upload.png";
import Modal from "react-bootstrap/Modal";
import Success from "./success.png";
import DriverAppHeader from "../Header/Header";
import { LogOut } from "react-feather";
import DriverAppFooter from "../NavFooter/NavFooter";
import { getCookie, removeCookie } from "../../../../core/CookiesHandler";
import { LocalKey, DocumentType, AppRoutes } from "../../../../core/constant";
import { uploadFile } from "../../../Account/Account.Services";

import { userLogout } from "../../../LoginModule/Login.services";

export default function Registration() {
  const User = JSON.parse(getCookie(LocalKey.saveUser)) || null;
  console.log({ User });
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <DriverAppHeader title={"Account"} />
      <div>
        {flag ? (
          <RegistrationSubmit User={User} />
        ) : (
          <RegistrationHome Flag={setFlag} User={User} />
        )}
      </div>
      <DriverAppFooter />
    </div>
  );
}

function RegistrationHome({ Flag, User }) {
  const [name, setName] = useState(User.LongName || "");
  const [mobileno, setMobileNo] = useState(User.PhoneNumber || "");
  const [email, setEmail] = useState(User.Name || "");
  const [sex, setSex] = useState("Male" || "");
  const [age, setAge] = useState(32 || "");

  const SubmitButton = () => {
    if (name && mobileno && email && sex && age) {
      return (
        <button
          type="button"
          onClick={() => Flag(true)}
          className="btn btn-secondary coloract"
        >
          Next
        </button>
      );
    } else {
      return (
        <button type="button" className=" btn btn-secondary" disabled>
          Next
        </button>
      );
    }
  };
  const logout = () => {
    userLogout("logout").then((res) => {
      console.log("User Logout", res);
      removeCookie(LocalKey.saveApi);
      removeCookie(LocalKey.saveUser);
      window.location.href = AppRoutes.admin;
    });
  };
  return (
    <div>
      <div className="Registration-body">
        <div className="logout" onClick={logout}>
          <LogOut />
          LogOut
        </div>

        <div className="top-padding">
          <span className="bold-text">Name :</span>
          <span className="top-padding4 ">
            <input
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="top-padding4"
            />
          </span>
        </div>

        <div className="top-padding">
          <span className="bold-text">Email ID :</span>
          <span className="top-padding4 align-left">
            <input
              placeholder="Enter Your Email ID"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="top-padding4"
            />
          </span>
        </div>

        <div className="top-padding">
          <span className="bold-text">Mobile Number :</span>
          <span className="top-padding4 align-left">
            <input
              placeholder="Enter Your Mobile Number"
              type="text"
              value={mobileno}
              onChange={(e) => setMobileNo(e.target.value)}
              className="top-padding4"
            />
          </span>
        </div>

        <div className="top-padding">
          <span className="bold-text">Sex :</span>
          <span className="top-padding4 align-left">
            <input
              placeholder="Enter Your Sex"
              type="text"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="top-padding4"
            />
          </span>
        </div>

        <div className="top-padding">
          <span className="bold-text">Age :</span>
          <span className="top-padding4 align-left">
            <input
              placeholder="Enter Your Age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="top-padding4"
            />
          </span>
        </div>

        {User.Approved === "N" && (
          <div className="top-padding2">
            <SubmitButton />
          </div>
        )}
      </div>
    </div>
  );
}

function RegistrationSubmit({ User }) {
  const [showModal, setShowModal] = useState(false);
  const [eKycPassword, setEKycPassword] = useState("");
  const [PanNumber, setPanNumber] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    document.title = `taxi BPP - Account Information`;
    if (User && User?.DriverDocuments) {
      let LicenceNo = User?.DriverDocuments?.find(
        (x) => x.Document === DocumentType.Licence
      )?.DocumentNumber;
      let PanNumber = User?.DriverDocuments?.find(
        (x) => x.Document === DocumentType.Pan
      )?.DocumentNumber;
      setLicenseNumber(LicenceNo?.toUpperCase());
      setPanNumber(PanNumber?.toUpperCase());
    }
  };

  const getUpload = (e, type) => {
    let file = e.target.files[0];
    let formData = new FormData();
    let number = type === DocumentType.Licence ? LicenseNumber : PanNumber;
    let userId = User.Id;

    if (type === DocumentType.Licence || type === DocumentType.Pan) {
      formData.append("ADDRESS_LINE_1", User?.AddressLine1 || "");
      formData.append("ADDRESS_LINE_2", User?.AddressLine2 || "");
      formData.append("ADDRESS_LINE_3", User?.AddressLine3 || "");
      formData.append("CITY_NAME", User?.City?.Name || "");
      formData.append("STATE_NAME", User?.City?.State.Name || "");
      formData.append("EMAIL", User.Name);
      formData.append("PHONE_NUMBER", User.PhoneNumber);
      formData.append("DATE_OF_BIRTH", User.DateOfBirth);
    }

    formData.append("DOCUMENT", type);
    formData.append("FILE", file);
    formData.append("DRIVER_ID", userId);
    formData.append("DOCUMENT_NUMBER", number);
    type === DocumentType.Aadhar && formData.append("PASSWORD", eKycPassword);

    uploadFile("driver_documents/save", formData, "", true).then((res) => {
      console.log(`uploadData`, res.data.DriverDocument);
    });
  };

  function SubmitButton() {
    if (PanNumber && LicenseNumber && eKycPassword) {
      return (
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="btn btn-secondary coloract"
        >
          <span className="cart">Submit</span>
        </button>
      );
    } else {
      return (
        <button type="button" className=" btn btn-secondary" disabled>
          Submit
        </button>
      );
    }
  }
  return (
    <>
      <div className="Registration-body">
        <div className="top-padding">
          <span className="bold-text">Aadhaar Card:</span>
          <span className="upload-btn-wrapper top-padding4">
            <label className="uploadbtn" htmlFor="AadharFile" role={"button"}>
              <img src={Upload} className="AccountIcon" />
            </label>
            <input
              type="file"
              id="AadharFile"
              name="AadharFile"
              onChange={(e) => getUpload(e, DocumentType.Aadhaar)}
            />
          </span>
          <input
            placeholder="Enter your E-KYC Zip password."
            type="text"
            className="align-left top-padding4"
            value={eKycPassword}
            disabled={User?.DriverDocuments?.find(
              (x) => x.Document === DocumentType.Aadhar
            )}
          />
        </div>

        <div className="top-padding">
          <span className="bold-text">PAN Number:</span>
          <span className="upload-btn-wrapper top-padding4">
            <label className="uploadbtn" htmlFor="PanFile" role={"button"}>
              <img src={Upload} className="AccountIcon" />
            </label>
            <input
              type="file"
              name="PanFile"
              id="PanFile"
              onChange={(e) => getUpload(e, DocumentType.Pan)}
            />
          </span>
          <input
            placeholder="Enter your PAN Number"
            type="text"
            className="align-left bold-text top-padding4"
            value={PanNumber}
            disabled={User?.DriverDocuments?.find(
              (x) => x.Document === DocumentType.Pan
            )}
            onChange={(e) => setPanNumber(e.target.value.toLowerCase())}
          />
        </div>

        <div className="top-padding">
          <span className="bold-text">Driving License:</span>
          <span className="upload-btn-wrapper top-padding4">
            <label className="uploadbtn" htmlFor="LicenseFile" role={"button"}>
              <img src={Upload} className="AccountIcon" />
            </label>
            <input
              type="file"
              name="LicenseFile"
              id="LicenseFile"
              onChange={(e) => getUpload(e, DocumentType.License)}
            />
          </span>
          <input
            placeholder="Enter your Driving License Number"
            type="text"
            className="align-left bold-text top-padding4"
            value={LicenseNumber}
            disabled={User?.DriverDocuments?.find(
              (x) => x.Document === DocumentType.Licence
            )}
          />
        </div>

        <div className="top-padding2">
          <SubmitButton />
        </div>

        <Modal
          className="popup1"
          size="sm"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <div>
            <button className="close" onClick={() => setShowModal(false)}>
              ×
            </button>
          </div>

          <Modal.Body className="mbody">
            <div>
              <img src={Success} className="success" />
            </div>
            <br />
            <span className="bold-text">Registration successfull!</span>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
