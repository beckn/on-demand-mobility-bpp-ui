import { AppRoutes, LocalKey } from "./constant";
import { getCookie } from "./CookiesHandler";

export const setValue = (propertyPath, value, obj) => {
  let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split(".");

  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== "object") obj[properties[0]] = {};
    return setValue(properties.slice(1), value, obj[properties[0]]);
  } else {
    // We set the value to the last property
    obj[properties[0]] = value;
    return true; // this is the end
  }
};

export const getValue = (propertyPath, obj) => {
  let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split(".");
  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== "object") obj[properties[0]] = {};
    return setValue(properties.slice(1), obj[properties[0]]);
  } else {
    // We set the value to the last property
    return obj[properties[0]]; // this is the end
  }
};

export const isAuthenticated = () => {
  if (getCookie(LocalKey.saveApi)) window.location.href = AppRoutes.adminDashboard;
};

export const getAddress = function getAddress(address) {
  // console.log('getaddress', address.AddressLine1);
  let userAddress = [];
  if (address.AddressLine1 && (address.City.State ? address.City.State.Name : address.State_Addr) && address.City.Name && (address.PinCode ? address.PinCode.PinCode : address.PinCode)) {
    userAddress = [address.AddressLine1, address.AddressLine2, address.AddressLine3, address.City.State ? address.City.State.Name : address.State_Addr, address.City.Name, address.PinCode.PinCode ? address.PinCode.PinCode : address.PinCode];
  }

  let getAddress = userAddress.length ? userAddress.filter((add) => add).join(", ") : userAddress;
  return getAddress;
};
