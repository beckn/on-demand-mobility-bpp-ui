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
  const newPath = `/trips/next/1`;
  const path = `driver_logins/updateLocation/${id}`;
  const syncDriveLocation = await updateDriverLocation(path, location);
  const tripsData1 = await getRequestData(newPath, TripIdFields, location).then(
    (res) => res.data.Trips
  );

  return tripsData1[0];
};

var callback = (data, error) => {
  // consume data
  if (error) {
    console.error(error);
    return;
  }
  return data;
};

// run the request. this function will call itself max. 5 times if the request fails
// request(5, callback);

// function getrequestedTrips(retries, callback) {
//   getRequestData(assignedTripPath, TripIdFields, location)
//     .then((res) => res.data.Trips)
//     .then((response) => {
//       // request successful

//       if (response.length > 0) {
//         // server done, deliver data to script to consume
//         callback(response);
//       } else {
//         // server not done yet
//         // retry, if any retries left
//         if (retries > 0) {
//           request(--retries, callback);
//         } else {
//           // no retries left, calling callback with error
//           callback([], "out of retries");
//         }
//       }
//     })
//     .catch((error) => {
//       // ajax error occurred
//       // would be better to not retry on 404, 500 and other unrecoverable HTTP errors
//       // retry, if any retries left
//       if (retries > 0) {
//         request(--retries, callback);
//       } else {
//         // no retries left, calling callback with error
//         callback([], error);
//       }
//     });
// }

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
