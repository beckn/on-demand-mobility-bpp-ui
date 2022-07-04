import { getRequestData } from "../../core/apiClient";

export const getCompanies = (path,fields) => {
  return getRequestData(path,fields);
};

export const getRoles = (path,fields) => {
  return getRequestData(path,fields);
};
