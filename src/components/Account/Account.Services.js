import { getRequestData, getUser, postRequestData } from "../../core/apiClient";

export const uploadFile = (path, data, fields) => {
  return postRequestData(path, data, fields).then((res) => {
    getUser(res.data.DriverDocument.Driver.Id);
  });
};

export const getAutoCompleteValues = (searchGroup, val, section) => {
  return getRequestData(`${section ? section : "user"}/${searchGroup}/search?q=${val}`);
};

export const getDocumentSave = (path, data, fields) => {
  return postRequestData(path, data, fields);
};
