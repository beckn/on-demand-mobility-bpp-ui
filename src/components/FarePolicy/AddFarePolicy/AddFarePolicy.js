import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDeploymentPurposes } from "../../DriversVehicles/DriversVehicles.Services";
import { saveTariffCard } from "../FarePolicy.Services";

export const AddFarePolicy = ({ existingFare, onChange, EditFare }) => {
  const [FareStore, setFareStore] = useState({
    DeploymentPurposes: [],
    FromKms: "",
    ToKms: "",
    PricePerKm: "",
    DeploymentPurpose: { Id: "" },
  });

  useEffect(() => {
    getDeploymentList();
  }, []);

  const getDeploymentList = () => {
    console.log("getDeploymentList", EditFare);
    getDeploymentPurposes().then((res) => {
      let existingFareTypes = existingFare.map((x) => x.DeploymentPurpose.Name);
      let AvailableDeploymentPurposes = [];
      res.data.DeploymentPurposes.map((x) => {
        !existingFareTypes.includes(x.Name) && AvailableDeploymentPurposes.push(x);
      });
      setFareStore({
        ...FareStore,
        ...EditFare,
        DeploymentPurposes: AvailableDeploymentPurposes,
      });
    });
  };

  const setInputValue = (e) => {
    let { name, value } = e.target;
    let newValue = name === "DeploymentPurpose" ? { Id: value } : value;
    setFareStore({
      ...FareStore,
      [name]: newValue,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let store = FareStore;
    delete store.DeploymentPurposes;
    let data = {
      TariffCard: {
        ...store,
      },
    };
    EditFare && (data.TariffCard.Id = EditFare.Id);
    saveTariffCard(data).then((res) => {
      toast.success("Fare Policy Create/Update Successfully!");
      res.data && onChange(false);
    });
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h3 className="mb-0">Add/Edit Fare Policy</h3>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          Vehicle Type:{" "}
          <select onChange={setInputValue} defaultValue={FareStore.DeploymentPurpose.Name} className="form-select w-auto d-inline-block ms-3" name="DeploymentPurpose" id="DeploymentPurpose">
            <option value="">Select Vehicle Type</option>
            {FareStore.DeploymentPurpose.Name && (
              <option value={FareStore.DeploymentPurpose.Name} selected>
                {FareStore.DeploymentPurpose.Name}
              </option>
            )}
            {FareStore.DeploymentPurposes.map((t, i) => {
              return (
                <option key={i} value={t.Id}>
                  {t.Name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <h5>Select Distance Range:</h5>
            <div className="row mb-3">
              <div className="col-sm-4">
                From: <input onChange={setInputValue} defaultValue={FareStore.FromKms} className="form-control w-auto d-inline-block ms-3" type="text" name="FromKms" id="FromKms" placeholder="KMS" />
              </div>
              <div className="col-sm-4">
                To: <input onChange={setInputValue} defaultValue={FareStore.ToKms} className="form-control w-auto d-inline-block ms-3" type="text" name="ToKms" id="ToKms" placeholder="KMS" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                Fare: <input onChange={setInputValue} defaultValue={FareStore.PricePerKm} className="form-control w-auto d-inline-block ms-3" type="text" name="PricePerKm" id="PricePerKm" placeholder="Rs. per/KMS" />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-secondary me-3" onClick={() => onChange(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddFarePolicy;
