import {
  getRequestData,
  getUser,
  postRequestData,
} from "../../../../core/apiClient";

// export getDriverOnline = ()

export const uploadFile = (path, data, fields, isUserUpdate) => {
  return postRequestData(path, data, fields).then((res) => {
    isUserUpdate && getUser(res.data.DriverDocument.Driver.Id);
    return res;
  });
};

export const getAutoCompleteValues = (searchGroup, val, section) => {
  return getRequestData(
    `${section ? section : "user"}/${searchGroup}/search?q=${val}`
  );
};

export const getDocumentSave = (path, data, fields) => {
  return postRequestData(path, data, fields);
};

export const getUserVehicles = async (UserId) => {
  let userUrl = `users/show/${UserId}/vehicles`;
  const vehiclesData = await getRequestData(userUrl);
  return vehiclesData.data;
};

export const getDriverOnline = async (UserId) => {
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

export const getTrips = async (id) => {
  const path = "trips";
  const tripsData = await getRequestData(path).then((res) => res.data.Trips);
  console.log({ id, tripsData });

  const assignedTrip = tripsData.filter((trip) => trip.DriverLogin.Id === id);
  return assignedTrip.length > 0 ? assignedTrip[0] : undefined;
};

export const acceptRide = (tripId) => {
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

// export const updateDriverLocation = (location,id)=> {
//     const path=`driver_logins/updateLocation/${id}`
//     const update
// }
