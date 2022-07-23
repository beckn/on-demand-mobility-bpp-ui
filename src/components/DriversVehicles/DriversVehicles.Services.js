import { getRequestData } from "../../core/apiClient";

export const verify = (id) => {
  let path = `driver_documents/verify/${id}`;
  return getRequestData(path);
};
