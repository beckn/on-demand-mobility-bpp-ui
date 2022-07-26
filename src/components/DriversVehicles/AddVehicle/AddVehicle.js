import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Upload } from "react-feather";
import { toast } from "react-toastify";
import { getKeyValueFromString, setObjectToString, setValue } from "../../../core/common.functions";
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
  const [isDisabled, setIsDisabled] = useState(!isEmpty(newVehicleInfo) || !props.vehicleEdit);
  const [documentsInfo, setDocumentsInfo] = useState({
    RcDoc: {
      VALID_FROM: null,
      VALID_TO: null,
      DOCUMENT_NUMBER: "",
      FILE: {},
      DOCUMENT: DocumentType.RC,
    },
    InsDoc: {
      DOCUMENT_NUMBER: "",
      FILE: {},
      DOCUMENT: DocumentType.INSURANCE,
    },
    FitDoc: {
      DOCUMENT_NUMBER: "",
      FILE: {},
      DOCUMENT: DocumentType.FITNESS,
    },
  });

  const dispatchEvent = (e) => {
    props.onChange(e);
  };

  useEffect(() => {
    initial();
    setNewVehicleInfo(props.vehicleEdit);
  }, [props.vehicleEdit]);

  const initial = () => {
    setNewVehicleInfo(props.vehicleEdit);
    let upInfo = vehicleInfo;
    let tags = props.vehicleEdit.Tags;
    Object.keys(upInfo).forEach((v) => {
      if (VehicleTags.includes(v)) {
        console.log(v, getKeyValueFromString(v, tags));
        upInfo = {
          ...upInfo,
          [v]: getKeyValueFromString(v, tags),
        };
      }
    });

    setVehicleInfo({
      ...upInfo,
      VehicleNumber: props.vehicleEdit.VehicleNumber,
      ValidFrom: props.vehicleEdit.VehicleDocuments?.find((x) => x.Document === DocumentType.RC).ValidFrom,
      ValidTo: props.vehicleEdit.VehicleDocuments?.find((x) => x.Document === DocumentType.RC).ValidTo,
      RcNumber: props.vehicleEdit.VehicleDocuments?.find((x) => x.Document === DocumentType.RC).DocumentNumber,
      InsuranceNumber: props.vehicleEdit.VehicleDocuments?.find((x) => x.Document === DocumentType.INSURANCE).DocumentNumber,
      FitnessNumber: props.vehicleEdit.VehicleDocuments?.find((x) => x.Document === DocumentType.FITNESS).DocumentNumber,
    });
    console.log("up info", upInfo, vehicleInfo);
  };

  const setInputValue = (e, type) => {
    if (e.target) {
      e.preventDefault();
      const { name, value } = e.target;
      setVehicleInfo({
        ...vehicleInfo,
        [name]: value,
      });
    } else {
      setDocumentsInfo({
        ...documentsInfo,
        [type]: e,
      });
    }
  };

  const setDocumentValue = (e, type) => {
    let docInfo = documentsInfo;
    if (e.target) {
      e.preventDefault();
      const { name, value, type, files } = e.target;
      setValue(name, type === "file" ? files[0] : value, docInfo);
      setDocumentsInfo({
        ...docInfo,
      });
    } else {
      setValue(type, new Date(e).toISOString(), docInfo);
      setDocumentsInfo({
        ...docInfo,
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
    if (newVehicleInfo && props.vehicleEdit) {
      addVehicleInfo.Vehicle.Id = newVehicleInfo.Id;
    }
    saveVehicle(addVehicleInfo).then((res) => {
      // console.log("saveVehicle", res.data.Vehicles[0]);
      setNewVehicleInfo(res.data.Vehicles[0]);
    });
  };
  
  const submitDocuments = (e) => {
    e.preventDefault();
    let data = [];
    Object.keys(documentsInfo).forEach((v, index) => {
      let formData = new FormData();
      formData.append("VEHICLE_ID", newVehicleInfo.Id);
      Object.keys(documentsInfo[v]).forEach((f, i) => {
        console.log("append", f, documentsInfo[v][f]);
        formData.append(f, documentsInfo[v][f]);
      });
      data.push(uploadFile("vehicle_documents/save", formData, "", false));
    });
    Promise.all(data).then((res) => {
      toast.success("Document upload successfully!!");
      props.onChange(e);
    });
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h3 className="mb-0">Add/Edit Vehicle:</h3>
        </div>
        <div className="col text-end">
          {!isDisabled ? (
            <>
              <button className="btn btn-secondary me-3" type="button" onClick={(e) => dispatchEvent(e)}>
                cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={(e) => saveVehicleData(e)}>
                Save
              </button>
            </>
          ) : (
            <button className="btn btn-primary me-3" type="button" onClick={(e) => setIsDisabled(false)}>
              Edit
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6 mb-3">
          <input type="text" className="form-control" name="VehicleNumber" disabled={isDisabled} defaultValue={vehicleInfo.VehicleNumber} id="VehicleNumber" onChange={(e) => setInputValue(e)} placeholder="Enter Vehicle Number" />
        </div>
        <div className="col-6 mb-3">
          <input type="text" className="form-control" name="Make" id="Make" disabled={isDisabled} defaultValue={vehicleInfo.Make} onChange={(e) => setInputValue(e)} placeholder="Enter Vehicle Make" />
        </div>
      </div>
      <div className="row">
        <div className="row w-100 justify-content-left">
          <div className="col-4 mb-3">
            <input type="text" className="form-control" name="NameOfModel" disabled={isDisabled} defaultValue={vehicleInfo.NameOfModel} id="NameOfModel" onChange={(e) => setInputValue(e)} placeholder="Enter Vehicle Model" />
          </div>
          <div className="col-4 mb-3">
            <select name="VehicleType" disabled={isDisabled} id="VehicleType" defaultValue={vehicleInfo.VehicleType} selectedValue={vehicleInfo.VehicleType} className="form-select" onChange={(e) => setInputValue(e)}>
              <option value="">Select Vehicle Type</option>
              {VehicleType.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4 mb-3">
            <select name="FuelType" id="FuelType" defaultValue={vehicleInfo.FuelType} selectedValue={vehicleInfo.FuelType} disabled={isDisabled} className="form-select" onChange={(e) => setInputValue(e)}>
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
                <div className="col-4  mb-3">
                  <ReactDatePicker showMonthDropdown showYearDropdown dropdownMode="select" id="ValidFrom" placeholderText="Enter R.C. Start Date" className="form-control" selected={documentsInfo.RcDoc.VALID_FROM ? new Date(documentsInfo.RcDoc.VALID_FROM) : documentsInfo.RcDoc.VALID_FROM} onChange={(date) => setDocumentValue(date, "RcDoc.VALID_FROM")} />
                </div>
                <div className="col-4  mb-3">
                  <ReactDatePicker showMonthDropdown showYearDropdown dropdownMode="select" id="ValidTo" placeholderText="Enter R.C. End Date" className="form-control" selected={documentsInfo.RcDoc.VALID_TO ? new Date(documentsInfo.RcDoc.VALID_TO) : documentsInfo.RcDoc.VALID_TO} onChange={(date) => setDocumentValue(date, "RcDoc.VALID_TO")} />
                </div>
                <div className="col-3">
                  <input type="text" name="RcDoc.DOCUMENT_NUMBER" id="RcNumber" defaultValue={documentsInfo.RcDoc.DOCUMENT_NUMBER} onChange={(e) => setDocumentValue(e)} className="form-control" placeholder="Enter Vehicle R.C. Number" />
                  {!isEmpty(newVehicleInfo) && <p>{newVehicleInfo.VehicleDocuments?.find((x) => x.Document === DocumentType.RC).Verified === "N" ? "R.C. Verification Pending" : "Verified"}</p>}
                </div>
                <div className="col-1  mb-3">
                  <input type="file" name="RcDoc.FILE" id="RcFile" className="form-control d-none" onChange={(e) => setDocumentValue(e)} />
                  <label htmlFor="RcFile" role={"button"}>
                    <Upload />
                  </label>
                </div>
              </div>
            </div>
            <div className="row w-100 justify-content-left">
              <div className="col-3 mb-3">
                <input type="text" name="InsDoc.DOCUMENT_NUMBER" defaultValue={documentsInfo.InsDoc.DOCUMENT_NUMBER} id="InsuranceNumber" onChange={(e) => setDocumentValue(e)} className="form-control" placeholder="Enter Vehicle Insurance Number" />
                {!isEmpty(newVehicleInfo) && <p>{newVehicleInfo.VehicleDocuments?.find((x) => x.Document === DocumentType.INSURANCE).Verified === "N" ? "Insurance Verification Pending" : "Verified"}</p>}
              </div>
              <div className="col-1  mb-3">
                <input type="file" name="InsDoc.FILE" id="InsuranceFile" className="form-control d-none" onChange={(e) => setDocumentValue(e)} />
                <label htmlFor="InsuranceFile" role={"button"}>
                  <Upload />
                </label>
              </div>
              <div className="col-3 mb-3">
                <input type="text" name="FitDoc.DOCUMENT_NUMBER" defaultValue={documentsInfo.FitDoc.DOCUMENT_NUMBER} id="FitnessNumber" onChange={(e) => setDocumentValue(e)} className="form-control" placeholder="Enter Vehicle Fitness Certificate Number" />
                {!isEmpty(newVehicleInfo) && <p>{newVehicleInfo.VehicleDocuments?.find((x) => x.Document === DocumentType.FITNESS).Verified === "N" ? "Fitness Verification Pending" : "Verified"}</p>}
              </div>
              <div className="col-1  mb-3">
                <input type="file" name="FitDoc.FILE" id="FitnessFile" className="form-control d-none" onChange={(e) => setDocumentValue(e)} />
                <label htmlFor="FitnessFile" role={"button"}>
                  <Upload />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <button className="btn btn-secondary me-3" onClick={(e) => dispatchEvent(e)} type="button">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={(e) => submitDocuments(e)} type="submit">
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
