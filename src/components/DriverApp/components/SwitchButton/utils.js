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

export function getAge(dateString) {
  if (dateString.length < 10) return false;
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 18 ? true : false;
}
