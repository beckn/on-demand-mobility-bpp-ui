export const getOriginAndDestination = (trips) => {
  return [
    {
      Lat: trips?.TripStops[0].Lat,
      Lng: trips?.TripStops[0].Lng,
    },
    {
      Lat: trips?.TripStops[1].Lat,
      Lng: trips?.TripStops[1].Lng,
    },
  ];
};
