import { getRequestData, postRequestData } from "../../core/apiClient";
import { DeploymentPurposesFields, VehicleFields } from "../../core/fieldsSet";

export const verify = (id, type) => {
  let path = `${type}/verify/${id}`;
  return getRequestData(path);
};

export const getVehicles = () => {
  let path = `vehicles/`;
  return getRequestData(path, VehicleFields);
};

export const getAutoCompleteVehicle = (type) => {
  let path = `tags/search?q=${type}`;
  return getRequestData(path);
};

export const saveVehicle = (data) => {
  let path = "vehicles/save/";
  return postRequestData(path, data);
};

export const getDeploymentPurposes = () => {
  let path = `deployment_purposes`;
  return getRequestData(path, DeploymentPurposesFields);
};
