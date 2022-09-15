export const coordinateToAddress = async ({ latitude, longitude }) => {
  const response = await Geocode.fromLatLng(latitude, longitude).then(
    (response) => {
      const address = response.results[0].formatted_address;
      console.log(address);
      return address;
    },
    (error) => {
      console.error(error);
    }
  );
  const formatResponse = response.split(",");
  return formatResponse[0] + formatResponse[1] + formatResponse[2];
};
