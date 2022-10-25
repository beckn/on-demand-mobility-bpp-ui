import { getRequestData, postRequestData } from "../../core/apiClient";
import { DeploymentPurposesFields, VehicleFields } from "../../core/fieldsSet";

export const approve = (id, type) => {
  let path = `${type}/approve/${id}`;
  return getRequestData(path);
};
export const reject = (id, type) => {
  let path = `${type}/reject/${id}`;
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

export const saveVehicle = (data, driverData) => {
  let path = "vehicles/save/";
  return postRequestData(path, data);
};

export const linkDriverVehicle = async (UserId, vehicleId) => {
  let path = "authorized_drivers/save";

  //const trips = getTrips();
  const payload = {
    AuthorizedDriver: {
      Vehicle: {
        Id: vehicleId,
      },
      Driver: {
        Id: UserId,
      },
    },
  };
  const res = await postRequestData(path, payload).then((res) => res.data);
  return res;
};

export const getDeploymentPurposes = () => {
  let path = `deployment_purposes`;
  return getRequestData(path, DeploymentPurposesFields);
};
