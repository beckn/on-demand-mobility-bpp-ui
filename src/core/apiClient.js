import axios from "axios";
import { config } from "../config/config.js";
import { spinnerService } from "@simply007org/react-spinners";
// import { toast } from 'react-toastify';
// import { getErrorMessage } from 'utils/functionUtils/commonFunctions';
import { LocalKey } from "./constant.js";
const apiBaseURL = config.API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    KeepAlive: "Y",
  },
});

// 'Accept-Encoding': 'gzip'
const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled ? false : true;
};

const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
    spinnerService.hide("wiggleSpinner");
    // toast.error(getErrorMessage(error), {
    //     toastId: 1
    // })
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    if (window.localStorage.getItem(LocalKey.saveApi) && request.url !== "login") {
      request.headers["ApiKey"] = JSON.parse(window.localStorage.getItem(LocalKey.saveApi)).ApiKey;
    }
  }
  return request;
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error) //will activate after invistigation of sign-in page
);

// Get data request
export const getRequestData = (paths, fieldsList) => {
  let data = {
    data: {},
  };
  if (fieldsList) {
    let encodedHeader = btoa(fieldsList);
    data = {
      ...data.data,
      headers: {
        IncludedModelFields: encodedHeader,
      }
    };
  }
  return axiosInstance.get(paths, data);
};

// Post data request
export const postRequestData = (paths, data, fieldsList) => {
  let headers = {};
  if (fieldsList) {
    let encodedHeader = btoa(fieldsList);
    headers = {
      headers: {
        IncludedModelFields: encodedHeader,
      },
    };
  }
  return axiosInstance.post(paths, data, headers);
};