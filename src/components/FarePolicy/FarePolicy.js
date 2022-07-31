import React, { useEffect, useState } from "react";
import { VehicleType } from "../../shared/constant";
import { getFarePolicies } from "./FarePolicy.Services";
import "./FarePolicy.scss";

export const FarePolicy = ({ FareList, onUpdate, onChange }) => {
  const [store, setStore] = useState({
    TariffCards: [],
    Type: VehicleType,
  });
  useEffect(() => {
    getFareList();
  }, [FareList]);

  const getFareList = () => {
    getFarePolicies().then((res) => {
      setStore({
        ...store,
        TariffCards: res.data.TariffCards,
      });
      onUpdate(res.data.TariffCards);
    });
  };
  return store.TariffCards.length === 0
    ? `No Fare Policy Available!! Click here New to add one.`
    : store.TariffCards?.map((card) => {
        return (
          <>
            <div className="row mb-3">
              <div className="col-sm card border-0" type="button">
                <div className="border bg-primary border-primary p-4 rounded-3 position-relative">
                  <div className="row-action">
                    <button type="button" className="btn btn-link p-0" onClick={(e) => onChange(e, card)}>
                      edit
                    </button>
                  </div>
                  <h5>Vehicle Type : {card.DeploymentPurpose.Name}</h5>
                  <h6>
                    Fare : Rs. {card.PricePerKm} / Km for ( from {card.FromKms} Kms to {card.ToKms} Kms)
                  </h6>
                </div>
              </div>
            </div>
          </>
        );
      });
};

export default FarePolicy;
