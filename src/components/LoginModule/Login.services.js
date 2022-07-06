import { getRequestData, postRequestData } from "../../core/apiClient";
import { LocalKey } from "../../core/constant";
const setApiKey = (key) => {
  sessionStorage.setItem(LocalKey.saveApi, JSON.stringify(key));
};
export const getCompanies = (path, fields) => {
  return getRequestData(path, fields);
};

export const getRoles = (path, fields) => {
  return getRequestData(path, fields);
};

export const userRegister = (path, data, fields) => {
  return postRequestData(path, data, fields).then((res) => {
    setApiKey(res.data.User);
    let url = "user_roles/save";
    let roleData = {
      UserRole: {
        UserId: res.data.User.Id,
        Role: data.User.UserRole,
      },
    };
    return postRequestData(url, roleData);
  });
};

export const userLogin = (path, data, fields) => {
  return postRequestData(path, data, fields);
};
