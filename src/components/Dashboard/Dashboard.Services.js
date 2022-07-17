import { getRequestData } from "../../core/apiClient";
import { UserFields } from "../../core/fieldsSet";

export const getUserSummaries = () => {
  let uPath = "user_summaries";
  let vPath = "vehicle_summaries";
  return getRequestData(uPath).then((res) => {
    return getRequestData(vPath).then((res2) => {
      return { UserSummaries: res.data.UserSummaries, VehicleSummaries: res2.data.VehicleSummaries };
    });
  });
};

export const getUsers = () => {
  let uPath = "users";
  let fieldset = `{"User":["Name","DateOfJoining","CityId","Verified","LongName","Staff","CompanyId"],"DriverDocument":["DocumentNumber","Document","Verified"],"UserRole":["RoleId"]}`;
  return getRequestData(uPath, fieldset);
};

export const getUserShow = (id) => {
  let uPath = `users/show/${id}`;
  return getRequestData(uPath, UserFields);
};
