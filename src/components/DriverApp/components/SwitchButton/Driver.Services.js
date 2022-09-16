import { update } from "lodash";
import {
  getRequestData,
  postRequestData,
  updateLocation,
} from "../../../../core/apiClient";
import { TripIdFields } from "../../../../core/fieldsSet";
import { getCookie } from "../../../../core/CookiesHandler";
// export getDriverOnline = ()
export const getUserVehicles = async (UserId) => {
  let userUrl = `users/show/${UserId}/vehicles`;
  const vehiclesData = await getRequestData(userUrl);
  return vehiclesData.data;
};
export const getDriverOnline = async (UserId, position) => {
  let path = "authorized_drivers/login";
  const vehicleData = await getUserVehicles(UserId);
  const assignedVehicle = vehicleData.Vehicles.filter(
    (vehicle) => vehicle.Approved === "Y"
  );
  //const trips = getTrips();
  console.log({ assignedVehicle });
  const payload = {
    AuthorizedDriver: {
      Vehicle: {
        Id: assignedVehicle[0].Id,
      },
      Driver: {
        Id: UserId,
      },
    },
  };
  return postRequestData(path, payload).then((res) => res.data.DriverLogin);
};

export const getTrips = async (id, location) => {
  const assignedTripPath = `/trips/search?q=DRIVER_LOGIN_ID:${id}+AND+STATUS:Confirmed&maxRecords=1`;
  const path = `driver_logins/updateLocation/${id}`;
  //const syncDriveLocation = await updateDriverLocation(path, location);
  const tripsData1 = await getRequestData(assignedTripPath, TripIdFields).then(
    (res) => res.data.Trips
  );

  return tripsData1[0];
};

export const acceptRide = (tripId, position) => {
  const path = `trips/accept/${tripId}`;
  return getRequestData(path);
};
export const rejectRide = (tripId) => {
  const path = `trips/reject/${tripId}`;
  return getRequestData(path);
};

export const startRide = (tripId) => {
  const path = `trips/start/${tripId}`;
  return getRequestData(path);
};
export const endRide = (tripId) => {
  const path = `trips/end/${tripId}`;
  return getRequestData(path);
};

export const updateDriverLocation = async (driverId, location) => {
  const baseUrl = "https://taxi.becknprotocol.io/";
  const path = `driver_logins/updateLocation/${driverId}`;
  const ApiKey = JSON.parse(getCookie("saveApi"))["ApiKey"];
  console.log({ ApiKey });
  const res = await fetch(baseUrl + path, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      //"Access-Control-Allow-Origin": "*",
      "access-control-allow-credentials": true,
      "access-control-allow-origin": "*",
      //withCredentials: true,
      //mode: "no-cors",
      ApiKey,
      "X-Lat": location.latitude || 2.3,
      "X-Lng": location.longitude || 4.5,
    },
  }).then((res) => res.json());
  return res;
};

export const getTripStatus = (tripId) => {
  const path = `trips/show/${tripId}`;
  return getRequestData(path);
};
