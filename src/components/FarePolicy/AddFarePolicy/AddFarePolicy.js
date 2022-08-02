import isEmpty from "lodash/isEmpty";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getDeploymentPurposes } from "../../DriversVehicles/DriversVehicles.Services";
import { saveTariffCard } from "../FarePolicy.Services";

const defaultTariffCard = {
  FromKms: "",
  ToKms: "",
  PricePerKm: "",
  DeploymentPurpose: { Id: "" },
};

export const AddFarePolicy = ({ existingFare, onChange, EditFare }) => {
  const PurposeRef = useRef(null);
  const [FareStore, setFareStore] = useState({
    DeploymentPurposes: [],
    TariffCards: {},
  });

  useEffect(() => {
    getDeploymentList();
  }, []);

  const getDeploymentList = () => {
    console.log("getDeploymentList", EditFare);
    getDeploymentPurposes().then((res) => {
      let existingFareTypes = [...new Set(existingFare.map((x) => x.DeploymentPurpose.Name))];
      let AvailableDeploymentPurposes = [];
      res.data.DeploymentPurposes.map((x) => {
        !existingFareTypes.includes(x.Name) && AvailableDeploymentPurposes.push(x);
      });
      setFareStore({
        ...FareStore,
        DeploymentPurposes: AvailableDeploymentPurposes || res.data.DeploymentPurposes,
      });
    });
  };

  const setInputValue = (e) => {
    let { name, value, dataset } = e.target;
    if (name === "DeploymentPurpose") {
      if (value) {
        let Vobj = JSON.parse(value);
        defaultTariffCard.DeploymentPurpose.Id = Vobj.Id;
        setFareStore({
          ...FareStore,
          TariffCards: { [Vobj.Name]: [defaultTariffCard] },
        });
      } else {
        setFareStore({
          ...FareStore,
          TariffCards: {},
        });
      }
    } else {
      let key = JSON.parse(PurposeRef.current.value).Name;
      let copy = JSON.parse(JSON.stringify(FareStore.TariffCards[key]));
      let fieldset = copy[+dataset.index];
      fieldset[name] = value;
      console.log("setInputValue", key, name, value, dataset.index, fieldset, copy);
    }
    // let newValue = name === "DeploymentPurpose" ? { Id: value } : value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let store = [];
    let value = JSON.parse(PurposeRef.current.value).Name;
    FareStore.TariffCards[value].forEach((element) => {
      console.log("element", element);
    });
    let data = {
      TariffCards: [],
    };
    // EditFare && (data.TariffCard.Id = EditFare.Id);
    // saveTariffCard(data).then((res) => {
    //   toast.success("Fare Policy Create/Update Successfully!");
    //   res.data && onChange(false);
    // });
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    let value = JSON.parse(PurposeRef.current.value).Name;
    let copy = FareStore.TariffCards[value];
    copy.push(defaultTariffCard);
    setFareStore({
      ...FareStore,
      TariffCards: {
        [value]: copy,
      },
    });
  };

  const handleRemoveRow = (e) => {
    e.preventDefault();
    let key = JSON.parse(PurposeRef.current.value).Name;
    let copy = JSON.parse(JSON.stringify(FareStore.TariffCards[key]));
    let { name } = e.target;
    copy.splice(+name, 1);
    setFareStore({
      ...FareStore,
      TariffCards: {
        [key]: copy,
      },
    });
    console.log(name);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h3 className="mb-0">Add/Edit Fare Policy</h3>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            Vehicle Type:{" "}
            <select ref={PurposeRef} onChange={setInputValue} className="form-select w-auto d-inline-block ms-3" name="DeploymentPurpose" id="DeploymentPurpose">
              <option value="">Select Vehicle Type</option>
              {/* {FareStore.DeploymentPurpose.Name && (
              <option value={FareStore.DeploymentPurpose.Name} selected>
                {FareStore.DeploymentPurpose.Name}
              </option>
            )} */}
              {FareStore.DeploymentPurposes.map((t, i) => {
                return (
                  <option key={i} value={JSON.stringify(t)}>
                    {t.Name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <hr />

        {!isEmpty(FareStore.TariffCards) && (
          <>
            <h5>
              Select Distance Range:
              <button className="btn btn-sm btn-primary float-end" onClick={handleAddRow}>
                Add
              </button>
            </h5>
            <hr />
            {Object.keys(FareStore.TariffCards).map((v) => {
              return FareStore.TariffCards[v].map((x, i) => {
                return (
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      From: <input onChange={setInputValue} defaultValue={x.FromKms} className="form-control w-auto d-inline-block ms-3" type="text" data-index={i} name="FromKms" id="FromKms" placeholder="KMS" />
                    </div>
                    <div className="col-sm-3">
                      To: <input onChange={setInputValue} defaultValue={x.ToKms} className="form-control w-auto d-inline-block ms-3" type="text" data-index={i} name="ToKms" id="ToKms" placeholder="KMS" />
                    </div>
                    <div className="col-sm-3">
                      Fare: <input onChange={setInputValue} defaultValue={x.PricePerKm} className="form-control w-auto d-inline-block ms-3" type="text" data-index={i} name="PricePerKm" id="PricePerKm" placeholder="Rs. per/KMS" />
                    </div>
                    {i !== 0 && (
                      <div className="col-3">
                        <button className="btn btn-sm btn-danger" name={i} onClick={handleRemoveRow}>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                );
              });
            })}
          </>
        )}
        <hr />
        <div className="row">
          <div className="col text-end">
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
