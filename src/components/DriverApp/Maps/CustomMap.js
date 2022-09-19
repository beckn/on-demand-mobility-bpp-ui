import React, { useState, useEffect, useRef } from "react";
//import { usePosition } from "../hooks/usePosition";
import { CarIcon } from "../../../shared/icons/Car";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

function CustomMap({ latitude, longitude, mapType = "start" }) {
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

  const position = {
    lat: latitude || 12.903561,
    lng: longitude || 77.5939631,
  };
  const mapHeight =
    mapType === "end" ? "calc(100vh - 530px)" : "calc(100vh - 230px)";
  console.log("location", latitude, longitude, mapHeight, mapType);
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
              height: mapHeight,
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
          </GoogleMap>
        </div>
      )}
    </div>
  );
}

export default CustomMap;
