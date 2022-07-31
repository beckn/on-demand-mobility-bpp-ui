import { getRequestData, postRequestData } from "../../core/apiClient";

export const getFarePolicies = () => {
  let path = `tariff_cards`;
  return getRequestData(path);
};

export const saveTariffCard = (data) => {
  let path = `tariff_cards/save/`;
  return postRequestData(path, data);
};
