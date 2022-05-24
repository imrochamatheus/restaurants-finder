import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";

const container = {
  width: "400px",
  height: "400px",
};

const Map = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setUserPosition({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(userPosition);

      map.fitBounds(bounds);
      setMap(map);
    },
    [userPosition]
  );

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    language: "pt-BR",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return !loadError ? (
    isLoaded ? (
      userPosition && (
        <GoogleMap mapContainerStyle={container} onLoad={onLoad}></GoogleMap>
      )
    ) : (
      <h4>Loader...</h4>
    )
  ) : (
    <h1>O mapa não pôde ser carregado</h1>
  );
};

export default Map;
