import { update } from "lodash";
import {
  getRequestData,
  postRequestData,
  updateLocation,
} from "../../../../core/apiClient";
import { TripIdFields } from "../../../../core/fieldsSet";
// export getDriverOnline = ()
export const getUserVehicles = async (UserId) => {
  let userUrl = `users/show/${UserId}/vehicles`;
  const vehiclesData = await getRequestData(userUrl);
  return vehiclesData.data;
};
export const getDriverOnline = async (UserId, position) => {
  let path = "authorized_drivers/login";
  const assignedVehicle = await getUserVehicles(UserId);
  //const trips = getTrips();
  console.log(assignedVehicle.Vehicles[0]);
  const payload = {
    AuthorizedDriver: {
      Vehicle: {
        Id: assignedVehicle.Vehicles[0].Id,
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
  const syncDriveLocation = await updateDriverLocation(id, location);
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
  const path = `driver_logins/updateLocation/${driverId}`;
  return getRequestData(path, undefined, location);
};

export const getTripStatus = (tripId) => {
  const path = `trips/show/${tripId}`;
  return getRequestData(path);
};
