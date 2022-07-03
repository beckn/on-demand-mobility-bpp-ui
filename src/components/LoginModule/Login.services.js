import { getRequestData } from "../../core/apiClient";

export const getCompanies = (path) => {
  return getRequestData(path);
};
