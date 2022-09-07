import React, { useState,useEffect,useRef } from "react";
//import { usePosition } from "../hooks/usePosition";
import { CarIcon } from "../../../shared/icons/Car";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 0,
  lng: -180,
};
function CustomMap({latitude, longitude}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries:['places'],
    googleMapsApiKey: "AIzaSyBCau3ch7SSkscqQUl2El4ux9Au1Ur9jFo",
  });
  const source_add=useRef();
  const dest_add=useRef();
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const results=await directionsService.route({
      origin: "nagpur",
      destination: "pune",
      travelMode: window.google.maps.TravelMode.DRIVING,
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }
  calculateRoute();
  //console.log("directionResponse", directionResponse);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const position = {
    lat: latitude || 25.55,
    lng: longitude || 84.77,
  };

  console.log("location", latitude, longitude);
  return (
    <div>
      {isLoaded && (
        <div>
        <GoogleMap
          center={position}
          zoom={8}
          mapContainerStyle={{
            top: "85px",
            width: "100%",
            height: "calc(100vh - 305px)",
          }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {<Marker position={position} />}
          {directionResponse && <DirectionsRenderer  directions={directionResponse}/>}
        </GoogleMap>
        </div>
      )}
    </div>
  );
}

export default CustomMap;