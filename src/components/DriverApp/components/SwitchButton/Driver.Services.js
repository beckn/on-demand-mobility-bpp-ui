import {
  getRequestData,
  postRequestData,
  updateLocation,
} from "../../../../core/apiClient";
import { TripIdFields } from "../../../../core/fieldsSet";
import { getCookie } from "../../../../core/CookiesHandler";
import { setActiveRide } from "../../../../core/common.functions";
import { round } from "../../utils/utils";

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

  return tripsData1;
};
const triggerEvent = async (id) => {
  console.log("expId", id);
  try {
    const res = await fetch("https://api.experience.becknprotocol.io/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer,
      body: JSON.stringify({
        experienceId: id,
        eventCode: "accept_ride",
        eventTitle: "reciveing_bking_confirmation",
        eventMessage: "Acccepted the booking request",
        eventLayer: "clientLayer",
        eventSourceType: "bpp",
        eventDestinationType: "bap",
        eventSourceId: "RHP",
        eventDestinationId: "recieving driver/taxi details",
        payload: "ride accepted",
        created_at: Date.now(),
        last_modified_at: Date.now(),
      }),
    });
    return res;
  } catch (error) {
    console.log(error, "ride", id);
  }
};
export const acceptRide = async (tripId, experienceId) => {
  console.log("expId123", experienceId);

  const path = `trips/accept/${tripId}`;
  experienceId && triggerEvent(experienceId);
  return getRequestData(path);
};

export const rejectRide = (tripId, experienceId) => {
  const path = `trips/reject/${tripId}`;
  experienceId && triggerEvent(experienceId);
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

export const getTripStatus = async (trip, location) => {
  const path = `trips/show/${trip.Id}`;
  const res = await getRequestData(path).then((res) => res.data.Trip);
  setActiveRide({
    res,
    location,
    distance: trip?.TripStops[1]?.DistanceFromLastStop,
  });
  return res;
};
