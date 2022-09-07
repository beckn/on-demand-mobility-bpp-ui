import React, { useState } from "react";
import { usePosition } from "../hooks/usePosition";
import { CarIcon } from "../../../shared/icons/Car";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
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
function CustomMap({ customHeight }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCau3ch7SSkscqQUl2El4ux9Au1Ur9jFo",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { latitude, longitude, error } = usePosition();
  const position = {
    lat: latitude || 25.55,
    lng: longitude || 84.77,
  };
  console.log("location", latitude, longitude);
  return (
    <div>
      {isLoaded && (
        <GoogleMap
          center={position}
          zoom={8}
          mapContainerStyle={{
            top: "85px",
            width: "100%",
            height: customHeight || "calc(100vh - 305px)",
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
          <Marker position={position} />
        </GoogleMap>
      )}
    </div>
  );
}

export default CustomMap;
