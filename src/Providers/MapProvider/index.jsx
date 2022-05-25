import { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [libraries] = useState(["places"]);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setUserPosition({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    language: "pt-BR",
    libraries,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return (
    <MapContext.Provider value={{ userPosition, isLoaded, loadError }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
