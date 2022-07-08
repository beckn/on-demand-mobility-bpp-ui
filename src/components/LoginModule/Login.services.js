import { getRequestData, postRequestData } from "../../core/apiClient";
import { LocalKey } from "../../core/constant";
import { setCookie } from "../../core/CookiesHandler";

const setApiKey = (key) => {
  setCookie(LocalKey.saveApi, JSON.stringify(key), "/");
};
const setUser = (user) => {
  setCookie(LocalKey.saveUser, JSON.stringify(user), "/");
};
export const getCompanies = (path, fields) => {
  return getRequestData(path, fields);
};

export const getRoles = (path, fields) => {
  return getRequestData(path, fields);
};

export const userAction = async (path, data, fields) => {
  const logRes = await postRequestData(path, data, fields);
  let userUrl = `users/show/${logRes.data.User.Id}`;
  const getUser = await postRequestData(userUrl, data, fields);
  console.log("userAction", getUser, logRes);
  setApiKey(logRes.data.User);
  setUser(getUser.data.User);
  if (data.User.UserRole) {
    let roleUrl = "user_roles/save";
    let roleData = {
      UserRole: {
        UserId: logRes.data.User.Id,
        Role: data.User.UserRole,
      },
    };
    return await postRequestData(roleUrl, roleData);
  } else {
    return logRes.data.User;
  }
};

export const userLogin = (path, data, fields) => {
  return postRequestData(path, data, fields);
};
