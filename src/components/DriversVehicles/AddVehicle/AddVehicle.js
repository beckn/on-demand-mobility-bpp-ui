import isEmpty from "lodash/isEmpty";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Upload } from "react-feather";
import { setObjectToString } from "../../../core/common.functions";
import { DocumentType } from "../../../core/constant";
import { VehicleFuelType, VehicleTags, VehicleType } from "../../../shared/constant";
import { uploadFile } from "../../Account/Account.Services";
import { saveVehicle } from "../DriversVehicles.Services";

export const AddVehicle = (props) => {
  const [vehicleInfo, setVehicleInfo] = useState({
    VehicleNumber: "",
    Make: "",
    NameOfModel: "",
    VehicleType: "",
    FuelType: "",
    ValidFrom: null,
    ValidTo: null,
    RcNumber: "",
    InsuranceNumber: "",
    FitnessNumber: "",
    otherFields: {
      autocompleteMakeData: [],
      autocompleteNameOfModelData: [],
    },
  });

  const [newVehicleInfo, setNewVehicleInfo] = useState({});

  const dispatchEvent = (e) => {
    props.onChange(e);
  };

  const setStages = () => {};

  const setInputValue = (e, type) => {
    if (e.target) {
      e.preventDefault();
      const { name, value } = e.target;
      setVehicleInfo({
        ...vehicleInfo,
        [name]: value,
      });
    } else {
      setVehicleInfo({
        ...vehicleInfo,
        [type]: e,
      });
    }
  };

  const saveVehicleData = (e) => {
    e.preventDefault();
    let addVehicleInfo = {
      Vehicle: {
        VehicleNumber: vehicleInfo.VehicleNumber,
        Tags: setObjectToString(vehicleInfo),
      },
    };
    saveVehicle(addVehicleInfo).then((res) => {
      console.log("saveVehicle", res.data.Vehicles[0]);
      setNewVehicleInfo(res.data.Vehicles[0]);
    });
  };

  const getUpload = (e, type) => {
    let file = e.target.files[0];
    let formData = new FormData();
    let number = "";
    switch (type) {
      case DocumentType.INSURANCE:
        number = vehicleInfo.InsuranceNumber;
        break;
      case DocumentType.FITNESS:
        number = vehicleInfo.FitnessNumber;
        break;

      default:
        number = vehicleInfo.RcNumber;
        break;
    }
    let Id = newVehicleInfo.Id;

    formData.append("DOCUMENT", type);
    formData.append("FILE", file);
    formData.append("VEHICLE_ID", Id);
    formData.append("VALID_FROM", new Date(vehicleInfo.ValidFrom).toISOString());
    formData.append("VALID_TO", new Date(vehicleInfo.ValidTo).toISOString());
    formData.append("DOCUMENT_NUMBER", number);

    uploadFile("vehicle_documents/save", formData, "", false).then((res) => {
      console.log(`uploadData`, res.data.DriverDocument);
    });
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h3 className="mb-0">Add/Edit Vehicle:</h3>
        </div>
        <div className="col text-end">
          {isEmpty(newVehicleInfo) && (
            <>
              <button className="btn btn-secondary me-3" type="button" onClick={(e) => dispatchEvent(e)}>
                cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={(e) => saveVehicleData(e)}>
                Save
              </button>
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6 mb-3">
          <input type="text" className="form-control" name="VehicleNumber" disabled={!isEmpty(newVehicleInfo)} id="VehicleNumber" onChange={(e) => setInputValue(e)} placeholder="Enter Vehicle Number" />
        </div>
        <div className="col-6 mb-3">
          <input type="text" className="form-control" name="Make" id="Make" disabled={!isEmpty(newVehicleInfo)} onChange={(e) => setInputValue(e)} placeholder="Enter Vehicle Make" />
        </div>
      </div>
      <div className="row">
        <div className="row w-100 justify-content-left">
          <div className="col-4 mb-3">
            <input type="text" className="form-control" name="NameOfModel" disabled={!isEmpty(newVehicleInfo)} id="NameOfModel" onChange={(e) => setInputValue(e)} placeholder="Enter Vehicle Model" />
          </div>
          <div className="col-4 mb-3">
            <select name="VehicleType" disabled={!isEmpty(newVehicleInfo)} id="VehicleType" className="form-select" onChange={(e) => setInputValue(e)}>
              <option value="">Select Vehicle Type</option>
              {VehicleType.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4 mb-3">
            <select name="FuelType" id="FuelType" disabled={!isEmpty(newVehicleInfo)} className="form-select" onChange={(e) => setInputValue(e)}>
              <option value="">Select Vehicle Fuel Type</option>
              {VehicleFuelType.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {!isEmpty(newVehicleInfo) && (
        <>
          <div className="row mt-3">
            <div className="col">
              <h5>Document Upload</h5>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="row">
              <div className="row w-100 justify-content-left">
                <div className="col-5  mb-3">
                  <ReactDatePicker showMonthDropdown showYearDropdown dropdownMode="select" name="ValidFrom" id="ValidFrom" placeholderText="Enter R.C. Start Date" className="form-control" selected={vehicleInfo.ValidFrom ? new Date(vehicleInfo.ValidFrom) : vehicleInfo.ValidFrom} onChange={(date) => setInputValue(date, "ValidFrom")} />
                </div>
                <div className="col-5  mb-3">
                  <ReactDatePicker showMonthDropdown showYearDropdown dropdownMode="select" name="ValidTo" id="ValidTo" placeholderText="Enter R.C. End Date" className="form-control" selected={vehicleInfo.ValidTo ? new Date(vehicleInfo.ValidTo) : vehicleInfo.ValidTo} onChange={(date) => setInputValue(date, "ValidTo")} />
                </div>
              </div>
            </div>
            <div className="row w-100 justify-content-left">
              <div className="col-3 mb-3">
                <input type="text" name="RcNumber" id="RcNumber" onChange={(e) => setInputValue(e)} className="form-control" placeholder="Enter Vehicle R.C. Number" />
              </div>
              <div className="col-1  mb-3">
                <input type="file" name="RcFile" id="RcFile" className="form-control d-none" onChange={(e) => getUpload(e, DocumentType.RC)} />
                <label htmlFor="RcFile" role={"button"}>
                  <Upload />
                </label>
              </div>
              <div className="col-3 mb-3">
                <input type="text" name="InsuranceNumber" id="InsuranceNumber" onChange={(e) => setInputValue(e)} className="form-control" placeholder="Enter Vehicle Insurance Number" />
              </div>
              <div className="col-1  mb-3">
                <input type="file" name="InsuranceFile" id="InsuranceFile" className="form-control d-none" onChange={(e) => getUpload(e, DocumentType.INSURANCE)} />
                <label htmlFor="InsuranceFile" role={"button"}>
                  <Upload />
                </label>
              </div>
              <div className="col-3 mb-3">
                <input type="text" name="FitnessNumber" id="FitnessNumber" onChange={(e) => setInputValue(e)} className="form-control" placeholder="Enter Vehicle Fitness Certificate Number" />
              </div>
              <div className="col-1  mb-3">
                <input type="file" name="FitnessFile" id="FitnessFile" className="form-control d-none" onChange={(e) => getUpload(e, DocumentType.FITNESS)} />
                <label htmlFor="FitnessFile" role={"button"}>
                  <Upload />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <button className="btn btn-secondary" onClick={(e) => dispatchEvent(e)} type="button">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={(e) => dispatchEvent(e)} type="submit">
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddVehicle;
