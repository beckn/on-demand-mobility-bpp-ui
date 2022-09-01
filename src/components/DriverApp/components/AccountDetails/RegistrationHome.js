import React, { useState } from "react";
import "./Registration_css.css";
import Upload from "./upload.png";
import Modal from "react-bootstrap/Modal";
import Success from "./success.png";
import DriverAppHeader from "../Header/Header";
import DriverAppFooter from "../NavFooter/NavFooter";
import { getCookie } from "../../../../core/CookiesHandler";
import { LocalKey } from "../../../../core/constant";

export default function Registration() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <DriverAppHeader title={"Account"} />
      <div>
        {flag ? <RegistrationSubmit /> : <RegistrationHome Flag={setFlag} />}
      </div>
      <DriverAppFooter />
    </div>
  );
}

function RegistrationHome({ Flag }) {
  const User = JSON.parse(getCookie(LocalKey.saveUser)) || null;
  console.log({ User });
  const [name, setName] = useState(User.LongName || "");
  const [mobileno, setMobileNo] = useState(User.PhoneNumber || "");
  const [email, setEmail] = useState(User.Name || "");
  const [sex, setSex] = useState("Male" || "");
  const [age, setAge] = useState(32 || "");

  function SubmitButton() {
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
  }

  return (
    <div>
      <div class="Registration-body">
        <div className="top-padding">
          <span className="bold-text">Name :</span>
          <span class="top-padding4 ">
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
          <span class="top-padding4 align-left">
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
          <span class="top-padding4 align-left">
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
          <span class="top-padding4 align-left">
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
          <span class="top-padding4 align-left">
            <input
              placeholder="Enter Your Age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="top-padding4"
            />
          </span>
        </div>

        <div className="top-padding2">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

function RegistrationSubmit() {
  const [showModal, setShowModal] = useState(false);
  const [panno, setPanNo] = useState("");
  const [drivinglicense, setDrivingLicense] = useState("");
  const [aadharno, setAadhaarNo] = useState("");

  function SubmitButton() {
    if (panno && drivinglicense && aadharno) {
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
      <div class="Registration-body">
        <div className="top-padding">
          <span className="bold-text">Aadhaar Card:</span>
          <span class="upload-btn-wrapper top-padding4">
            <button class="uploadbtn">
              <img src={Upload} className="AccountIcon" />
            </button>
            <input type="file" name="myfile" />
          </span>
          <input
            placeholder="Enter your Aadhaar Card No."
            type="text"
            className="align-left top-padding4"
            value={aadharno}
            onChange={(e) => setAadhaarNo(e.target.value)}
          />
        </div>

        <div className="top-padding">
          <span className="bold-text">PAN Number:</span>
          <span class="upload-btn-wrapper top-padding4">
            <button class="uploadbtn">
              <img src={Upload} className="AccountIcon" />
            </button>
            <input type="file" name="myfile" />
          </span>
          <input
            placeholder="Enter your PAN Number"
            type="text"
            className="align-left bold-text top-padding4"
            value={panno}
            onChange={(e) => setPanNo(e.target.value)}
          />
        </div>

        <div className="top-padding">
          <span className="bold-text">Driving License:</span>
          <span class="upload-btn-wrapper top-padding4">
            <button class="uploadbtn">
              <img src={Upload} className="AccountIcon" />
            </button>
            <input type="file" name="myfile" />
          </span>
          <input
            placeholder="Enter your Driving License Number"
            type="text"
            className="align-left bold-text top-padding4"
            value={drivinglicense}
            onChange={(e) => setDrivingLicense(e.target.value)}
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
            <button class="close" onClick={() => setShowModal(false)}>
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
